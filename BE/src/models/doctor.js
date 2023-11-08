const { DataTypes, Model } = require("sequelize");

const doctorsModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "doctors",
    {
      Doctor_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      Phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  doctorsModel,
};
