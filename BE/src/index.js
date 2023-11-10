const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { spawn } = require("child_process");
const { sequelize } = require("./database/sequelize");
const { userRouter } = require("./routes/users.route");
const bodyParser = require("body-parser");
const { tutorialRouter } = require("./routes/tutorial");
const { newRouter } = require("./routes/new.route");
const { doctorRouter } = require("./routes/doctor.route");
const app = express();
const PORT = 3000;

const { loggerErrorMiddleware, errorResponseMiddleware} = require('./middlewares/handle-error.middleware');
const corOptions = {
  origin: "http://localhost:3001",
};

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corOptions));
app.use("/user", userRouter);
app.use("/api/tutorials", tutorialRouter);
app.use("/new", newRouter);
app.use("/doctor", doctorRouter);

app.post("/scan", upload.single("image"), (req, res) => {
  const pythonProcess = spawn("python", ["./src/python/predict.py"]);
  pythonProcess.stdout.setEncoding("utf-8");
  pythonProcess.stdout.on("data", (data) => {
    res.json(data.trim());
  });
});

app.use(loggerErrorMiddleware);
app.use(errorResponseMiddleware);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database");
  });
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
