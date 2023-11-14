const jwt = require("jsonwebtoken");
const { User, Doctor, Admin } = require("../database/sequelize");
const auth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized - User Not Logged In !",
      });
    }

    let { roles } = req;
    if (!roles) roles = ["admin", "user", "doctor"];
    const accessToken = bearerToken.split(" ")[1];
    const data = jwt.verify(accessToken, process.env.SECRET_KEY);
    if (!roles.includes(data.role)) {
      return res.status(403).json({
        status: 403,
        message: "Unauthorized access to this resource !",
      });
    }
    if (data.role === "user") {
      let user = await User.findOne({
        where: {
          User_id: data.User_id,
        },
        raw: true,
      });
      req.user = user;
      return next();
    }
    if (data.role === "doctor") {
      let doctor = await Doctor.findOne({
        where: {
          Doctor_id: data.Doctor_id,
        },
        raw: true,
      });
      req.user = doctor;
      return next();
    }
    let admin = await Admin.findOne({
      where: {
        Admin_id: data.Admin_id,
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
  auth,
};
