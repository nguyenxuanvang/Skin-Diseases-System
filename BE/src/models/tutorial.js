const { DataTypes, Model } = require("sequelize");

const tutorialModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Tutorial",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publishedStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};

module.exports = {
  tutorialModel,
};
