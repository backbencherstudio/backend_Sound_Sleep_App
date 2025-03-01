const express = require("express");
const router = express.Router();
const { createFeedback, getAllFeedback, getFeedbackByCategory } = require("./feedback.controllers");
const verifyUser = require("../../middleware/verifyUser");


router.post("/create", verifyUser, createFeedback);
router.get("/get-all-feedback", getAllFeedback);
router.get("/feedback/category/:category", getFeedbackByCategory);

module.exports = router;
