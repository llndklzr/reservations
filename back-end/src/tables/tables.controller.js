const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const onlyValidProperties = require("../errors/onlyValidProperties");

const REQUIRED_PROPERTIES = ["table_name", "capacity"];

//! <<------- VALIDATION ------->>
const hasOnlyValidPropertiesForCreate =
  onlyValidProperties(REQUIRED_PROPERTIES);
const hasRequiredPropertiesForCreate = hasProperties(REQUIRED_PROPERTIES);

const hasOnlyValidPropertiesToSeat = onlyValidProperties(["reservation_id"]);
const hasRequiredPropertiesToSeat = hasProperties(["reservation_id"]);

function hasValidName(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length >= 2) {
    return next();
  }
  next({
    status: 400,
    message: `table_name '${table_name}' must be at least 2 characters long.`,
  });
}

function hasValidCapacity(req, res, next) {
  const capacity = req.body.data.capacity;
  if (capacity > 0 && Number.isInteger(capacity)) {
    return next();
  }
  next({
    status: 400,
    message: `capacity '${capacity}' must be a whole number greater than 0.`,
  });
}

async function tableExists(req, res, next) {
  const { tableId } = req.params;
  const table = await service.read(tableId);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `table_id '${tableId}' does not exist.`,
  });
}

function tableVacant(req, res, next) {
  const table = res.locals.table;
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `table_id '${table.table_id}' is occupied by reservation_id '${table.reservation_id}'`,
  });
}

async function reservationAlreadySeated(req, res, next) {
  const { reservation_id } = req.body.data;
  const seated = await service.readTableByReservation(reservation_id);
  if (!seated) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_id '${reservation_id}' is already seated at table_id '${seated.table_id}'.`,
  });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await service.readReservation(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation ${reservation_id} does not exist.`,
  });
}

async function hasEnoughCapacity(req, res, next) {
  const { reservation, table } = res.locals;

  if (table.capacity >= reservation.people) {
    return next();
  }
  next({
    status: 400,
    message: `table capacity '${table.capacity}' is smaller than group size '${reservation.people}'.`,
  });
}

//! <<-------- CRUDL ------->>
async function create(req, res) {
  const table = req.body.data;
  const data = await service.create(table);
  res.status(201).json({ data });
}

function read(req, res) {
  const data = res.locals.table;
  res.json({ data });
}

async function updateSeatReservation(req, res) {
  const { reservation_id } = req.body.data;
  const table_id = req.params.tableId;
  const data = await service.updateSeatReservation(reservation_id, table_id);
  res.json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  create: [
    hasOnlyValidPropertiesForCreate,
    hasRequiredPropertiesForCreate,
    hasValidName,
    hasValidCapacity,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), read],
  updateSeatReservation: [
    hasRequiredPropertiesToSeat,
    hasOnlyValidPropertiesToSeat,
    asyncErrorBoundary(tableExists),
    tableVacant,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(hasEnoughCapacity),
    asyncErrorBoundary(reservationAlreadySeated),
    asyncErrorBoundary(updateSeatReservation),
  ],
  list: asyncErrorBoundary(list),
};
