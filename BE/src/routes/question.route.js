const express = require("express");
const { auth } = require("../middlewares/jwtMiddleware");
const {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getQuestions,
  getQuestion,
  getPublicQuestions,
} = require("../controllers.js/question.controller");

const questionRoute = express.Router();

questionRoute
  .route("/")
  .post(
    (req, res, next) => {
      req.roles = ["doctor", "user"];
      return next();
    },
    auth,
    createQuestion
  )

  .get(
    (req, res, next) => {
      req.roles = ["doctor", "user"];
      return next();
    },
    auth,
    getQuestions
  );

questionRoute.route("/public").get(getPublicQuestions);

questionRoute
  .route("/:id")
  .get(
    (req, res, next) => {
      req.roles = ["doctor", "user"];
      return next();
    },
    auth,
    getQuestion
  )
  .patch(
    (req, res, next) => {
      req.roles = ["doctor", "user"];
      return next();
    },
    auth,
    updateQuestion
  )
  .delete(
    (req, res, next) => {
      req.roles = ["doctor", "user"];
      return next();
    },
    auth,
    deleteQuestion
  );
module.exports = {
  questionRoute,
};
