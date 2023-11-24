const { DataTypes, Model } = require("sequelize");

const newsModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "News",
    {
      News_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
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
  newsModel,
};
