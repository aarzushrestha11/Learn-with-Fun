const mongoose = require("mongoose");

const opportunitySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["Hackathon", "Quiz", "Job", "Internship"], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deadline: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
