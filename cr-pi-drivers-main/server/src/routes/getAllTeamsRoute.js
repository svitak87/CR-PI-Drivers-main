const express = require("express");
const router = express.Router();
const getAllTeams = require('../controllers/getAllTeams'); 

router.get("/teams", async (req, res) => {
  try {
    const allTeams = await getAllTeams(); 
    res.status(200).json(allTeams);
  } catch (error) {
    console.error("Error getting teams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
