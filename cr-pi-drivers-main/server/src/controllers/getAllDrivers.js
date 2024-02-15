const { Driver, Team } = require("../db");

const getAllDrivers = async () => {
  try {
    const allDrivers = await Driver.findAll({
      attributes: ['image', 'name', 'lastName'], 
      include: [
        {
          model: Team,
          attributes: ['name'], 
          through: { attributes: [] } 
        }
      ]
    });

    return allDrivers;
  } catch (error) {
    throw error;
  }
}

module.exports = getAllDrivers;
