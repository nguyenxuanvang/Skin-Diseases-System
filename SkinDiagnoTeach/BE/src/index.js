const express = require("express");
const cors = require("cors");
const { sequelize } = require("./database/sequelize");
const { userRouter } = require("./routes/users");
const bodyParser = require("body-parser");
const { tutorialRouter } = require("./routes/tutorial");

const app = express();
const PORT = 3000;

const corOptions = {
  origin: "http://localhost:3001",
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corOptions));
app.use("/user", userRouter);
app.use("/api/tutorials", tutorialRouter);

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
