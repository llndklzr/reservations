const knex = require("../db/connection");

//! <<------- CRUDL ------->>
function create(dining_area) {
  return knex("dining_areas")
    .insert(dining_area)
    .returning("*")
    .then((result) => result[0]);
}

function updateSeatReservation(reservation_id, table_id) {
  return knex("dining_areas")
    .select("*")
    .where({ table_id })
    .update({ reservation_id }, "*");
}

function list() {
  return knex("dining_areas");
}

module.exports = {
  create,
  updateSeatReservation,
  list,
};
