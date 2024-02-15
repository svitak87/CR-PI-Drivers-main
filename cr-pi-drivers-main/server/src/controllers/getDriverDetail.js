const { Driver, Team } = require("../db");
const api = require("../../api/db.json");

const getDriverDetail = async (id) => {
  try {
    
    const driverId = parseInt(id, 10);
    const driverApiFound = api.drivers.find((driver) => driver.id === driverId);

    if (driverApiFound) {
      const {
        id,
        name: { forename, surname },
        nationality,
        image: { url },
        description,
        dob,
        teams,
      } = driverApiFound;
      const filteredDriver = {
        id,
        name: `${forename} ${surname}`,
        nationality,
        image: url,
        description,
        dob,
        teams,
      };

      return filteredDriver;
    }
    const driverFound = await Driver.findByPk(id, {
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
    throw error;
  }
};

module.exports = getDriverDetail;
