const { Driver } = require("../db");
const api = require("../../api/db.json");
const { Op } = require("sequelize");

const searchInApi = (query) => {
  const lowercaseQuery = query.toLowerCase();
  const queryApi = api.drivers
    .filter((driver) => {
      const fullName =
        `${driver.name.forename} ${driver.name.surname}`.toLowerCase();
      return fullName.includes(lowercaseQuery);
    })
    .slice(0, 15);
  return queryApi;
};

const searchInDatabase = async (query) => {
  const lowercaseQuery = query.toLowerCase();
  const queryDb = await Driver.findAll({
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
  return queryDb;
};

module.exports = {
  searchInApi,
  searchInDatabase,
};
