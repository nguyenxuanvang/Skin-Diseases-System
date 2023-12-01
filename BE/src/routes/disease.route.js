const express = require("express");
const {
  getDisease,
  predict,
  upload,
  uploadDisease,
  getImage
} = require("../controllers.js/disease.controller");
const { auth } = require("../middlewares/jwtMiddleware");
const diseaseRouter = express.Router();
diseaseRouter.route("/:name").get(getDisease);
diseaseRouter.route("/upload").post(uploadDisease);
diseaseRouter.route("/image/:name").get(getImage);
diseaseRouter.route("/predict").post(upload.single("image"), predict);
module.exports = {
  diseaseRouter,
};
