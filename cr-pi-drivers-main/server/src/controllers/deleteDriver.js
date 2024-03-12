const { Driver } = require("../db");

const deleteDriver = async (id) => {
  try {
    const driverDbFound = await Driver.findByPk(id);

    if (driverDbFound) {
     await driverDbFound.destroy(); 
      return driverDbFound.id ;
    } else {
      return "Driver not found"; 
    }
  } catch (error) {
    throw error;
  }
};

module.exports = deleteDriver;
