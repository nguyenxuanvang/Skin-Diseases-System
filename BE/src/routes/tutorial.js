const express = require("express");

const {
  getAll,
  search,
  getOne,
  create,
  updateOne,
  deleteOne,
  deleteAll,
  pagination,
} = require("../controllers.js/tutorial");

const tutorialRouter = express.Router();
tutorialRouter.route("/pagination").get(pagination);

tutorialRouter.route("/").get(getAll);
tutorialRouter.route("/search").get(search);
tutorialRouter.route("/:id").get(getOne);
tutorialRouter.route("/").post(create);
tutorialRouter.route("/:id").put(updateOne);
tutorialRouter.route("/:id").delete(deleteOne);
tutorialRouter.route("/").delete(deleteAll);

module.exports = {
  tutorialRouter,
};
