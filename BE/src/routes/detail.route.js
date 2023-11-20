const express = require("express");

const {
  getDetail,
  getImage
} = require("../controllers.js/detail.controller");


const { auth } = require("../middlewares/jwtMiddleware");

const detailRouter = express.Router();

detailRouter
  .route('/')
  .get(
    auth,
    getDetail
  )

detailRouter
    .route('/image/:id')
    .get(
      //auth,
      getImage
    )
module.exports = {
  detailRouter
}