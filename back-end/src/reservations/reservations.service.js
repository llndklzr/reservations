const knex = require("../db/connection");

//! <<------- CRUDL ------->>
function create(reservation) {
  return knex("reservations").insert(reservation).returning("*");
}

function list() {
  return knex("reservations");
}

module.exports = {
  create,
  list,
};
