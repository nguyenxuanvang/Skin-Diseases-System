const express = require("express");
const { auth } = require("../middlewares/jwtMiddleware");
const {
  updateCommentQuestion,
  deleteCommentQuestion,
  createComment,
  getComments
} = require("../controllers.js/comment.controller");

const commentRoute = express.Router();

commentRoute
  .route("/:id")
  .get(
    getComments
  )
  .post(
  (req, res, next) => {
    req.roles = ["doctor", "user"];
    return next();
  },
  auth,
  createComment
  )
  .patch(
    (req, res, next) => {
      req.roles = ["doctor", "user"];
      return next();
    },
    auth,
    updateCommentQuestion
  )
  .delete(
    auth,
    deleteCommentQuestion
  );

module.exports = {
  commentRoute,
};
