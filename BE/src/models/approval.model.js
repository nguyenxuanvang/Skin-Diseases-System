const { DataTypes, Model } = require("sequelize");

const approvalModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Approvals",
    {
      approval_id: {
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
        unique: true
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  approvalModel,
};
