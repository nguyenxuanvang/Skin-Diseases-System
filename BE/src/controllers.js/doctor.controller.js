const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require('path');
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { Doctor, Admin, User, Approvals, Denied, Questions, Comment, Replies } = require("../database/sequelize");
const saltRounds = 10;
const getDoctors = async (req, res, next) => {
  try {

    const doctors = await Doctor.findAll({
      where: {
        approved: true
      },
      order: [["createdAt", /*"DESC"*/ "ASC"]],
    });
    return res.status(200).json({
      status: 200,
      data: doctors
    });
  } catch (error) {
    return next(error);
  }
};

const getDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const findDoctor = await Doctor.findOne({
      where: {
        Doctor_id: id,
      },
    });
    if (!findDoctor) {
      return res.status(404).json({
        status: 404,
        message: 'Bác Sĩ Không Tồn Tại !'
      });
    }
    return res.status(200).json({
      status: 200,
      data: findDoctor
    });
  } catch (error) {
    return next(error);
  }
};

const getSearchDoctors = async (req, res, next) => {
  try {
    const { name } = req.query;
    const listDoctor = await Doctor.findAll({
      raw: true
    });
    const list = listDoctor.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    return res.status(200).json({
      status: 200,
      data: list,
      message: "Get Search Doctors Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const getImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findDoctor = await Doctor.findOne({
      where: {
        Doctor_id: id,
      },
    });
    if (!findDoctor) {
      return res.status(404).json({
        status: 404,
        message: 'Ảnh Không Tồn Tại !'
      });
    }
    return res.sendFile(path.join(__dirname, "../Images/Avatars", findDoctor.avatar));
  } catch (error) {
    return next(error);
  }
}


const deleteDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const questions = await Questions.findAll({
      where: {
        Doctor_id: id
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
        Doctor_id: id
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
        Doctor_id: id
      }
    });
    await Doctor.destroy({
      where: {
        Doctor_id: id,
      },
    });
    const listAvatar = fs.readdirSync("./src/Images/Avatars");
    const findAvatar = listAvatar.find(item => item.startsWith(id));
    if (findAvatar) {
      fs.unlinkSync(`./src/Images/Avatars/${findAvatar}`);
    }
    return res.status(200).json({
      status: 200,
      message: "Xóa Thành Công !",
    });
  } catch (error) {
    return next(error);
  }
};

const updateDoctor = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      email,
      password,
      oldPassword,
      name,
      position,
      work_location,
      experience,
      phone,
      address,
      introduce
    } = req.body;
    user.name = name || user.name;
    user.position = position || user.position;
    user.work_location = work_location || user.work_location;
    user.experience = experience || user.experience;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.introduce = introduce || user.introduce;

    if (email) {
      let findDoctor = await Doctor.findOne({
        where: {
          email: email,
        },
      });
      if (!findDoctor) {
        findDoctor = await Admin.findOne({
          where: {
            email: email,
          },
        });
        if (!findDoctor) {
          findDoctor = await User.findOne({
            where: {
              email: email,
            },
          });
        }
      }
      if (findDoctor && email !== user.email) {
        return res.status(400).json({
          status: 400,
          message: "Email Đã Tồn Tại !",
        });
      }
      user.email = email;
    }
    if (oldPassword) {
      const isValidPassword = bcrypt.compareSync(oldPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({
          status: 400,
          message: "Mật Khẩu Cũ Không Chính Xác !"
        });
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      user.password = hash;
    }
    await Doctor.update(
      {
        email: user.email,
        password: user.password,
        name: user.name,
        position: user.position,
        work_location: user.work_location,
        experience: user.experience,
        phone: user.phone,
        address: user.address,
        introduce: user.introduce
      },
      {
        where: {
          Doctor_id: user.Doctor_id,
        }
      });
    return res.status(200).json({
      status: 200,
      data: user,
      message: "Cập Nhật Thành Công !",
    });
  } catch (error) {
    return next(error);
  }
};
const getListRequest = async (req, res, next) => {
  try {
    const listRequest = await Approvals.findAll({
      include: Doctor,
      order: [["createdAt", /*"DESC"*/ "ASC"]],
      raw: true
    });
    return res.status(200).json({
      status: 200,
      data: listRequest
    });
  } catch (error) {
    return next(error);
  }
}

