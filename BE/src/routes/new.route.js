const express = require("express");
const { createNew, updateNew, deleteNew } = require("../controllers.js/new.controller");
const {
  checkLoginMiddleware,
} = require("../middlewares/check-login.middleware");
const newRouter = express.Router();

newRouter.route("/create/").post([checkLoginMiddleware], createNew);
newRouter.route("/update/:News_id").put([checkLoginMiddleware], updateNew);
newRouter.route("/delete/:News_id").delete([checkLoginMiddleware], deleteNew);
module.exports = {
  newRouter,
};
