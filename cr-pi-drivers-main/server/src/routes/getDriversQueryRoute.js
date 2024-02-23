// const express = require("express");
// const router = express.Router();
// const getDriversQuery = require('../controllers/getDriversQuery')

// router.get("/drivers/name", async (req, res) => {
//     try {
//         const { name } = req.query;
//         const driversFound = await getDriversQuery(name);
//         res.status(200).json(driversFound)
//     } catch (error) {
//         if(error.message === "There are no drivers with that query"){
//             res.status(404).json({error: error.message})
//         }else{
//             res.status(500).json({error: "Internal server error"})
//         }
//     }
// });

// module.exports = router;

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
