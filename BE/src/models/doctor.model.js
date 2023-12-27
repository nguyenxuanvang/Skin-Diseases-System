const { DataTypes, Model } = require("sequelize");

const doctorsModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Doctor",
    {
      Doctor_id: {
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
      },
      position: {
        type: DataTypes.STRING,
        allowNull: true
      },
      work_location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      experience: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      introduce: {
        type: DataTypes.STRING,
        allowNull: true
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false
      },
      approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
