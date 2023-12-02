const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");
const path = require('path');
const jwt = require("jsonwebtoken");
const { User, Doctor, Admin, Questions, Comment, Replies, Tutorial, Otp } = require("../database/sequelize");
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
      data: users
    });

  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findUser = await User.findOne({
      where: {
        User_id: id,
      }
    });
    if (!findUser) {
      return res.status(404).json({
        status: 404,
        message: 'User Not Found !'
      });
    }
    return res.status(200).json({
      status: 200,
      data: findUser
    })

  } catch (error) {
    return next(error);
  }
};

const getSearchUsers = async (req, res, next) => {
  try {
    const { name } = req.query;
    const listUser = await User.findAll({
      raw: true
    });
    const list = listUser.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    
    return res.status(200).json({
      status: 200,
      data: list,
      message: "Get Search User Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Replies.destroy({
      where: {
        User_id: id,
      },
    });
    await Comment.destroy({
      where: {
        User_id: id,
      },
    });
    await Questions.destroy({
      where: {
        User_id: id,
      },
    });
    await User.destroy({
      where: {
        User_id: id,
      },
    });
    const listAvatar = fs.readdirSync("./src/Images/Avatars");
    const findAvatar = listAvatar.find(item => item.startsWith(id));
    if (findAvatar) {
      fs.unlinkSync(`./src/Images/Avatars/${findAvatar}`);
    }
    return res.status(200).json({
      status: 200,
      message: 'Deleted successfully !'
    })
  } catch (error) {
    return next(error);
  }
}

const getImage = async (req,res,next) => {
  try{
    const { id } = req.params;
    const findUser = await User.findOne({
      where: {
        User_id: id,
      },
    });
    if (!findUser) {
      return res.status(404).json({
        status: 404,
        message: 'File Not Found !'
      });
    }
    return res.sendFile(path.join(__dirname, "../Images/Avatars", findUser.avatar));
  } catch(error) {
    return next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      email,
      password,
      oldPassword,
      name,
      phone,
      address
    } = req.body;
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    if (email) {
      let findUser = await User.findOne({
        where: {
          email: email,
        }
      });
      if(!findUser) {
        findUser = await Admin.findOne({
          where: {
            email: email,
          }
        });
        if(!findUser) {
          findUser = await Doctor.findOne({
            where: {
              email: email,
            }
          });
        }
      }
      if (findUser) {
        return res.status(400).json({
          status: 400,
          message: 'Email already exists !'
        })
      }
      user.email = email;
    }
    if (oldPassword) {
      const isValidPassword = bcrypt.compareSync(oldPassword, user.password);
      if(!isValidPassword) {
        return res.status(400).json({
          status: 400,
          message: "Old Password Incorrect !"
        });
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      user.password = hash;
    }
    await User.update(
      {
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        address: user.address
      },
      {
        where: {
          User_id: user.User_id,
        }
      });
    return res.status(200).json({
      status: 200,
      data: user,
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
  getSearchUsers,
  getImage,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
};
