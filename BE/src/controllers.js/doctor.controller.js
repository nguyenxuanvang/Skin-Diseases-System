const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Doctor, Admin, User } = require("../database/sequelize");
const saltRounds = 10;
const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll({
      order: [["createdAt", /*"DESC"*/ "ASC"]],
    });

    return res.status(200).json({
      status: 200,
      data: {
        doctors,
      },
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
    if (user.role === "admin") {
      if (!findDoctor) {
        return res.status(400).json({
          status: 400,
          message: "Doctor Is Not Exist !",
        });
      }
      return res.status(200).json({
        status: 200,
        data: {
          findDoctor,
        },
      });
    }

    if (user.Doctor_id !== id) {
      return res.status(403).json({
        status: 403,
        message: "Unauthorized access to this resource !",
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        findDoctor,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Doctor.destroy({
      where: {
        Doctor_id: id,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Deleted successfully !",
    });
  } catch (error) {
    return next(error);
  }
};

const updateDoctor = async (req, res, next) => {
  try {
    const { user } = req;
    const { email, password, username } = req.body;

    if (email) {
      let findDoctor = await Doctor.findOne({
        where: {
          email: email,
        },
      });
      findDoctor = await Admin.findOne({
        where: {
          email: email,
        },
      });
      findDoctor = await User.findOne({
        where: {
          email: email,
        },
      });
      if (findDoctor) {
        return res.status(400).json({
          status: 400,
          message: "Email already exists !",
        });
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
    await Doctor.update(
      {
        email: user.email,
        password: user.password,
        username: user.username,
      },
      {
        where: {
          Doctor_id: user.Doctor_id,
        },
      }
    );
    return res.status(200).json({
      status: 200,
      data: {
        newDoctor: user,
      },
      message: "Updated Successfully !",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDoctors,
  getDoctor,
  deleteDoctor,
  updateDoctor,
};
