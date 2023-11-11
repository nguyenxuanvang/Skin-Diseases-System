const express = require("express");

const {
  getDoctors,
  getDoctor,
  deleteDoctor,
  updateDoctor
} = require("../controllers.js/doctor.controller");

const {
  checkValidate
} = require("../middlewares/authMiddleware");

const {
  auth
} = require("../middlewares/jwtMiddleware");

const doctorRouter = express.Router();

doctorRouter
  .route("/")
  .get(
    (req, res, next) => { req.roles = ['admin']; return next(); },
    auth,
    getDoctors
  )
  .patch(
    (req,res,next) => {req.roles =['doctor'];return next();},
    auth,
    checkValidate,
    updateDoctor
  );

doctorRouter
  .route("/:id")
  .get(
    (req, res, next) => { req.roles = ['admin', 'doctor']; return next(); },
    auth,
    getDoctor
  )
  .delete(
    (req,res,next) => {req.roles =['admin'];return next();},
    auth,
    deleteDoctor
  );

module.exports = {
  doctorRouter
};
