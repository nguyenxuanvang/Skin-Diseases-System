const express = require("express");

const {
  getDoctors,
  getDoctor,
  getSearchDoctors,
  getImage,
  deleteDoctor,
  updateDoctor,
} = require("../controllers.js/doctor.controller");

const { checkValidate } = require("../middlewares/authMiddleware");

const { auth } = require("../middlewares/jwtMiddleware");

const doctorRouter = express.Router();

doctorRouter
  .route("/")
  .get(
    getDoctors
  )
  .patch(
    (req, res, next) => {
      req.roles = ["doctor"];
      return next();
    },
    auth,
    checkValidate,
    updateDoctor
  );

doctorRouter
    .route("/search")
    .get(getSearchDoctors)

doctorRouter
  .route("/:id")
  .get(
    getDoctor
  )
  .delete(
    (req, res, next) => {
      req.roles = ["admin"];
      return next();
    },
    auth,
    deleteDoctor
  );

doctorRouter
    .route("/image/:id")
    .get(
      getImage
    )

module.exports = {
  doctorRouter,
};
