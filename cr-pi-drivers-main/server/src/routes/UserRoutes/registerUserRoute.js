const { Router } = require("express");
const router = Router();
const registrateUser = require('../../controllers/UsersControllers/registrateUser');


router.post("/register", async (req, res) => {
  try {
    const { name, lastname, email, password, answerOne, answerTwo } = req.body;
    const registratedUser = await registrateUser({ name, lastname, email, password, answerOne, answerTwo });
    res.status(201).json(registratedUser);
  } catch (error) {
    if (error.message === "User already exists") {
      res.status(409).json({ error: error.message });
    } else if (error.message === "Incomplete data") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;