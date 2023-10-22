const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { User, Tutorial } = require("../database/sequelize");
const { faker } = require("@faker-js/faker");
const { getUserFromToken } = require("../middlewares/check-login.middleware");

const createUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
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
module.exports = {
  signIn,
  createUser,
  fakeUserData,
  getUserProfileAPI,
  getUserListAPI,
  getUserAPI,
};
