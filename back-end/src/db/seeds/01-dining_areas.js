const dining_areas = require("./01-dining_areas.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE dining_areas RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("dining_areas").insert(dining_areas);
    });
};
