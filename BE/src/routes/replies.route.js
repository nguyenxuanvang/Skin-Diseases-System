const express = require("express");
const { auth } = require("../middlewares/jwtMiddleware");
const {
  createReplies,
  updateReplies,
  deleteReplies,
  getReplies
} = require("../controllers.js/replies.controller");

const repliesRoute = express.Router();

repliesRoute
  .route("/:id")
  .get(
    getReplies
  )
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
    auth,
    deleteReplies
  );
module.exports = {
  repliesRoute,
};
