const service = require("./dining_areas.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const onlyValidProperties = require("../errors/onlyValidProperties");

const REQUIRED_PROPERTIES = ["table_name", "capacity"];

//! <<------- VALIDATION ------->>
const hasOnlyValidProperties = onlyValidProperties(REQUIRED_PROPERTIES);
const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

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
  const capacity = Number(req.body.data.capacity);
  if (capacity > 0 && Number.isInteger(capacity)) {
    return next();
  }
  next({
    status: 400,
    message: `capacity '${capacity}' must be a whole number greater than 0.`,
  });
}

//! <<-------- CRUDL ------->>
async function create(req, res) {
  const dining_area = req.body.data;
  const data = await service.create(dining_area);
  res.status(201).json({ data });
}

async function updateSeatReservation(req, res) {
  const { reservation_id } = req.body.data;
  const table_id = req.params.tableId;
  console.log(reservation_id, table_id);
  const data = await service.updateSeatReservation(reservation_id, table_id);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidName,
    hasValidCapacity,
    asyncErrorBoundary(create),
  ],
  updateSeatReservation: asyncErrorBoundary(updateSeatReservation),
  list: asyncErrorBoundary(list),
};
