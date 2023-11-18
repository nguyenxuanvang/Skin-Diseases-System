const { DataTypes } = require("sequelize");

const otpModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Otp",
    {
      otpCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expireAt: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  otpModel,
};
