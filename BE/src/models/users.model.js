const { DataTypes } = require("sequelize");

const userModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      User_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
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
        // defaultValue: "user",
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
