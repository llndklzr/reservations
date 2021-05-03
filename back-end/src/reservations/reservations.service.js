const knex = require("../db/connection");

// <<------- CRUD ------->>

function list() {
  return knex("reservations");
}

module.exports = {
  list,
};