const getListRequestDetail = async (req, res, next) => {
  try {
    const { user } = req;
    const approval = await Approvals.findOne({
      where: {
        Doctor_id: user.Doctor_id
      },
      raw: true
    });
    const listDenied = await Denied.findAll({
      where: {
        Doctor_id: user.Doctor_id
      },
      raw: true
    });
    if (approval) {
      listDenied.unshift(approval);
    }

    return res.status(200).json({
      status: 200,
      data: listDenied
    })
  } catch (error) {
    return next(error);
  }
}

const getRequestImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.sendFile(path.join(__dirname, "../Images/Certificates", id));
  } catch (error) {
    return next(error);
  }
}

const approvalAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { result } = req.body;
    let message = "";
    if (result === "yes") {
      message = "Duyệt Thành Công !";
      const approval = await Approvals.findOne({
        where: {
          Doctor_id: id
        },
        raw: true
      });
      if(!approval) {
        return res.status(404).json({
          status: 404,
          message: "Yêu Cầu Không Tồn Tại !"
        })
      }
      fs.unlinkSync(`./src/Images/Certificates/${approval.image}`);
      await Approvals.destroy({
        where: {
          Doctor_id: id
        }
      });
      const findDoctor = await Doctor.findOne({
        where: {
          Doctor_id: id
        }
      });
      findDoctor.approved = 1;
      await findDoctor.save();
      const denieds = await Denied.findAll({
        where: {
          Doctor_id: id
        },
        raw: true
      });
      denieds.forEach(item => {
        fs.unlinkSync(`./src/Images/Certificates/${item.image}`);
      });
      await Denied.destroy({
        where: {
          Doctor_id: id
        }
      })
    }
    else {
      message = "Tài Khoảng Đã Bị Từ Chối Xác Thực !";
      const approval = await Approvals.findOne({
        where: {
          Doctor_id: id
        },
        raw: true
      });
      if(!approval) {
        return res.status(404).json({
          status: 404,
          message: "Yêu Cầu Không Tồn Tại !"
        })
      }
      const deny_id = uuidv4();
      const newDenied = await Denied.create({
        deny_id,
        image: approval.image,
        Doctor_id: id
      });
      await Approvals.destroy({
        where: {
          Doctor_id: id
        }
      })
    }
    return res.status(200).json({
      status: 200,
      message
    });
  } catch (error) {
    return next(error);
  }
}
const storage = multer.diskStorage({
  destination: "./src/Images/Certificates",
  filename: async (req, file, cb) => {
    const randomStr = uuidv4();
    const originalExtension = path.extname(file.originalname);
    const newFileName = randomStr + originalExtension;
    req.user.certificate = newFileName;
    cb(null, newFileName);
  },
});
const upload = multer({ storage: storage });
const sendRequest = async (req, res, next) => {
  try {
    const { user } = req;
    const findApproval = await Approvals.findOne({
      where: {
        Doctor_id: user.Doctor_id
      },
      raw: true
    });
    if (findApproval) {
      fs.unlinkSync(`./src/Images/Certificates/${user.certificate}`);
      return res.status(403).json({
        status: 403,
        message: "Một Yêu Cầu Xét Duyệt Của Bạn Đang Được Xử Lý ! Vui Lòng Chờ Được Duyệt Hoặc Xóa Yêu Cầu Trước Đó Để Có Thể Gửi Yêu Cầu Xét Duyệt Mới !"
      })
    }
    const approval_id = uuidv4();
    const approval = await Approvals.create({
      approval_id,
      image: user.certificate,
      Doctor_id: user.Doctor_id
    })
    return res.status(200).json({
      status: 200,
      data: approval,
      message: "Gửi Yêu Cầu Xét Duyệt Thành Công !"
    })
  } catch (error) {
    return next(error);
  }
}
const deleteRequest = async (req,res,next) => {
  try {
    const { user } = req;
    const findApproval = await Approvals.findOne({
      where: {
        Doctor_id: user.Doctor_id
      }
    });
    if(!findApproval) {
      return res.status(404).json({
        status: 404,
        message: "Yêu Cầu Xét Duyệt Không Tồn Tại !"
      })
    }
    await Approvals.destroy({
      where: {
        Doctor_id: user.Doctor_id
      }
    });
    fs.unlinkSync(`./src/Images/Certificates/${findApproval.image}`);
    return res.status(200).json({
      status: 200,
      message: "Hủy Yêu Cầu Thành Công !"
    })
  } catch (error) {
    return next(error);
  }
}
module.exports = {
  getDoctors,
  getDoctor,
  getSearchDoctors,
  getImage,
  deleteDoctor,
  updateDoctor,
  getListRequest,
  getRequestImage,
  approvalAccount,
  getListRequestDetail,
  upload,
  sendRequest,
  deleteRequest
};
