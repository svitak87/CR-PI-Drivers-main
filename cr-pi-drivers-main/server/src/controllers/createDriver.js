const { Driver, Team } = require("../db");
const path = require("path");

const createDriver = async (driverData) => {
  const { name, lastname, description, image, nationality, dob, TeamName } = driverData;

  try {
    if (!name || !lastname || !description || !nationality || !dob || !TeamName) {
      throw new Error("Incomplete data");
    } else {
      if (!image) {
        driverData.image = path.join(__dirname, "../assets/defaultImage.png");
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
