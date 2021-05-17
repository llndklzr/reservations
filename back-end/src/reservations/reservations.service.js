const knex = require("../db/connection");

//! <<------- CRUDL ------->>
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((newReservation) => newReservation[0]);
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .then((reservation) => reservation[0]);
}

function updateStatus(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status }, "*")
    .then((result) => result[0]);
}

function list() {
  return knex("reservations");
}

function listByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

module.exports = {
  create,
  read,
  updateStatus,
  list,
  listByDate,
};
