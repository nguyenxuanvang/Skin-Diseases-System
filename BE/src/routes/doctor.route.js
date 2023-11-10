const express = require("express");

const {
  checkAdminMiddleware,
} = require("../middlewares/check-login.middleware");
const { createDoctor, updateDoctor, deleteDoctor } = require("../controllers.js/doctor.controller");

const doctorRouter = express.Router();

doctorRouter.route("/create/").post([checkAdminMiddleware], createDoctor);
doctorRouter
  .route("/update/:Doctor_id")
  .put([checkAdminMiddleware], updateDoctor);
doctorRouter
  .route("/delete/:Doctor_id")
  .delete([checkAdminMiddleware], deleteDoctor);
module.exports = {
  doctorRouter,
};
