const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");
const { userModel } = require("../models/users.model");
const { tutorialModel } = require("../models/tutorial.model");
const { doctorsModel } = require("../models/doctor.model");
const { questionsModel } = require("../models/questions.model");
const { commentModel } = require("../models/comment.model");
const { repliesModel } = require("../models/replies.model");
const { newsModel } = require("../models/news.model");
const { diseasesModel } = require("../models/diseases.model");
const { adminModels } = require("../models/admin.model");
const { otpModel } = require("../models/otp.model");
const host = "localhost";
const port = 3306;
const user = "root";
const password = "123123";
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
const Comment = commentModel(sequelize, DataTypes);
const Replies = repliesModel(sequelize, DataTypes);
const News = newsModel(sequelize, DataTypes);
const Diseases = diseasesModel(sequelize, DataTypes);
const Otp = otpModel(sequelize, DataTypes);
const Tutorial = tutorialModel(sequelize, DataTypes);

User.hasOne(Otp);

sequelize.sync({
  force: false,
});

Questions.belongsTo(User, { foreignKey: "User_id" });
Questions.belongsTo(Doctor, { foreignKey: "Doctor_id" });
Comment.belongsTo(User, { foreignKey: "User_id" });
Comment.belongsTo(Doctor, { foreignKey: "Doctor_id" });
Comment.belongsTo(Questions, { foreignKey: "Question_id" });
Replies.belongsTo(User, { foreignKey: "User_id" });
Replies.belongsTo(Doctor, { foreignKey: "Doctor_id" });
Replies.belongsTo(Comment, { foreignKey: "Comment_id" });

User.hasMany(Questions, {
  foreignKey: "Question_id",
});
Doctor.hasMany(Questions, {
  foreignKey: "Question_id",
});
User.hasMany(Comment, {
  foreignKey: "Comment_id",
});
Doctor.hasMany(Comment, {
  foreignKey: "Comment_id",
});
Questions.hasMany(Comment, {
  foreignKey: "Comment_id",
});
User.hasMany(Replies, {
  foreignKey: "Replies_id",
});
Doctor.hasMany(Replies, {
  foreignKey: "Replies_id",
});
Comment.hasMany(Replies, {
  foreignKey: "Replies_id",
});
module.exports = {
  sequelize,
  User,
  Tutorial,
  Admin,
  Doctor,
  Questions,
  Comment,
  Replies,
  News,
  Diseases,
  Otp,
};
