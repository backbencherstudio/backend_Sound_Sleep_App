const emailMessage = (userName, email, OTP) => {
  return `
<div
      style="
        max-width: 600px;
        margin: auto;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
        border-radius: 8px;
      "
    >
      <table
        style="
          width: 100%;
          background: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        "
      >
        <tr>
          <td style="padding-bottom: 10px;">
            <h1 style="color: #333; font-size: 26px; margin: 0;">Welcome to <span style="color: #007bff;">Hypno4U™</span></h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 15px; font-size: 16px; color: #555;">
            We are thrilled to have you on board! Get ready to explore amazing content and experience the best we have to offer.
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <a href="https://hypno4u.com/subscriptionplan"
              style="
                display: inline-block;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                font-size: 16px;
                padding: 12px 24px;
                border-radius: 5px;
                font-weight: bold;
              "
            >Explore Subscription Plans</a>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 15px; font-size: 12px; color: #aaa; border-top: 1px solid #ddd;">
            &copy; 2025 Hypno4U™. All rights reserved.<br />
            <small>You are receiving this email because you signed up for our service.</small>
          </td>
        </tr>
      </table>
    </div>
`;
};

const emailUpdateOTP = (
  userName,
  email,
  newOTP
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://via.placeholder.com/150x50?text=SocialApp" alt="SocialApp Logo" style="max-width: 100%; height: auto;">
      </div>
      <h2 style="color: #007bff;">Update OTP for SocialApp</h2>
      <p style="color: #333; font-size: 18px;">Hi ${userName},</p>
      <p style="color: #333; font-size: 16px;">We have received a request to update the OTP for your account on SocialApp. Please use the new OTP code below:</p>
      <div style="text-align: center; margin: 20px 0;">
        <div style="display: inline-block; padding: 15px 30px; background-color: #007bff; color: #fff; font-size: 24px; font-weight: bold; border-radius: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">${newOTP}</div>
      </div>
      <p style="color: #333; font-size: 16px;">This OTP is valid for 10 minutes. If you did not request this update, please ignore this email.</p>
      <p style="color: #333; font-size: 16px;">Cheers,</p>
      <p style="color: #333; font-size: 16px;">The SocialApp Team</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #777; font-size: 12px; text-align: center;">This email was sent to ${email}. If you are not expecting this OTP update, please disregard this email.</p>
    </div>
  `;
};


const emailForgotPasswordOTP = (userName, email, OTP) => {

  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/drmwgwztd/image/upload/v1740022204/z9nutoxgrdrmxn2jja1k.png" alt="Master Energy Logo" style="max-width: 100%; height: auto;">
    </div>
    <h2>Reset Your Password</h2>
    <p style="color: #333; font-size: 18px;">Hi ${userName},</p>
    <p style="color: #333; font-size: 16px;">We received a request to reset your password for your Master Energy account. Please use the OTP code below to proceed:</p>
    <div style="text-align: center; margin: 20px 0;">
      <div style="display: inline-block; padding: 15px 30px; color: #000; font-size: 30px; font-weight: bold; border-radius: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">${OTP}</div>
    </div>
    <p style="color: #333; font-size: 16px;">This OTP is valid for 10 minutes. If you did not request this password reset, please ignore this email.</p>
    <p style="color: #333; font-size: 16px;">Best Regards,</p>
    <p style="color: #333; font-size: 16px;">The Master Energy Team</p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="color: #777; font-size: 12px; text-align: center;">This email was sent to ${email}. If you did not request a password reset, please disregard this email.</p>
  </div>
`;
};

const resendRegistrationOTPEmail = (
  userName,
  email,
  OTP
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://via.placeholder.com/150x50?text=SocialApp" alt="SocialApp Logo" style="max-width: 100%; height: auto;">
      </div>
      <h2 style="color: #007bff;">Resend Registration OTP</h2>
      <p style="color: #333; font-size: 18px;">Hi ${userName},</p>
      <p style="color: #333; font-size: 16px;">We noticed you requested a new OTP code for completing your registration on SocialApp. Please use the OTP code below:</p>
      <div style="text-align: center; margin: 20px 0;">
        <div style="display: inline-block; padding: 15px 30px; background-color: #007bff; color: #fff; font-size: 24px; font-weight: bold; border-radius: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">${OTP}</div>
      </div>
      <p style="color: #333; font-size: 16px;">This OTP is valid for 10 minutes. If you did not request this code, please ignore this email.</p>
      <p style="color: #333; font-size: 16px;">Cheers,</p>
      <p style="color: #333; font-size: 16px;">The SocialApp Team</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #777; font-size: 12px; text-align: center;">This email was sent to ${email}. If you did not sign up for SocialApp, please disregard this email.</p>
    </div>
  `;
};

// newsletter email
const emailNewsletter = (email) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://via.placeholder.com/150x50?text=TravelAgency" alt="TravelAgency Logo" style="max-width: 100%; height: auto;">
      </div>
      <h2 style="color: #007bff;">Welcome to TravelAgency!</h2>
      <p style="color: #333; font-size: 18px;">Hi there,</p>
      <p style="color: #333; font-size: 16px;">Thank you for subscribing to our newsletter. You will now receive the latest updates and offers from TravelAgency.</p>
      <p style="color: #333; font-size: 16px;">Cheers,</p>
      <p style="color: #333; font-size: 16px;">The TravelAgency Team</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #777; font-size: 12px; text-align: center;">This email was sent to ${email}. If you did not subscribe to TravelAgency, please disregard this email.</p>
    </div>
  `;
};

module.exports = {
  emailMessage,
  emailUpdateOTP,
  emailForgotPasswordOTP,
  resendRegistrationOTPEmail,
  emailNewsletter,
};
