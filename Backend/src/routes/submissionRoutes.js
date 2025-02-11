const express = require("express");
const router = express.Router();

const upload=require("../middleware/multer")
const { verifyToken,verifyRole} = require("../middleware/middleware");
const { submitFile, getAllSubmissions, editSubmission,getSubmissionById} = require("../controllers/submissionController");

// Route for submitting a file (for opportunity)
router.post("/submit", verifyToken, upload.single("image"), submitFile);


router.get("/", verifyToken, verifyRole([ "Admin","Recruiter"]), getAllSubmissions);
router.get("/:id", verifyToken,  getSubmissionById);



// Route for updating submission status (Recruiter/Admin)
router.put("/:id", verifyToken, verifyRole(["Admin", "Recruiter"]),upload.single("image"), editSubmission);
 



module.exports = router;
  
