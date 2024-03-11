const { Driver, Team } = require("../db");

const createDriver = async (driverData) => {
  let { name, lastname, description, image, nationality, dob, TeamName } = driverData;

  try {
    if (!name || !lastname || !description || !nationality || !dob || !TeamName) {
      throw new Error("Incomplete data");
    } else {
      if (!image) {
        driverData.image = "http://localhost:3001/assets/DefaultDriver.png";
      }
      
      name = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1)
      lastname = lastname.charAt(0).toUpperCase() + lastname.toLowerCase().slice(1)
      nationality = nationality.charAt(0).toUpperCase() + nationality.toLowerCase().slice(1)

      driverData.name = name;
      driverData.lastname = lastname;
      driverData.nationality = nationality;

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



