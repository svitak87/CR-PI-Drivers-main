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

//Users routes:

const registerUserRoute = require('../routes/UserRoutes/registerUserRoute');
const usersLoginRoute = require('../routes/UserRoutes/loginUserRoute');
const forgotPasswordRoute = require('../routes/UserRoutes/forgotPasswordRoute');

router.use("/users", registerUserRoute);
router.use("/users", usersLoginRoute);
router.use("/users", forgotPasswordRoute);

module.exports = router;
