const { Driver, Team } = require("../db");
const axios = require('axios')

const getAllDrivers = async () => {
  try {
    const drivers = [];

    const driversDb = await Driver.findAll({
      attributes: ["id", "image", "name", "lastname", "dob", "nationality"],
      include: [
        {
          model: Team,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    const transformedDriversDb = driversDb.map(driver => ({
      id: driver.id,
      name: driver.name,
      lastname: driver.lastname,
      image: driver.image,
      dob: driver.dob,
      nationality: driver.nationality,
      teams: driver.Teams.map(team => ({ name: team.name }))
    }));
    drivers.push(...transformedDriversDb);

    const response = await axios.get("http://localhost:5000/drivers");
    const apiDrivers = response.data;

    apiDrivers.forEach(apiDriver => {
      const teams = apiDriver.teams ? apiDriver.teams.split(", ").map((team) => ({ name: team.trim() })) : [];
      const driver = {
        id: apiDriver.id,
        name: apiDriver.name.forename,
        lastname: apiDriver.name.surname,
        image: apiDriver.image.url,
        dob: apiDriver.dob,
        nationality: apiDriver.nationality,
        teams: teams,
      };
      drivers.push(driver);
    });

    return drivers;
  } catch (error) {
    throw new Error("There are no drivers");
  }
};

module.exports = getAllDrivers ;

