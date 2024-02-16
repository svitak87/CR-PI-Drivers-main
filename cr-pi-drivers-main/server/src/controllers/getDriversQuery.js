const { Driver } = require("../db");
const api = require("../../api/db.json");
const { Op } = require("sequelize");

const getDriversQuery = async (query) => {
  try {
    const lowercaseQuery = query.toLowerCase();

    const apiDrivers = api.drivers
      .filter((driver) => {
        const fullName =
          `${driver.name.forename} ${driver.name.surname}`.toLowerCase();
        return fullName.includes(lowercaseQuery);
      })
      .slice(0, 15);

    const dbDrivers = await Driver.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${lowercaseQuery}%`,
            },
          },
          {
            lastname: {
              [Op.iLike]: `%${lowercaseQuery}%`,
            },
          },
        ],
      },
      limit: 15,
    });

    const combinedDrivers = [...apiDrivers, ...dbDrivers];

    if (combinedDrivers.length === 0) {
      throw new Error("There are no drivers with that query");
    }

    return combinedDrivers;
  } catch (error) {
    throw error;
  }
};

module.exports = getDriversQuery;
