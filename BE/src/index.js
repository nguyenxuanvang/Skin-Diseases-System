const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { sequelize } = require("./database/sequelize");
const { authRouter } = require("./routes/auth.route");
const { userRouter } = require("./routes/user.route");
const { doctorRouter } = require("./routes/doctor.route");
const { newsRouter } = require("./routes/news.route");
const { diseaseRouter } = require("./routes/disease.route");
const { questionRoute } = require("./routes/question.route");
const { commentRoute } = require("./routes/comment.route");
const { repliesRoute } = require("./routes/replies.route");
const { detailRouter } = require("./routes/detail.route");


const {
  loggerErrorMiddleware,
  errorResponseMiddleware,
} = require("./middlewares/handle-error.middleware");


const app = express();
const PORT = 3000;

const corOptions = {
  origin: "http://localhost:3001",
};

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corOptions));



app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/doctor", doctorRouter);
app.use("/news", newsRouter);
app.use("/disease", diseaseRouter);
app.use("/question", questionRoute);
app.use("/comment", commentRoute);
app.use("/replies", repliesRoute);
app.use("/detail",detailRouter);

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
