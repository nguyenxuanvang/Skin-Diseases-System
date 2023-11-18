const express = require("express");
const { signUp, login } = require("../controllers.js/auth.controller");
const {
  checkValidate,
  checkSignUp,
  checkLogin,
} = require("../middlewares/authMiddleware");

const authRouter = express.Router();

authRouter.route("/signup").post(checkValidate, checkSignUp, signUp);

authRouter.route("/login").post(checkValidate, checkLogin, login);

module.exports = {
  authRouter,
};
