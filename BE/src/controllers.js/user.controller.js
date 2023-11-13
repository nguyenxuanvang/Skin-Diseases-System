const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { User, Doctor, Admin, Tutorial, Otp } = require("../database/sequelize");
const { faker } = require("@faker-js/faker");
const { transport } = require("../config/mail");
require("dotenv").config();
const nodemailer = require("nodemailer");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      order: [["createdAt", /*"DESC"*/ "ASC"]],
    });

    return res.status(200).json({
      status: 200,
      data: {
        users,
      }
    });

  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const findUser = await User.findOne({
      where: {
        User_id: id,
      }
    });
    if (user.role === 'admin') {

      if (!findUser) {
        return res.status(400).json({
          status: 400,
          message: 'User Is Not Exist !'
        });
      }
      return res.status(200).json({
        status: 200,
        data: {
          findUser,
        }
      });
    }

    if (user.User_id !== id) {
      return res.status(403).json({
        status: 403,
        message: 'Unauthorized access to this resource !'
      })
    }
    return res.status(200).json({
      status: 200,
      data: {
        findUser
      }
    })

  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        User_id: id,
      }
    });
    return res.status(200).json({
      status: 200,
      message: 'Deleted successfully !'
    })
  } catch (error) {
    return next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { user } = req;
    
    const {
      email,
      password,
      username
    } = req.body;

    if (email) {
      let findUser = await User.findOne({
        where: {
          email: email,
        }
      });
      findUser = await Admin.findOne({
        where: {
          email: email,
        }
      });
      findUser = await Doctor.findOne({
        where: {
          email: email,
        }
      });
      if (findUser) {
        return res.status(400).json({
          status: 400,
          message: 'Email already exists !'
        })
      }
      
      user.email = email;
    }
    user.email = email || user.email;
    if (password) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      user.password = hash;
    }
    user.username = username || user.username;
    await User.update(
      {
        email: user.email,
        password: user.password,
        username: user.username
      },
      {
        where: {
          User_id: user.User_id,
        }
      });
    return res.status(200).json({
      status: 200,
      data: {
        newUser: user
      },
      message: 'Updated Successfully !'
    })
  } catch (error) {
    return next(error);
  }

}

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
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
};
