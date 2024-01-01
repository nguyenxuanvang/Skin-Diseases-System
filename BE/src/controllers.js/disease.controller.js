const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { spawn } = require("child_process");
const { Mutex } = require('async-mutex');
const { Diseases } = require("../database/sequelize");

const lock = new Mutex();
let release;
const storage = multer.diskStorage({
  destination: "./src/Images/predictImage",
  filename: async(req, file, cb) => {
    release = await lock.acquire();
    const oldImage = fs.readdirSync("./src/Images/predictImage")[0];
    if (oldImage) {
      fs.unlinkSync(`./src/Images/predictImage/${oldImage}`);
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
      release();
      if(data.trim() === "false") {
        return res.status(200).json({
          status: 400,
          result: "Ảnh Không Hợp Lệ !"
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
      data: finddDisease
    });

  } catch (error) {
    return next(error);
  }
}

const uploadDisease = async (req,res,next) => {
  try{
    const {Title, Content} = req.body;
    const Diseases_id = uuidv4();
    const disease = await Diseases.create({
      Diseases_id,
      Name: Title,
      Solutions: Content,
    });
    return res.status(200).json({
      status: 200,
      data: disease,
      message: "Create Solution Of Disease Successfully !",
    });
  } catch(error) {
    return next(error);
  }
}
const getImage = async (req,res,next) => {
  try {
    const { name } = req.params;
    const listImage = fs.readdirSync("./src/Images/Diseases");
    const findImage = listImage.find(item => item.startsWith(name));
    if(!findImage) {
      return res.status(404).json({
        status: 404,
        message: 'Ảnh Không Tồn Tại !'
      })
    }
    return res.sendFile(path.join(__dirname, "../Images/Diseases", findImage));
  } catch(error) {
    return next(error);
  }
}
module.exports = {
  predict,
  upload,
  getDisease,
  uploadDisease,
  getImage
}
