const nodemailer = require("nodemailer");
const { emailForgotPasswordOTP, emailMessage, emailUpdateOTP, resendRegistrationOTPEmail } = require("../constants/email_message");
const dotenv = require("dotenv");
dotenv.config();


// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// };

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendEmail = async (to, subject, htmlContent) => {
  const mailTransporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Master Energy"<mybesthealer@gmail.com>`,
    to,
    subject,
    html: htmlContent,
  };

  await mailTransporter.sendMail(mailOptions);
};
// SENDER_EMAIL = "fozlerabbishuvo@gmail.com"
// EMAIL_PASS = "qhdg kwxf pwgp dbho"

// Different email templates can be passed here
const sendRegistrationOTPEmail = async (userName, email, otp) => {
  console.log("hit sendOtp 2" )
  await sendEmail(email, "Master-Energy Verification", emailMessage(userName, email, otp)); 
};

const sendUpdateEmailOTP = async (userName, email, otp) => {
  await sendEmail(email, "Your OTP Code for SocialApp", emailUpdateOTP(userName, email, otp));
};

const sendForgotPasswordOTP = async (userName, email, otp) => {
  await sendEmail(email, "Master-Energy Verification", emailForgotPasswordOTP(userName, email, otp));
};

const resendRegistrationOTP = async (userName, email, otp) => {
  await sendEmail(email, "Your OTP Code for SocialApp", resendRegistrationOTPEmail(userName, email, otp));
};

module.exports = {
  generateOTP,
  sendEmail,
  sendRegistrationOTPEmail,
  sendUpdateEmailOTP,
  sendForgotPasswordOTP,
  resendRegistrationOTP,
};
