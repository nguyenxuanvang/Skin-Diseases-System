const express = require("express");

const {
  createNew,
  upload,
  getNews,
  getNew,
  updateNew,
  deleteNew,
  getImageNews,
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
    (req, res, next) => {
      req.action = 'create';
      return next();
    },
    upload.single("news"),
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
    (req, res, next) => {
      req.action = 'update';
      return next();
    },
    upload.single("news"),
    updateNew
  );

newsRouter
    .route("/image/:id")
    .get(
      getImageNews
    )

module.exports = {
  newsRouter,
};
