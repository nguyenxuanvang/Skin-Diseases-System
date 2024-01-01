const path = require('path');
const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { Doctor, Admin, User } = require("../database/sequelize");
const getDetail = async (req, res, next) => {
  try {
    const { Doctor_id, User_id, Admin_id } = req.user;
    let user;
    if (Doctor_id) {
      user = await Doctor.findOne({
        where: {
          Doctor_id,
        },
      });
    } else if (User_id) {
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


const storage = multer.diskStorage({
  destination: "./src/Images/Avatars",
  filename: (req, file, cb) => {
    const { Doctor_id, User_id } = req.user;
    const id = Doctor_id || User_id;
    const listAvatar = fs.readdirSync("./src/Images/Avatars");
    const findAvatar = listAvatar.find(item => item.startsWith(id));
    if (findAvatar) {
      fs.unlinkSync(`./src/Images/Avatars/${findAvatar}`);
    }
    const randomStr = uuidv4();
    const originalExtension = path.extname(file.originalname);

    const newFileName = id + randomStr + originalExtension;
    req.user.avatar = newFileName;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

const updateImage = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role === 'doctor') {
      await Doctor.update(
        {
          avatar: user.avatar,
        },
        {
          where: {
            Doctor_id: user.Doctor_id,
          },
        }
      );
      return res.status(200).json({
        status: 200,
        data: user,
        message: 'Cập Nhật Ảnh Đại Diện Thành Công !'
      });
    }
    await User.update(
      {
        avatar: user.avatar,
      },
      {
        where: {
          User_id: user.User_id,
        },
      }
    );

    res.status(200).json({
      status: 200,
      data: user,
      message: 'Upload Ảnh Đại Diện Thành Công !'
    })
  } catch (error) {
    return next(error);
  }

}

const getImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    let findImage = await Doctor.findOne({
      where: {
        avatar: id,
      },
    });
    if (!findImage) {
      findImage = await User.findOne({
        where: {
          avatar: id,
        },
      });
    }
    if (!findImage) {
      return res.status(404).json({
        status: 404,
        message: 'Ảnh Không Tồn Tại !'
      })
    }
    return res.sendFile(path.join(__dirname, "../Images/Avatars", id));
  } catch (error) {
    return next(error);
  }

}

module.exports = {
  getDetail,
  getImage,
  upload,
  updateImage
}