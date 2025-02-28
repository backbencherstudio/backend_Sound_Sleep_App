const dotenv = require("dotenv");
dotenv.config();

const dev = {
  db: {
    url: process.env.MONGODB_URI,
  },
  app: {
    port: process.env.PORT,
  },
};

module.exports = dev;
