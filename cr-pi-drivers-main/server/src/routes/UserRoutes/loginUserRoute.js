const { Router } = require("express");
const router = Router();
const loginUser = require('../../controllers/UsersControllers/loginUser');

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLoggued = await loginUser({ email, password });
    res.status(200).json({message: "Successful access"});
  } catch (error) {
     if(error.message === "Password doesn't match"){
      res.status(403).json({error: error.message})
     }else if(error.message === "Email doesn't exist"){
      res.status(404).json({error: error.message})
     }else if(error.message === "Email and password are required"){
      res.status(400).json({error: error.message})
     }
  }
});

module.exports = router;