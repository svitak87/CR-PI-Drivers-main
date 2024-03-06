const express = require("express");
const router = express.Router();
const getAllDrivers = require("../controllers/getAllDrivers");

router.get("/drivers", async (req, res) => {
  try {
    const allDrivers = await getAllDrivers();

    res.status(200).json(allDrivers);
  } catch (error) {
    if (error.message === "There are no drivers") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;
