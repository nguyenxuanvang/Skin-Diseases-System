const express = require("express");
const { auth } = require("../middlewares/jwtMiddleware");
const {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getQuestions,
  getPublicQuestions,
  getQuestion,
} = require("../controllers.js/question.controller");

const questionRoute = express.Router();
questionRoute
  .route("/public")
  .get(
    getPublicQuestions
  );
  
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
    auth,
    getQuestions
  );

questionRoute
  .route("/:id")
  .get(
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
    auth,
    deleteQuestion
  );
module.exports = {
  questionRoute,
};
