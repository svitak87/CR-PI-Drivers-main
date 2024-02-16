const { Router } = require("express");
const router = Router();
const loginUser = require('../../controllers/UsersControllers/loginUser');

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLoggued = await loginUser({ email, password });
    res.status(200).json({message: "Successful access"});
  } catch (error) {
    if (
      error.message === "Password doesn't match" ||
      error.message === "Email doesn't match"
    ) {
      res.status(403).json(error.message);
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;