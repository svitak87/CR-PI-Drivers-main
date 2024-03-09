const { Driver, Team } = require("../db");
const api = require("../../api/db.json");
const { Op } = require("sequelize");


const getDriversQuery = async (query) => {
  const drivers = [];
  try {

  const lowercaseQuery = query.toLowerCase();
  const driversDb = await Driver.findAll({
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
    include: [
      {
        model: Team,
        attributes: ['name'], 
        through: { attributes: [] }
      }
    ],
  });
  const transformedDriversDb = driversDb.map(driver => ({
    id: driver.id,
    name: driver.name,
    lastname: driver.lastname,
    image: driver.image,
    dob: driver.dob,
    nationality: driver.nationality,
    teams: driver.Teams.map(team => ({ name: team.name }))
  }));

  drivers.push(...transformedDriversDb);

  const driversApi = api.drivers
    .filter((driver) => {
      const fullName =
        `${driver.name.forename} ${driver.name.surname}`.toLowerCase();
      return fullName.includes(lowercaseQuery);
    })

    driversApi.forEach(driverApi => {
      const teams = driverApi.teams ? driverApi.teams.split(", ").map((team) => ({ name: team.trim() })) : [];
      const driver = {
        id: driverApi.id,
        name: driverApi.name.forename,
        lastname: driverApi.name.surname,
        image: driverApi.image.url,
        dob: driverApi.dob,
        nationality: driverApi.nationality,
        teams: teams,
      };
      drivers.push(driver);
    });


    if(drivers.length === 0){
      throw new Error("There are no drivers with that query")
    }else{
      return drivers.slice(0, 15);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = getDriversQuery;
