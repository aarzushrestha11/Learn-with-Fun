const express = require("express");
const router = express.Router();
const { verifyToken, verifyRole } = require("../middleware/middleware");
const { getOpportunityById, getOpportunities, createOpportunity, updateOpportunity, deleteOpportunity } = require("../controllers/opportunityController");

// Route for getting all opportunities (Admin and Recruiter)
router.get("/",getOpportunities);
router.get("/:id",  getOpportunityById);

// Route for creating a new opportunity (Admin and Recruiter)
router.post("/", verifyToken, verifyRole(["Admin", "Recruiter"]), createOpportunity);

// Route for updating an opportunity (Admin and Recruiter)
router.put("/:id", verifyToken, verifyRole(["Admin", "Recruiter"]), updateOpportunity);

// Route for deleting an opportunity (Admin)
router.delete("/", verifyToken, verifyRole(["Admin"]),  deleteOpportunity);

module.exports = router;
