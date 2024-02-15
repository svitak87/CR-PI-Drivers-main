const express = require("express");
const router = express.Router();
const getDriverDetail = require("../controllers/getDriverDetail");

router.get("/drivers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const driverDetail = await getDriverDetail(id);
    res.status(200).json(driverDetail);
  } catch (error) {
    res.status(404).json({ error: "There's no a driver with that ID" });
  }
});

module.exports = router;
