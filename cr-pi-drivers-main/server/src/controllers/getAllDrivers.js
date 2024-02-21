const { Driver, Team } = require("../db");

const getAllDrivers = async () => {
  try {
    // Realiza la consulta cada vez que se llama la función
    const allDrivers = await Driver.findAll({
      attributes: ['id', 'image', 'name', 'lastname'], 
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

