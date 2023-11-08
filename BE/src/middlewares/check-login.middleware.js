var jwt = require("jsonwebtoken");
const { User } = require("../database/sequelize");

const getUserFromToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw Error("You must be log in first");
    }

    const accessToken = bearerToken.split(" ")[1];
    const data = jwt.verify(accessToken, "secret_key");

    const currUser = await User.findOne({
      where: {
        email: data.email,
      },
      raw: true,
    });

    return currUser;
  } catch (error) {
    return next(error);
  }
};

const checkLoginMiddleware = async (req, res, next) => {
  try {
    const currUser = await getUserFromToken(req, res, next);

    if (!currUser) {
      throw Error("You must be login");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const checkAdminMiddleware = async (req, res, next) => {
  try {
    const currUser = await getUserFromToken(req, res, next);

    if (!currUser) {
      throw Error("You must be login");
    }

    if (currUser.role !== "admin") {
      throw Error("You must be login");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  checkLoginMiddleware,
  getUserFromToken,
  checkAdminMiddleware
};
