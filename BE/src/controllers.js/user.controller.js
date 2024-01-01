const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");
const path = require('path');
const jwt = require("jsonwebtoken");
const { User, Doctor, Admin, Questions, Comment, Replies } = require("../database/sequelize");
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
        message: 'Người Dùng Không Tồn Tại !'
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
    const questions = await Questions.findAll({
      where: {
        User_id: id
      },
      raw: true
    });
    questions.forEach(async (item) => {
      const comments = await Comment.findAll({
        where: {
          Question_id: item.Question_id
        },
        raw: true
      });
      comments.forEach(async (element) => {
        await Replies.destroy({
          where: {
            Comment_id: element.Comment_id
          }
        })
      })
      await Comment.destroy({
        where: {
          Question_id: item.Question_id
        }
      })
      await Questions.destroy({
        where: {
          Question_id: item.Question_id
        }
      })
    });
    const comments = await Comment.findAll({
      where: {
        User_id: id
      }
    })
    comments.forEach(async (item) => {
      await Replies.destroy({
        where: {
          Comment_id: item.Comment_id
        }
      });
      await Comment.destroy({
        where: {
          Comment_id: item.Comment_id
        }
      });
    });
    await Replies.destroy({
      where: {
        User_id: id
      }
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
      message: 'Xóa Thành Công !'
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
        message: 'Ảnh Không Tồn Tại !'
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
      if (findUser && user.email !== email) {
        return res.status(400).json({
          status: 400,
          message: 'Email Đã Tồn Tại !'
        })
      }
      user.email = email;
    }
    if (oldPassword) {
      const isValidPassword = bcrypt.compareSync(oldPassword, user.password);
      if(!isValidPassword) {
        return res.status(400).json({
          status: 400,
          message: "Mật Khẩu Cũ Không Chính Xác !"
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
      message: 'Cập Nhật Thành Công !'
    })
  } catch (error) {
    return next(error);
  }

}

module.exports = {
  getUsers,
  getUser,
  getSearchUsers,
  getImage,
  deleteUser,
  updateUser,
};
