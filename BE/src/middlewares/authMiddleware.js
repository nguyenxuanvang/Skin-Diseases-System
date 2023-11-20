const { User, Doctor, Admin } = require("../database/sequelize");

const checkValidate = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (email) {
      const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid email format",
        });
      }
    }

    if (password) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          status: 400,
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
        });
      }
    }

    if (name) {
      const nameRegex = /^[a-zA-Z ]{8,20}$/;
      if (!nameRegex.test(name)) {
        return res.status(400).json({
          status: 400,
          message:
            "Invalid name format. Name must be 5 to 20 characters long and can only contain letters",
        });
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const checkSignUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user;
    user = await User.findOne({
      where: {
        email: email,
      },
      raw: true,
    });
    if (!user) {
      user = await Doctor.findOne({
        where: {
          email: email,
        },
        raw: true,
      });
    }
    if (!user) {
      user = await Admin.findOne({
        where: {
          email: email,
        },
        raw: true,
      });
    }
    if (user) {
      return res.status(400).json({
        status: 400,
        message: "Email already exists !",
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
const checkLogin = async (req, res, next) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({
      where: {
        email: email,
      },
      raw: true,
    });
    if (!user) {
      user = await Doctor.findOne({
        where: {
          email: email,
        },
        raw: true,
      });
    }
    if (!user) {
      user = await Admin.findOne({
        where: {
          email: email,
        },
        raw: true,
      });
    }

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Email does not exist !",
      });
    }
    req.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  checkValidate,
  checkSignUp,
  checkLogin,
};
