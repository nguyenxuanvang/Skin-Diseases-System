const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const { Diseases } = require("../database/sequelize");

const storage = multer.diskStorage({
  destination: "./src/predictImage",
  filename: (req, file, cb) => {
    const oldImage = fs.readdirSync("./src/predictImage")[0];
    if (oldImage) {
      fs.unlinkSync(`./src/predictImage/${oldImage}`);
    }
    const originalExtension = path.extname(file.originalname);

    const newFileName = file.fieldname + originalExtension;

    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

const predict = async (req,res,next) => {
  try {
    const pythonProcess = spawn("python", ["./src/python/predict.py"]);
    pythonProcess.stdout.setEncoding("utf-8");
    pythonProcess.stdout.on("data", (data) => {
      if(data.trim() === "false") {
        return res.status(200).json({
          status: 400,
          result: "Invalid Image !"
        });
      }
      return res.status(200).json({
          status: 200,
          result: data.trim()
      });
    });
  } catch (error) {
    return next(error);
  }
}

const getDisease = async (req, res, next) => {
  try {
    const { name } = req.params;
    const finddDisease = await Diseases.findOne({
      where: {
        Name: name,
      }
    });
    return res.status(200).json({
      status: 200,
      data: {
        disease: finddDisease,
      }
    });

  } catch (error) {
    return next(error);
  }
}

module.exports = {
  predict,
  upload,
  getDisease
}
