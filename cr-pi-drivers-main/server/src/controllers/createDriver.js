const { Driver, Team } = require("../db");

const createDriver = async (driverData) => {
  const { name, lastname, description, image, nationality, dob, TeamName } = driverData;

  try {
    if (!name || !lastname || !description || !nationality || !dob || !TeamName) {
      throw new Error("Incomplete data");
    } else {
      // Verifica si no hay imagen o si la imagen no es una URL completa
      if (!image || !image.startsWith("http")) {
        // Si no hay imagen o si no es una URL completa, utiliza la URL completa del servidor Express
        driverData.image = "http://localhost:3001/assets/DefaultDriver.png";
      }

      const driverCreated = await Driver.create(driverData);

      let team = await Team.findOne({ where: { name: TeamName } });
      if (!team) {
        team = await Team.create({ name: TeamName });
      }
      await driverCreated.addTeam(team); 

      return driverCreated;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = createDriver;

