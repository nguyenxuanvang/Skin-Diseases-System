const express = require("express");
const { auth } = require("../middlewares/jwtMiddleware");
const {
  updateCommentQuestion,
  deleteCommentQuestion,
  createComment,
} = require("../controllers.js/comment.controller");

const commentRoute = express.Router();

commentRoute.route("/:id").post(
  (req, res, next) => {
    req.roles = ["doctor", "user"];
    return next();
  },
  auth,
  createComment
);

commentRoute
  .route("/:id")
  .patch(
    (req, res, next) => {
      req.roles = ["doctor", "user"];
      return next();
    },
    auth,
    updateCommentQuestion
  )
  .delete(
    (req, res, next) => {
      req.roles = ["doctor", "user"];
      return next();
    },
    auth,
    deleteCommentQuestion
  );
module.exports = {
  commentRoute,
};
