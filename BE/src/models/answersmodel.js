const { DataTypes, Model } = require("sequelize");

const answersModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "answers",
    {
      Answers_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      Content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      User_id: {
        type: DataTypes.STRING,
      },
      Doctor_id: {
        type: DataTypes.STRING,
      },
      Question_id: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  answersModel,
};
