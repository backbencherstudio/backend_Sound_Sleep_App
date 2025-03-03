const { baseUrl } = require("../../utils/image_path");
const Feedback = require("./feedback.models");

const createFeedback = async (req, res) => {
  try {
    const { reading, emoji, category, description } = req.body;

    // Check for missing fields
    const missingField = ["reading", "emoji", "description"].find(
      (field) => !req.body[field]
    );
    if (missingField) {
      return res.status(400).json({ message: `${missingField} is required!` });
    }
    console.log(req.user);
    const feedback = new Feedback({
      user: req.user.id, // Assign user ID from token
      reading,
      emoji,
      category,
      description,
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("user", "name email _id image")
      .sort({ createdAt: -1 })
      .lean();

    //   const formattedFeedback = feedback.map((item) => ({
    //     ...item._doc,
    //     user: {
    //       ...item.user._doc,
    //       image: item.user.image ? `${baseUrl}${item.user.image}` : null,
    //     },
    //     image: item.image ? `${baseUrl}${item.image}` : null,
    //   }));
    const formattedFeedback = feedback.map(({ user, image, ...rest }) => ({
      ...rest,
      user: user
        ? { ...user, image: user.image ? `${baseUrl}${user.image}` : null }
        : null,
    }));

    res.status(200).json({ success: true, feedback: formattedFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


const getFeedbackByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const feedback = await Feedback.find({
      category: { $in: [category] },
    }).populate("user", "name email");

    if (feedback.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No feedback found for this category.",
      });
    }

    res.status(200).json({ success: true, feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
  getFeedbackByCategory,
};
