const express = require("express");
const router = express.Router();

//Drivers routes:
const getDriverDetailRoute = require('./getDriverDetailRoute');
const getAllDriversRoute = require('./getAllDriversRoute');
const getAllTeamsRoute = require('../routes/getAllTeamsRoute');
const createDriverRoute = require('../routes/createDriverRoute');
const getDriversQuery = require('../routes/getDriversQueryRoute');

router.use(getAllDriversRoute);
router.use(getAllTeamsRoute);
router.use(createDriverRoute);
router.use(getDriverDetailRoute);
router.use('/query', getDriversQuery);

module.exports = router;
