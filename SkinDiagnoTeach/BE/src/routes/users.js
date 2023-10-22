const express = require("express");
const {
  signIn,
  createUser,
  fakeUserData,
  getUserProfileAPI,
  getUserListAPI,
  getUserAPI,
} = require("../controllers.js/users");
const {
  checkLoginMiddleware,
} = require("../middlewares/check-login.middleware");

const userRouter = express.Router();
userRouter.route("/sign-In").post(signIn);
userRouter.route("/create-User").post(createUser);
userRouter.route("/test").post([checkLoginMiddleware], createUser);
userRouter.route("/fake-data-user").get(fakeUserData);
userRouter
  .route("/get-user-profile")
  .get([checkLoginMiddleware], getUserProfileAPI);
userRouter.route("/user-list").get([checkLoginMiddleware], getUserListAPI);

userRouter.route("/get-users").get(getUserAPI);
module.exports = {
  userRouter,
};
