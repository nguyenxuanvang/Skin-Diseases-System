const { v4: uuidv4 } = require("uuid");
const { Doctor } = require("../database/sequelize");

const createDoctor = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const Doctor_id = uuidv4();
    const newDoctor = await Doctor.create({
      Doctor_id,
      username,
      email,
      password,
    });
    return res.json({
      data: {
        newDoctor,
      },
      message: "Create doctor success",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteDoctor = async (req, res, next) => {
  try {
    const { Doctor_id } = req.params;
    const deleteDoctor = await Doctor.destroy({
      where: {
        Doctor_id,
      },
    });
    return res.json({
      data: {
        deleteDoctor,
      },
      message: "Delete Doctor success",
    });
  } catch (error) {
    return next(error);
  }
};

const updateDoctor = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { Doctor_id } = req.params;
    const updateDoctor = await Doctor.update(
      {
        username,
        email,
        password,
      },
      {
        where: {
          Doctor_id: Doctor_id,
        },
      }
    );
    return res.json({
      data: {
        updateDoctor,
      },
      message: "Update Doctor success",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createDoctor,
  deleteDoctor,
  updateDoctor,
};
