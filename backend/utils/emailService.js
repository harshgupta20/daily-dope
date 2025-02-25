const nodemailer = require('nodemailer');
require("dotenv").config();

const SERVICE = process.env.SERVICE;
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const SECURE = process.env.SECURE;
const EMAIL =  process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const CC_EMAIL = process.env.CC_EMAIL;

console.log(SERVICE, HOST, PORT, SECURE, EMAIL, PASSWORD, CC_EMAIL);

const transporter = nodemailer.createTransport({
  service: SERVICE,
  host: HOST,
  port: PORT,
  secure: SECURE,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// Function to send an email
const sendMail = async (to, subject, html, cc , replyTo) => {
  try {
    const mailOptions = {
      from: `Daily Dope <${EMAIL}>`,
      to, // recipient email
      subject,
      html, // html body
      cc: CC_EMAIL, // cc recipients
      replyTo: EMAIL, // reply-to email
    };
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};


module.exports = {sendMail};