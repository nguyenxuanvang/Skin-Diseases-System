const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
} = require("../controllers.js/user.controller");

const {
  checkValidate
} = require("../middlewares/authMiddleware");

const {
  auth
} = require('../middlewares/jwtMiddleware');


const userRouter = express.Router();

userRouter
  .route("/")
  .get(
    (req,res,next) => {req.roles =['admin'];return next();},
    auth,
    getUsers
  )
  .patch(
    (req,res,next) => {req.roles =['user'];return next();},
    auth,
    checkValidate,
    updateUser
  );

userRouter
    .route("/:id")
    .get(
      (req,res,next) => {req.roles =['admin','user'];return next();},
      auth,
      getUser
    )
    .delete(
      (req,res,next) => {req.roles =['admin'];return next();},
      auth,
      deleteUser
    );

userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/reset-password").post(resetPassword);

module.exports = {
  userRouter
};
