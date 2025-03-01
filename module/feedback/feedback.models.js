const mongoose = require("mongoose");

const emojiEnum = [
  "happy",
  "sad",
  "angry",
  "cool",
  "love",
  "thinking",
  "playful",
];

const feedbackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reading: { type: Number, min: 1, max: 5 },
    emoji: { type: String, enum: emojiEnum },
    category: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
