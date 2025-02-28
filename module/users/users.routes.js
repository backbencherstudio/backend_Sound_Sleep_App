const express = require("express");
const router = express.Router();
const upload = require("../../config/multer.config");

const {
  signUpController,
  loginController,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  deleteUser,
  updateUser,
} = require("./users.controllers");
const verifyUser = require("../../middleware/verifyUser");


router.post("/signup", upload.single("image"), signUpController);
router.post("/logIn", loginController);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);
router.put("/update-user",verifyUser, upload.single("image"), updateUser)
router.delete("/delete-user/:email", deleteUser);


module.exports = router;


