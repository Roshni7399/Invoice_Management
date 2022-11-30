import nodemailer from "nodemailer";
const config = require("../config");
const configvalue = config.get("staging");
const email = configvalue["EMAIL"];
const path = require('path');
// console.log(email)
// import '../uploads/'
// import '../uploads'

export const sendMail = async (from, to, subject, html, attachments) => {
  var transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email.user,
      pass: email.pass,
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: html,
    attachments: [
      {
        filename: "invoice.pdf",
        path: "output/list.pdf",
        contentType: "application/pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(error)
    if (error) {
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};
