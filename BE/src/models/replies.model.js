const { DataTypes, Model } = require("sequelize");

const repliesModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Replies",
    {
      Replies_id: {
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
      Comment_id: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  repliesModel,
};
