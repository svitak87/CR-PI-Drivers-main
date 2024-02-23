const express = require("express");
const router = express.Router();
const createDriver = require('../controllers/createDriver');

router.post("/drivers", async (req, res) => {
  const { name, lastname, description, image, nationality, dob, TeamName} =
    req.body;

  try {
    const createdDriver = await createDriver({
      name,
      lastname,
      description,
      image,
      nationality,
      dob,
      TeamName,
    });
    res.status(200).json(createdDriver);
  } catch (error) {
    if (error.message === "Incomplete data") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
module.exports = router;

