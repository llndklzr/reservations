const knex = require("../db/connection");

//! <<------- CRUDL ------->>
function create(reservation) {
  return knex("reservations").insert(reservation).returning("*");
}

function list() {
  return knex("reservations");
}

function listByDate(reservation_date) {
  return knex("reservations").select("*").where({ reservation_date });
}

module.exports = {
  create,
  list,
  listByDate,
};
