const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
  opportunityId: { type: mongoose.Schema.Types.ObjectId, ref: "Opportunity", },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
  fileUrl: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Reviewed", "Approved", "Rejected"], default: "Pending" },
  feedback: { type: String, default: "" },
});

module.exports = mongoose.model("Submission", submissionSchema);
