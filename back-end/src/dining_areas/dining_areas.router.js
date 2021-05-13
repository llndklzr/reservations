/**
 * Defines the router for dining_areas (/tables) resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./dining_areas.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;
