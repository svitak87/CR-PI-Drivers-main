const { Driver, Team } = require("../db");


const createDriver = async (driverData) => {
  const { name, lastname, description, image, nationality, dob, TeamName } = driverData;

  try {
    if (!name || !lastname || !description || !nationality || !dob || !TeamName) {
      throw new Error("Incomplete data");
    } else {
      if (!image || !image.startsWith("http")) {
        driverData.image = "http://localhost:3001/assets/DefaultDriver.png";
      }
      const driverCreated = await Driver.create(driverData);

      const teams = await Team.findAll({ where: { name: TeamName } });

      await driverCreated.addTeams(teams);

      return driverCreated;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = createDriver;

