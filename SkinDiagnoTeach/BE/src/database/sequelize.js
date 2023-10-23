const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");
const { userModel } = require("../models/users");
const { tutorialModel } = require("../models/tutorial");
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
const Tutorial = tutorialModel(sequelize, DataTypes);
const adminModel = tutorialModel(sequelize, DataTypes);

sequelize.sync({
  force: false,
});
User.hasMany(
  Tutorial
  //   , {
  //   foreign_key: "TutorialId",
  //   as: "Tutorial",
  // }
);

Tutorial.belongsTo(
  User
  //   , {
  //   foreign_key: "TutorialId",
  //   as: "User",
  // }
);

module.exports = {
  sequelize,
  User,
  Tutorial,
  adminModel,
};
