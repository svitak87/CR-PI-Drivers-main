const express = require("express");
const router = express.Router();
const deleteDriver = require("../controllers/deleteDriver");

router.delete("/drivers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const driverToDelete = await deleteDriver(id);
      res.status(200).json(driverToDelete);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
