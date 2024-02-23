const express = require("express");
const router = express.Router();
const {
  searchInApi,
  searchInDatabase,
} = require("../controllers/getDriversQuery");

router.get("/api/name", async (req, res) => {
  const { name } = req.query;
  try {
    const results = await searchInApi(name);
    res.status(200).json(results);
  } catch (error) {
    if (error.message === "There are no drivers with that query") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.get("/database/name", async (req, res) => {
  const { name } = req.query;
  try {
    const results = await searchInDatabase(name);
    res.status(200).json(results);
  } catch (error) {
    if (error.message === "There are no drivers with that query") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
