const { Driver, Team } = require("../db");

const getAllDrivers = async () => {
  try {
    const allDrivers = await Driver.findAll({
      attributes: ['image', 'name', 'lastname'], 
      include: [
        {
          model: Team,
          attributes: ['name'], 
          through: { attributes: [] } 
        }
      ]
    })
    if(allDrivers.length !== 0){
      return allDrivers;
    }else{
      throw new Error("There are no drivers");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = getAllDrivers;
