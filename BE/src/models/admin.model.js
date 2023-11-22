const { DataTypes, Model } = require("sequelize");

const adminModels = (sequelize, DataTypes) => {
  return sequelize.define(
    "admin",
    {
      Admin_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
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
        allowNull: false
      }
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  adminModels,
};
