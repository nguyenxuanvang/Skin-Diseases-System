const express = require("express");

const {
  getDoctors,
  getDoctor,
  getSearchDoctors,
  getImage,
  deleteDoctor,
  updateDoctor,
  getListRequest,
  getRequestImage,
  approvalAccount,
  getListRequestDetail,
  upload,
  sendRequest,
  deleteRequest
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
  .route("/request")
  .get(
    (req, res, next) => {
      req.roles = ["admin"];
      return next();
    },
    auth,
    getListRequest
  )
doctorRouter
    .route("/requestDetail")
    .get(
      (req,res,next) => {
        req.roles = ["doctor"];
        return next();
      },
      auth,
      getListRequestDetail
    )
    .post(
      (req,res,next) => {
        req.roles = ["doctor"];
        return next();
      },
      auth,
      upload.single("certificate"),
      sendRequest
    )
    .delete(
      (req,res,next) => {
        req.roles = ["doctor"];
        return next();
      },
      auth,
      deleteRequest
    )
doctorRouter
    .route("/request/:id")
    .get(
      getRequestImage
    )
    .patch(
      (req,res,next) => {
        req.roles = ["admin"];
        return next();
      },
      auth,
      approvalAccount
    )

doctorRouter
  .route("/image/:id")
  .get(
    getImage
  );

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
module.exports = {
  doctorRouter,
};
