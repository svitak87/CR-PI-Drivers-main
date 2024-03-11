const { Router } = require("express");
const router = Router();
const forgotPassword = require('../../controllers/UsersControllers/forgotPassword');


router.put("/recover", async (req, res) => {
  const { answerOne, answerTwo, email, password } = req.body;
  try {
    await forgotPassword({ answerOne, answerTwo, email, password });
    res.status(201).json({message: "Password succesfully updated"})
  } catch (error) {
    if (error.message === "Incorrect answers") {
      res.status(403).json({ error: error.message });
    } else if(error.message === "Email doesn't exist"){
      res.status(404).json({error: error.message})
    }else if(error.message === "Incomplete data provided"){
      res.status(400).json({error: error.message})
    }
    else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;