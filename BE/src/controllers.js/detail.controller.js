const path = require('path');
const fs = require("fs");
const { Doctor, Admin, User } = require("../database/sequelize");
const getDetail = async (req, res, next) => {
  try {
    const { Doctor_id, User_id, Admin_id } = req.user;
    let user;
    if(Doctor_id) {
      user = await Doctor.findOne({
        where: {
          Doctor_id,
        },
      });
    } else if(User_id) {
      user = await User.findOne({
        where: {
          User_id,
        },
      });
    } else {
      user = await Admin.findOne({
        where: {
          Admin_id,
        },
      });
    }
    
    return res.status(200).json({
      status: 200,
      user
    });
  } catch (error) {
    return next(error);
  }
};

const getImage = async (req,res) => {
  const { id } = req.params;
  let findImage = await Doctor.findOne({
    where: {
      avatar: id,
    },
  });
  if(!findImage) {
    findImage = await User.findOne({
      where: {
        avatar: id,
      },
    });
  }
  if(!findImage) {
    return res.status(404).json({
      status: 404,
      message: 'File Not Found !'
    })
  }
  res.sendFile(path.join(__dirname,"../Avatars",id));
}

module.exports = {
  getDetail,
  getImage
}