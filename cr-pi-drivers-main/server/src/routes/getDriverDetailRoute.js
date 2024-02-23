const express = require("express");
const router = express.Router();
const getDriverDetail = require("../controllers/getDriverDetail");

router.get("/drivers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const driverDetail = await getDriverDetail(id); 
    if (driverDetail) {
      res.status(200).json(driverDetail);
    }
  } catch (error) {
    if(error.message === "There's no a driver with that ID"){
      res.status(404).json({error: error.message})
    }else{
      res.status(500).json({error: 'Internal server error'})
    }
  }
});

module.exports = router;


