const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const { User, Doctor } = require("../database/sequelize");

const saltRounds = 10;

const signUp = async (req, res, next) => {
  try {
    const { email, username, password, isDoctor } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    let newMember;

    if (isDoctor) {
      const Doctor_id = uuidv4();
      newMember = await Doctor.create({
        Doctor_id,
        email,
        username,
        password: hash,
        role: 'doctor'
      });
    } else {
      const User_id = uuidv4();
      newMember = await User.create({
        User_id,
        email,
        username,
        password: hash,
        role: 'user'
      });
    }

    // const { password: anotherPassword, ...result } = newMember.get({
    //   plain: true,
    // });

    res
      .status(200)
      .json({
        status: 200,
        data: {
          newMember
        },
        message: "Create New Member Successfully !"
      });
  } catch (error) {
    return next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { user } = req;

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (user.role !== 'admin') {
      if (!isValidPassword) {
        return res.status(400).json({
          status: 400,
          message: 'Email Or Password Is Not Correct !'
        });
      }
    } else {
      if (password !== user.password) {
        return res.status(400).json({
          status: 400,
          message: 'Email Or Password Is Not Correct !'
        })
      }
    }

    let accessToken;

    if (user.role === 'user') {
      accessToken = jwt.sign(
        {
          User_id: user.User_id,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: 3 * 30 * 24 * 60 * 60 }
      );

    } else if (user.role === 'doctor') {
      accessToken = jwt.sign(
        {
          Doctor_id: user.Doctor_id,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: 3 * 30 * 24 * 60 * 60 }
      );

    } else {

      accessToken = jwt.sign(
        {
          Admin_id: user.Admin_id,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: 3 * 30 * 24 * 60 * 60 }
      );
    }

    return res.status(200).json({
      status: 200,
      data: {
        accessToken,
        user
      },
      message: "Login Successfully",
    });
  } catch (error) {
    return next(error);
  }
}
module.exports = {
  signUp,
  login
}
