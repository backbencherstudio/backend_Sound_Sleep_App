require("dotenv").config();
const getImageUrl = (imagePath) => {
  return `${process.env.APP_URL}${imagePath}`;
};

const baseUrl = process.env.APP_URL;

const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

module.exports = { getImageUrl, baseUrl, generateReferralCode };
