const { fa } = require("@faker-js/faker");
const nodemailer = require("nodemailer");
require("dotenv").config();

let transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMMAIL_PASSWORD,
  },
});

module.exports = {
  transport,
};
