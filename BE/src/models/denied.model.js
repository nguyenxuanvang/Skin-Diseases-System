const { DataTypes, Model } = require("sequelize");

const deniedModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Denied",
    {
      deny_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Doctor_id: {
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
  deniedModel,
};
