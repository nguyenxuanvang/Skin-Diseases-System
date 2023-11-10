const { DataTypes, Model } = require("sequelize");

const diseasesModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Diseases",
    {
      Diseases_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Solutions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  diseasesModel,
};
