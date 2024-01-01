const { User, Doctor, Admin } = require("../database/sequelize");

const checkValidate = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (email) {
      const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          status: 400,
          message: "Định Dạng Email Không Hợp Lệ !",
        });
      }
    }

    if (password) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          status: 400,
          message:
            "Mật Khẩu Phải Chứa Ít Nhất 1 Ký Tự In Hoa, 1 Ký Tự Thường và Có Chiều Dài Ít Nhất 8 Ký Tự !",
        }); 
      }
    }
    
    if (name) {
      const nameRegex = /^[a-zA-Z\sĐđÀ-ỹẰằẮắẲẳẴẵẶặẤấẦầẨẩẪẫẬậỀềỂểỄễỆệỈỉỊị]{5,20}$/;
      if (!nameRegex.test(name)) {
        return res.status(400).json({
          status: 400,
          message:
            "Họ Tên Phải Có Chiều Dài Từ 5 Đến 20 Ký Tự và Chỉ Được Phép Chứa Chữ Cái !",
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
        message: "Email Đã Tồn Tại !",
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
        message: "Email Không Tồn Tại !",
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
