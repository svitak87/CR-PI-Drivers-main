const { Driver, Team } = require("../db");
const api = require("../../api/db.json");

const getDriverDetail = async (id) => {
  try {

    const driverApiFound = api.drivers.find(
      (driver) => String(driver.id) === id
    );

    if (driverApiFound) {
      const teams = driverApiFound.teams
        ? driverApiFound.teams
            .split(", ")
            .map((team) => ({ name: team.trim() }))
        : [];
      const driverApi = {
        id: driverApiFound.id,
        name: driverApiFound.name.forename,
        lastname: driverApiFound.name.surname,
        description: driverApiFound.description,
        image: driverApiFound.image.url,
        dob: driverApiFound.dob,
        nationality: driverApiFound.nationality,
        teams: teams,
      };
      return driverApi;
    }
    const driverDbFound = await Driver.findByPk(id, {
      include: {
        model: Team,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (driverDbFound) {
      const teams = driverDbFound.Teams.map((team) => ({ name: team.name }));
      const driverDb = {
        id: driverDbFound.id,
        name: driverDbFound.name,
        lastname: driverDbFound.lastname,
        description: driverDbFound.description,
        image: driverDbFound.image,
        dob: driverDbFound.dob,
        nationality: driverDbFound.nationality,
        teams: teams,
      };
      return driverDb;
    }
  } catch (error) {
    throw new Error("There's no a driver with that ID");
  }
};

module.exports = getDriverDetail;
