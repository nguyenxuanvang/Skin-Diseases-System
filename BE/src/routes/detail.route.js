const express = require("express");

const {
  getDetail,
  getImage,
  upload,
  updateImage
} = require("../controllers.js/detail.controller");

const { auth } = require("../middlewares/jwtMiddleware");

const detailRouter = express.Router();

detailRouter
  .route("/")
  .get(
    auth,
    getDetail
  )
  .patch(
    auth,
    upload.single("avatar"),
    updateImage
  )

detailRouter
    .route("/image/:id")
    .get(
      //auth,
      getImage
    )

module.exports = {
  detailRouter
}