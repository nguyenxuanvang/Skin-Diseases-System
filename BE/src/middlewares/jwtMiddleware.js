const jwt = require('jsonwebtoken');
const { User, Doctor, Admin } = require("../database/sequelize");
const { da } = require('@faker-js/faker');
const auth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized - User Not Logged In !'
      })
    }
    let { roles } = req;
    if(!roles) roles = ['admin','user','doctor'];
    const accessToken = bearerToken.split(" ")[1];
    const data = jwt.verify(accessToken, "secret_key");
    if (!roles.includes(data.role)) {
      return res.status(403).json({
        status: 403,
        message: 'Unauthorized access to this resource !'
      });
    }
    if(data.role === 'user') {
      let user = await User.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      });
      req.user = user;
      return next();
    }
    if(data.role === 'doctor') {
      let doctor = await Doctor.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      });
      req.user = doctor;
      return next();
    }
    let admin = await Admin.findOne({
      where: {
        email: data.email,
      },
      raw: true,
    });
    req.user = admin;
    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  auth
}