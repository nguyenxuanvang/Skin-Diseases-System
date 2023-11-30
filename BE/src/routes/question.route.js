const express = require("express");
const { auth } = require("../middlewares/jwtMiddleware");
const {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getSearchQuestions,
  getPublicQuestions,
  getQuestion,
  getOwnQuetion
} = require("../controllers.js/question.controller");

const questionRoute = express.Router();
questionRoute
  .route("/public")
  .get(
    getPublicQuestions
  );

questionRoute
    .route("/owner")
    .get(
      auth,
      getOwnQuetion
    )
  
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

questionRoute
    .route("/search")
    .get(
      getSearchQuestions
    );

questionRoute
  .route("/detail/:id")
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
