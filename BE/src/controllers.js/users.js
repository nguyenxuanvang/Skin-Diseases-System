const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { User, Tutorial, Otp } = require("../database/sequelize");
const { faker } = require("@faker-js/faker");
const { getUserFromToken } = require("../middlewares/check-login.middleware");
const { v4: uuidv4 } = require("uuid");
const { transport } = require("../config/mail");
require("dotenv").config();
const nodemailer = require("nodemailer");

const createUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const User_id = uuidv4();
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
      });
    }

    const usernameRegex = /^[a-zA-Z0-9]{8,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message:
          "Invalid username format. Usernames must be 8 to 20 characters long and can only contain letters, numbers",
      });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      User_id,
      email,
      username,
      password: hash,
    });

    const { password: anotherPassword, ...result } = newUser.get({
      plain: true,
    });

    return res.json({
      data: {
        result,
      },
      message: "Create user success",
    });
  } catch (error) {
    return next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
      });
    }

    const currUser = await User.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    if (!currUser) {
      throw Error("User with email not exist");
    }

    const isValidPassword = bcrypt.compareSync(password, currUser.password);

    if (!isValidPassword) {
      throw Error("Password is not match");
    }

    const accessToken = jwt.sign(
      {
        id: currUser.id,
        email: currUser.email,
        role: currUser.role,
      },
      "secret_key",
      { expiresIn: "30m" }
    );

    return res.json({
      accessToken,
      avatar: currUser.avatar,
      role: currUser.role,
      message: "Login Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

// fake data
const createRamdomData = () => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync("123123", salt);
  return {
    avatar: faker.image.avatar(),
    username: faker.person.username(),
    email: `${faker.finance.pin()}${faker.internet.email()}`,
    password: hash,
    role: "user",
  };
};
const fakeUserData = async (req, res, next) => {
  try {
    console.log("fake tutorial is running");
    for (let index = 0; index < 50; index++) {
      await User.create({
        ...createRamdomData(),
      });
    }

    return res.json({
      message: "create fake data user success",
    });
  } catch (error) {
    return next(error);
  }
};

const getUserProfileAPI = async (req, res, next) => {
  try {
    const isLoginUser = await getUserFromToken(req, res, next);
    if (!isLoginUser) {
      throw new Error("User not found");
    }
    const currUser = await User.findOne({
      where: {
        email: isLoginUser.email,
      },
      include: {
        model: Tutorial,
        as: "Tutorial",
      },
    });
    return res.json({
      data: {
        currUser,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getUserListAPI = async (req, res, next) => {
  try {
    const isLoginUser = await getUserFromToken(req, res, next);
    if (!isLoginUser) {
      throw new Error("User not found");
    }
    const allUser = await User.findAll({
      where: {
        role: "user",
      },
      include: {
        model: Tutorial,
        as: "Tutorial",
      },
    });
    return res.json({
      data: {
        allUser,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getUserAPI = async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      order: [["createdAt", /*"DESC"*/ "ASC"]],
    });
    return res.json({
      data: {
        allUsers,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const forgotPasswordUser = await User.findOne({
      where: {
        email,
      },
      raw: true,
    });

    const currenOTP = await Otp.findOne({
      where: {
        UserUser_Id: forgotPassword.id,
      },
      raw: true,
    });
    await Otp.destroy({
      where: {
        id: currenOTP.id,
      },
    });
    const otp = getRndInterger(1000, 9999);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(otp.toString(), salt);

    const ExpireAt = Date.now() + 120000;

    const newOtp = await Otp.create({
      otpCode: hash,
      ExpireAt,
      UserId: forgotPasswordUser.id,
    });

    const info = await transport.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "OTP Code",
      html: `${otp}`,
    });

    return res.json({
      message: "OTP code is created successfully",
      EMAIL_URL: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    return next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    const currUser = await User.findOne({
      where: {
        email,
      },
      raw: true,
    });

    if (!currUser) {
      throw Error("Account is not found with this email");
    }
    const currOTP = await Otp.findOne({
      where: {
        UserId: currUser.id,
      },
    });

    if (!currOTP) {
      throw Error("Something went wrong with otp");
    }
    const { otpCode, ExpireAt } = currOTP;
    if (ExpireAt < Date.now()) {
      throw Error("OTP is expired");
    }
    const isValisOTP = bcrypt.compareSync(otp, otpCode);
    if (!isValisOTP) {
      throw Error("OTP is not valid");
    }
    await Otp.destroy({
      where: {
        id: currOTP.id,
      },
    });
    const { updatePassword } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(updatePassword, salt);

    await User.update(
      {
        password: hash,
      },
      {
        where: {
          id: currUser.id,
        },
      }
    );

    return res.json({
      message: " update password success",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signIn,
  createUser,
  fakeUserData,
  getUserProfileAPI,
  getUserListAPI,
  getUserAPI,
  forgotPassword,
  resetPassword,
};
