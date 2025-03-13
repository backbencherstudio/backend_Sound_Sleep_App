require("dotenv").config();
const moment = require("moment");
const { baseUrl, generateReferralCode } = require("../../utils/image_path");
const { generateOTP, sendForgotPasswordOTP } = require("../../utils/otpUtils");
const User = require("../users/users.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const path = require("path");

const goalMapping = {
  "Deep Sleep": "Get a quality Sleep",
  "Overcome Stress": "Manage stress & Anxiety",
  "Feel Nature": "Hear diverse nature sounds",
  "Improve Performance": "Get a better start",
  "Boost Concentration": "Improve focus",
};

const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const missingField = ["name", "email", "password"].find(
      (field) => !req.body[field]
    );

    if (missingField)
      return res.status(400).json({ message: `${missingField} is required!` });

    const existingUser = await User.exists({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let referralCode;
    do {
      referralCode = generateReferralCode();
    } while (await User.exists({ referralCode: referralCode }));

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      referralCode,
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name,
        email,
        image: `${baseUrl}${user.image}`,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const setGoal = async (req, res) => {
  try {
    const userId = req.user.id;
    let { userGoals } = req.body;

    if (!Array.isArray(userGoals)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input format. Please provide an array.",
      });
    }

    const validGoals = userGoals.filter((goal) => goalMapping[goal]);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.userGoals = validGoals;
    await user.save();

    const formattedGoals = validGoals.map((goal) => ({
      userGoals: goal,
      goalDescriptions: goalMapping[goal],
    }));

    res.status(200).json({
      success: true,
      message:
        validGoals.length > 0
          ? "Goals updated successfully!"
          : "Goals skipped successfully!",
      goals: formattedGoals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getGoal = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedGoals = user.userGoals.map((goal) => ({
      userGoals: goal,
      goalDescriptions: goalMapping[goal],
    }));

    res.status(200).json({
      success: true,
      message:
        user.userGoals.length > 0
          ? "Goals retrieved successfully!"
          : "No goals set yet.",
      goals: formattedGoals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: `${!email ? "Email" : "Password"} is required!` });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    if (!user.referralCode) {
      let referralCode;
      do {
        referralCode = generateReferralCode();
      } while (await User.exists({ referralCode: referralCode }));

      user.referralCode = referralCode;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: `${baseUrl}${user.image}`,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required!" });
    const user = await User.findOneAndUpdate(
      { email },
      {
        resetCode: generateOTP(),
        resetCodeExpiry: Date.now() + 10 * 60 * 1000,
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found!" });

    sendForgotPasswordOTP(user.name, user.email, user.resetCode);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please check your email.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const verifyResetCode = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: `${!email ? "Email" : "OTP"} is required!`,
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.resetCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP!" });
    }

    if (Date.now() > user.resetCodeExpiry) {
      return res.status(400).json({ message: "OTP has expired!" });
    }

    user.resetCode = null;
    user.resetCodeExpiry = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully! Proceed to reset your password.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: `${!email ? "Email" : "New password"} is required!`,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: `${
          !currentPassword ? "Current password" : "New password"
        } is required!`,
      });
    }

    const userId = req.user.id;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password!" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `${!email ? "Email" : "Password"} is required!`,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password!" });
    }

    await User.deleteOne({ email });

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name && name.trim() !== "") user.name = name;
    if (email && email.trim() !== "") user.email = email;

    if (req.file) {
      // Remove old image if it exists
      if (user.image) {
        const oldImagePath = path.join(__dirname, "../../", user.image);
 
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      user.image = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      token: null,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: `${baseUrl}${user.image}`,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const ReferralCode = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      referralCode: user.referralCode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const joiningDate = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const relativeTime = moment(user.createdAt).fromNow();

    res.status(200).json({
      success: true,
      joiningDate: `Joiend ${relativeTime}`,
      // createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  signUpController,
  loginController,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  updateUser,
  resetPassword,
  deleteUser,
  ReferralCode,
  joiningDate,
  changePassword,
  setGoal,
  getGoal,
};
