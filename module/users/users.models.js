const mongoose = require("mongoose");

const goalMapping = {
  "Deep Sleep": "Get a quality Sleep",
  "Overcome Stress": "Manage stress & Anxiety",
  "Feel Nature": "Hear diverse nature sounds",
  "Improve Performance": "Get a better start",
  "Boost Concentration": "Improve focus",
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: null },
    resetCode: { type: String },
    resetCodeExpiry: { type: Date },
    userGoals: { type: [String], enum: Object.keys(goalMapping), default: [] },
    goalDescriptions: { type: [String], default: [] },
    role: { type: String, default: "user" },
    referralCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.goalDescriptions = this.userGoals.map(goal => goalMapping[goal]);
  next();
});

module.exports = mongoose.model("User", userSchema);
