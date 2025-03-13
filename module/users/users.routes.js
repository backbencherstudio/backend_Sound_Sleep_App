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
   ReferralCode,
   joiningDate,
   changePassword,
   setGoal,
   getGoal
} = require("./users.controllers");
const verifyUser = require("../../middleware/verifyUser");

router.get('/referral-code', verifyUser, ReferralCode);
router.get("/joining-date", verifyUser, joiningDate);
router.post("/signup", upload.single("image"), signUpController);
router.post("/set-goal", verifyUser, setGoal);
router.get("/get-goal", verifyUser, getGoal);
router.post("/logIn", loginController);

router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.patch("/change-password", changePassword);

router.patch("/reset-password",verifyUser,  resetPassword);

router.put("/update-user", verifyUser, upload.single("image"), updateUser);

router.delete("/delete-user", deleteUser);


module.exports = router;
