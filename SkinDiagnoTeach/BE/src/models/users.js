const { DataTypes, Model } = require("sequelize");

const userModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      avatar: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  userModel,
};
