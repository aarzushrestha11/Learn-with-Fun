const Opportunity = require("../models/Opportunity");


const createOpportunity = async (req, res) => {
 
  const { title, description, type, deadline } = req.body;
  
 
  if (!req.user || !["Admin", "Recruiter"].includes(req.user.role)) {
    return res.status(403).json({ message: "Not authorized to create opportunities" });
}


  try {
    const opportunity = await Opportunity.create({
      title,
      description,
      type,
      deadline,
      createdBy: req.user._id,
    });

    res.status(201).json(opportunity);
  } catch (error) {
    console.error("Error during opportunity creation:", error);
    res.status(500).json({ message: "Failed to create opportunity" });
  }
};


const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().populate("createdBy", "name email");
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch opportunities" });
  }
};


const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate("createdBy", "name email");
    if (!opportunity) return res.status(404).json({ message: "Opportunity not found" });
    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch opportunity" });
  }
};


const updateOpportunity = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, description, type, deadline } = req.body;

   
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      _idid,
      { title, description, type, deadline },
      { new: true, runValidators: true } 
    );

    if (!updatedOpportunity) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }

    res.status(200).json(updatedOpportunity);
  } catch (error) {
    console.error('Error updating opportunity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an opportunity
const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params._id);

    if (!opportunity) return res.status(404).json({ message: "Opportunity not found" });

    if (opportunity.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await opportunity.remove();
    res.json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete opportunity" });
  }
};

module.exports = {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
};
