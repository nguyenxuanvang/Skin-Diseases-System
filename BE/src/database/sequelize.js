const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");
const { userModel } = require("../models/users.model");
const { doctorsModel } = require("../models/doctor.model");
const {approvalModel} = require("../models/approval.model");
const {deniedModel} = require("../models/denied.model");
const { questionsModel } = require("../models/questions.model");
const { commentModel } = require("../models/comment.model");
const { repliesModel } = require("../models/replies.model");
const { newsModel } = require("../models/news.model");
const { diseasesModel } = require("../models/diseases.model");
const { adminModels } = require("../models/admin.model");

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
const Approvals = approvalModel(sequelize, DataTypes);
const Denied = deniedModel(sequelize,DataTypes);
const Questions = questionsModel(sequelize, DataTypes);
const Comment = commentModel(sequelize, DataTypes);
const Replies = repliesModel(sequelize, DataTypes);
const News = newsModel(sequelize, DataTypes);
const Diseases = diseasesModel(sequelize, DataTypes);


sequelize.sync({
  force: false,
});

Questions.belongsTo(User, { foreignKey: "User_id" });
Questions.belongsTo(Doctor, { foreignKey: "Doctor_id" });
Approvals.belongsTo(Doctor, {foreignKey: "Doctor_id"});
Denied.belongsTo(Doctor, {foreignKey: "Doctor_id"});
Comment.belongsTo(User, { foreignKey: "User_id" });
Comment.belongsTo(Doctor, { foreignKey: "Doctor_id" });
Comment.belongsTo(Questions, { foreignKey: "Question_id" });
Replies.belongsTo(User, { foreignKey: "User_id" });
Replies.belongsTo(Doctor, { foreignKey: "Doctor_id" });
Replies.belongsTo(Comment, { foreignKey: "Comment_id" });

Doctor.hasMany(Approvals, {
  foreignKey: "Doctor_id",
})
Doctor.hasMany(Denied, {
  foreignKey: "Doctor_id",
})
User.hasMany(Questions, {
  foreignKey: "User_id",
});
Doctor.hasMany(Questions, {
  foreignKey: "Doctor_id",
});
User.hasMany(Comment, {
  foreignKey: "User_id",
});
Doctor.hasMany(Comment, {
  foreignKey: "Doctor_id",
});
Questions.hasMany(Comment, {
  foreignKey: "Question_id",
});

User.hasMany(Replies, {
  foreignKey: "User_id",
});
Doctor.hasMany(Replies, {
  foreignKey: "Doctor_id",
});
Comment.hasMany(Replies, {
  foreignKey: "Comment_id",
});

module.exports = {
  sequelize,
  User,
  Admin,
  Doctor,
  Approvals,
  Denied,
  Questions,
  Comment,
  Replies,
  News,
  Diseases,
};
