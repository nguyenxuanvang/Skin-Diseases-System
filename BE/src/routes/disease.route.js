const express = require("express");
const { getDisease, predict, upload } = require("../controllers.js/disease.controller");
const {
  auth
} = require("../middlewares/jwtMiddleware");
const diseaseRouter = express.Router();
diseaseRouter
  .route("/:name")
  .get(
    getDisease
  );

diseaseRouter
  .route("/predict")
  .post(
    upload.single("image"),
    predict
  );
module.exports = {
  diseaseRouter
}