require("dotenv").config();
const getImageUrl = (imagePath) => {
  return `${process.env.APP_URL}${imagePath}`;
};

const baseUrl = process.env.APP_URL;

module.exports = { getImageUrl, baseUrl };
