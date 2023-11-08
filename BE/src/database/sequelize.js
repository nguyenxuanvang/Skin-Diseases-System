const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");
const { userModel } = require("../models/users");
const { tutorialModel } = require("../models/tutorial");
const { doctorsModel } = require("../models/doctor");
const { questionsModel } = require("../models/questions");
const { answersModel } = require("../models/answers");
const { repliesModel } = require("../models/replies ");
const { newsModel } = require("../models/news");
const { diseasesModel } = require("../models/diseases");
const { adminModels } = require("../models/admin");
const { otpModel } = require("../models/otp");
const host = "localhost";
const port = 3306;
const user = "root";
const password = "123456";
const databaseName = "SkinDiagnoTechCap1";

const pool = mysql.createPool({ host, port, user, password });
pool.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);

const sequelize = new Sequelize(databaseName, user, password, {
  host,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    raw: true,
  },
});


const User = userModel(sequelize, DataTypes);
const Admin = adminModels(sequelize, DataTypes);
const Doctor = doctorsModel(sequelize, DataTypes);
const Questions = questionsModel(sequelize, DataTypes);
const Answers = answersModel(sequelize, DataTypes);
const Replies = repliesModel(sequelize, DataTypes);
const News = newsModel(sequelize, DataTypes);
const Diseases = diseasesModel(sequelize, DataTypes);
const Otp = otpModel(sequelize, DataTypes);
const Tutorial = tutorialModel(sequelize, DataTypes);

User.hasOne(Otp);

sequelize.sync({
  force: false,
});
// User.hasMany(
//   Tutorial
//   //   , {
//   //   foreign_key: "TutorialId",
//   //   as: "Tutorial",
//   // }
// );

// Tutorial.belongsTo(
//   User
//   //   , {
//   //   foreign_key: "TutorialId",
//   //   as: "User",
//   // }
// );

Questions.belongsTo(User, { foreignKey: "User_id" });
Questions.belongsTo(Doctor, { foreignKey: "Doctor_id" });
Answers.belongsTo(User, { foreignKey: "User_id" });
Answers.belongsTo(Doctor, { foreignKey: "Doctor_id" });
Answers.belongsTo(Questions, { foreignKey: "Question_id" });
Replies.belongsTo(User, { foreignKey: "User_id" });
Replies.belongsTo(Doctor, { foreignKey: "Doctor_id" });
Replies.belongsTo(Answers, { foreignKey: "Answers_id" });

module.exports = {
  sequelize,
  User,
  Tutorial,
  Admin,
  Doctor,
  Questions,
  Answers,
  Replies,
  News,
  Diseases,
  Otp,
};
