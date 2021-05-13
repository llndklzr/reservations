const knex = require("../db/connection");

//! <<------- CRUDL ------->>
function create(dining_area) {
  return knex("dining_areas")
    .insert(dining_area)
    .returning("*")
    .then((result) => result[0]);
}

function list() {
  return knex("dining_areas");
}

module.exports = {
  create,
  list,
};
