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
      if(!findDoctor) {
        findDoctor = await Admin.findOne({
          where: {
            email: email,
          },
        });
        if(!findDoctor) {
          findDoctor = await User.findOne({
            where: {
              email: email,
            },
          });
        }
      }
      if (findDoctor) {
        return res.status(400).json({
          status: 400,
          message: "Email already exists !",
        });
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
