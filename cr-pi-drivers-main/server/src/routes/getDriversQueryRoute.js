const express = require("express");
const router = express.Router();
const getDriversQuery = require('../controllers/getDriversQuery')

router.get("/drivers/name", async (req, res) => {
  const { name } = req.query;
  try {
    const driverFound = await getDriversQuery(name);
    res.status(200).json(driverFound);
  } catch (error) {
    if (error.message === "There are no drivers with that query") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});


module.exports = router;