const { Driver, Team } = require("../db");

const createDriver = async (driverData) => {
  const { name, lastName, description, image, nationality, dob, TeamName } = driverData;

  try {
    if (!name || !lastName || !description || !nationality || !dob || !TeamName) {
      throw new Error("Incomplete data");
    } else {
      if (!image) {
        driverData.image = "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg";
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
