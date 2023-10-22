const express = require("express");

const {
  checkLoginMiddleware,
  checkAdminMiddleware,
} = require("../middlewares/check-login.middleware");
const {
  getAll,
  search,
  getOne,
  create,
  updateOne,
  deleteOne,
  deleteAll,
  fakeTutorialData,
  pagination,
} = require("../controllers.js/tutorial");

const tutorialRouter = express.Router();

tutorialRouter.route("/fake-data/create-tutorials").get(fakeTutorialData);
tutorialRouter.route("/pagination").get([checkLoginMiddleware], pagination);

tutorialRouter.route("/").get(getAll);
tutorialRouter.route("/search").get(search);
tutorialRouter.route("/:id").get(getOne);
tutorialRouter.route("/").post(create);
tutorialRouter.route("/:id").put(updateOne);
tutorialRouter.route("/:id").delete(deleteOne);
tutorialRouter.route("/").delete([checkAdminMiddleware], deleteAll);

module.exports = {
  tutorialRouter,
};
