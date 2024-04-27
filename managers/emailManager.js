const nodemailer = require("nodemailer");

const emailManager = (to, text, html, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "249c914dace868",
      pass: "1ca9ce63aa9333",
    },
  });

  transport.sendMail({
    to: to,
    sender: "mailerwebhook@gmail.com",
    text: text,
    html: html,
    subject: subject,
  });
};
module.exports = emailManager;
