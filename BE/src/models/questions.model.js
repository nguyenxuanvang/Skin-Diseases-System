const questionsModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "questions",
    {
      Question_id: {
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
      num_comments: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  questionsModel,
};
