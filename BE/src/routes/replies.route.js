const express = require("express");
const { auth } = require("../middlewares/jwtMiddleware");
const {
  createReplies,
  updateReplies,
  deleteReplies,
} = require("../controllers.js/replies.controller");

const repliesRoute = express.Router();

repliesRoute
  .route("/:id")
  .post(
    (req, res, next) => {
      req.roles = ["doctor", "user"];
      return next();
    },
    auth,
    createReplies
  )
  .patch(
    (req, res, next) => {
      req.roles = ["doctor", "user"];
      return next();
    },
    auth,
    updateReplies
  )
  .delete(
    (req, res, next) => {
      req.roles = ["doctor", "user"];
      return next();
    },
    auth,
    deleteReplies
  );
module.exports = {
  repliesRoute,
};
