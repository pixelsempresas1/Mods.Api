const nodemailer = require("nodemailer");

const SMTP_CONFIG = require("./config/smtp");

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function emailsend(texto, motivo) {
  const mailSent = transporter.sendMail({
    text: `${motivo}`,
    subject: `${texto}`,
    to: [`support@whatsapp.com`]
  });

  console.log(mailSent);
}
module.exports = { emailsend }