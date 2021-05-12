/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "people",
  "mobile_number",
  "reservation_date",
  "reservation_time",
];

//! <<------- VALIDATION ------->>
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !REQUIRED_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}.`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservationId} cannot be found.`,
  });
}

function hasValidDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const valid = Date.parse(date);

  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_date '${date}' is not a date.`,
  });
}

function hasValidTime(req, res, next) {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const time = req.body.data.reservation_time;
  const valid = time.match(regex);

  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_time '${time}' is not a time.`,
  });
}

function hasValidPeople(req, res, next) {
  const people = Number(req.body.data.people);
  const valid = Number.isInteger(people);

  if (valid && people > 0) {
    return next();
  }
  next({
    status: 400,
    message: `Party size '${people}' is not a valid integer`,
  });
}

function noReservationsOnTuesdays(req, res, next) {
  const reservation_date = req.body.data.reservation_date;
  const weekday = new Date(reservation_date).getUTCDay();
  // Sunday - Saturday: 0-6
  if (weekday !== 2) {
    return next();
  }
  next({
    status: 400,
    message: `The restaurant is closed on Tuesdays.`,
  });
}

function noReservationsInPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const presentDate = Date.now();
  const newReservationDate = new Date(
    `${reservation_date} ${reservation_time}`
  ).valueOf();

  if (newReservationDate > presentDate) {
    return next();
  }
  next({
    status: 400,
    message: `New reservations must be in the future.`,
  });
}

function reservationIsDuringBusinessHours(req, res, next) {
  const reservation_time = req.body.data.reservation_time;
  const hours = Number(reservation_time.slice(0, 1));
  const minutes = Number(reservation_time.slice(3, 4));
  const clockTime = hours * 100 + minutes;

  if (clockTime < 1030 || clockTime > 2130) {
    next({
      status: 400,
      message: `Reservation time must be between 10:30 AM and 9:30 PM`,
    });
  }
  next();
}

//! <<-------   CRUDL    ------->>
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

function read(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

async function list(req, res) {
  const { date } = req.query;

  if (date) {
    const data = await service.listByDate(date);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    hasValidPeople,
    noReservationsOnTuesdays,
    noReservationsInPast,
    reservationIsDuringBusinessHours,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  list: asyncErrorBoundary(list),
};
