const express = require("express");

const {
  createNew,
  getNews,
  getNew,
  updateNew,
  deleteNew,
} = require("../controllers.js/news.controller");

const { auth } = require("../middlewares/jwtMiddleware");

const newsRouter = express.Router();

newsRouter
  .route("/")
  .post(
    (req, res, next) => {
      req.roles = ["admin"];
      return next();
    },
    auth,
    createNew
  )
  .get(
    (req, res, next) => {
      req.roles = ["admin"];
      return next();
    },
    auth,
    getNews
  );

newsRouter
  .route("/:id")
  .get(
    (req, res, next) => {
      req.roles = ["admin"];
      return next();
    },
    auth,
    getNew
  )
  .delete(
    (req, res, next) => {
      req.roles = ["admin"];
      return next();
    },
    auth,
    deleteNew
  )
  .patch(
    (req, res, next) => {
      req.roles = ["admin"];
      return next();
    },
    auth,
    updateNew
  );

module.exports = {
  newsRouter,
};
