const express = require("express");
const {
  createComment
} = require("../controllers.js/comment.controller");
const {
  auth
} = require("../middlewares/jwtMiddleware");
const commentRoute = express.Router();
commentRoute
  .route("/:id")
  .post(
    (req, res, next) => {
      req.roles = ["user","doctor"];
      return next();
    },
    auth,
    createComment
  )
module.exports = {
  commentRoute,
};
