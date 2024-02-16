const { Driver, Team } = require("../db");
const api = require("../../api/db.json");

const getDriverDetail = async (id) => {
  try {
    const stringId = String(id);

    const driverApiFound = api.drivers.find((driver) => String(driver.id) === stringId);

    if (driverApiFound) {
      return {
        id: driverApiFound.id,
        name: `${driverApiFound.name.forename} ${driverApiFound.name.surname}`,
        nationality: driverApiFound.nationality,
        image: driverApiFound.image.url,
        description: driverApiFound.description,
        dob: driverApiFound.dob,
        teams: driverApiFound.teams,
      };
    }
    const driverFound = await Driver.findByPk(stringId, {
      include: {
        model: Team,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (driverFound) {
      return driverFound;
    }
  } catch (error) {
    throw new Error("There's no a driver with that ID")
  }
};

module.exports = getDriverDetail;
