
const nodemailer = require("nodemailer");
const {verifyOtpTemplate} = require('./emailTemplates')
const {
  BREVO_SMTP_HOST,
  BREVO_SMTP_PORT,
  BREVO_SMTP_USER,
  BREVO_SMTP_PASS,
  BREVO_FROM_EMAIL,
  BREVO_FROM_NAME
} = process.env;


const transporter = nodemailer.createTransport({
  host: BREVO_SMTP_HOST,
  port: BREVO_SMTP_PORT,
  secure: false,
  auth: {
    user: BREVO_SMTP_USER,
    pass: BREVO_SMTP_PASS
  }
});


async function sendMail(to, subject, html) {
  return transporter.sendMail({
    from: `"${BREVO_FROM_NAME}" <${BREVO_FROM_EMAIL}>`,
    to,
    subject,
    html
  });
}



async function sendVerifyOtp(to, otp) {
   const html = verifyOtpTemplate(otp);
  return sendMail(to, "Your Secure Access Code", html);
}

module.exports = { sendVerifyOtp };
