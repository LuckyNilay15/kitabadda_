import Summary from "../model/Summary.js";

// Save summary for specific user
export const saveSummary = async (req, res) => {
  const { summary, userId } = req.body;

  if (!summary || !userId) {
    return res.status(400).json({ error: "Missing summary or userId." });
  }

  try {
    const newSummary = new Summary({
      user: userId,
      text: summary,
    });

    await newSummary.save();
    res.status(201).json({ message: "Summary saved successfully!" });
  } catch (err) {
    console.error("Error saving summary:", err);
    res.status(500).json({ error: "Failed to save summary." });
  }
};

// Fetch all summaries for specific user
export const getSummaries = async (req, res) => {
    console.log("Hii");
    const userId = req.query.userId;
    console.log("Hello");
    console.log(userId);

  if (!userId) {
    return res.status(400).json({ error: "Missing userId in query." });
  }

  try {
    const summaries = await Summary.find({ user: userId }).sort({ createdAt: -1 });
    res.json(summaries);
  } catch (err) {
      console.error("Error fetching summaries:", err);
      console.log(usedId);
    res.status(500).json({ error: "Failed to fetch summaries." });
  }
};

export const deleteSummary = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Summary.findByIdAndDelete(id);
      res.status(200).json({ message: "Summary deleted successfully." });
    } catch (err) {
      console.error("Error deleting summary:", err);
      res.status(500).json({ error: "Failed to delete summary." });
    }
  };
  
