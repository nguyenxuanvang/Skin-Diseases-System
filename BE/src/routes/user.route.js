const express = require("express");
const {
  getUsers,
  getUser,
  getSearchUsers,
  getImage,
  deleteUser,
  updateUser,
} = require("../controllers.js/user.controller");

const { checkValidate } = require("../middlewares/authMiddleware");

const { auth } = require("../middlewares/jwtMiddleware");

const userRouter = express.Router();

userRouter
  .route("/")
  .get(
    (req, res, next) => {
      req.roles = ["admin"];
      return next();
    },
    auth,
    getUsers
  )
  .patch(
    (req, res, next) => {
      req.roles = ["user"];
      return next();
    },
    auth,
    checkValidate,
    updateUser
  );

userRouter
    .route("/search")
    .get(getSearchUsers)

userRouter
  .route("/:id")
  .get(
    getUser
  )
  .delete(
    (req, res, next) => {
      req.roles = ["admin"];
      return next();
    },
    auth,
    deleteUser
  );

userRouter
  .route("/image/:id")
  .get(
    getImage
  )

module.exports = {
  userRouter,
};
