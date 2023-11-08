const express = require("express");
const { createNew, updateNew, deleteNew } = require("../controllers.js/New");
const newRouter = express.Router();

newRouter.route("/create/").post(createNew);
newRouter.route("/update/:id").put(updateNew);
newRouter.route("/delete/:id").delete(deleteNew);
module.exports = {
  newRouter,
};
