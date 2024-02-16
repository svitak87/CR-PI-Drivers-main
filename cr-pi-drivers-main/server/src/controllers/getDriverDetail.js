const { Driver, Team } = require("../db");
const api = require("../../api/db.json");

const getDriverDetail = async (id) => {
  try {
    const stringId = String(id);

    const driverApiFound = api.drivers.find((driver) => String(driver.id) === stringId);

    if (driverApiFound) {
      return {
        id: driverApiFound.id,
        name: `${driverApiFound.name.forename} ${driverApiFound.name.surname}`,
        nationality: driverApiFound.nationality,
        image: driverApiFound.image.url,
        description: driverApiFound.description,
        dob: driverApiFound.dob,
        teams: driverApiFound.teams,
      };
    }
    const driverFound = await Driver.findByPk(stringId, {
      include: {
        model: Team,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (driverFound) {
      return driverFound;
    }
  } catch (error) {
    throw new Error("There's no a driver with that ID")
  }
};

module.exports = getDriverDetail;


// {
//   "drivers": [
//     {
//       "id": 1,
//       "driverRef": "hamilton",
//       "number": 44,
//       "code": "HAM",
//       "name": { "forename": "Lewis", "surname": "Hamilton" },
//       "image": {
//         "url": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg",
//         "imageby": "By Morio - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=52060566"
//       },
//       "dob": "1985-01-07",
//       "nationality": "British",
//       "url": "http://en.wikipedia.org/wiki/Lewis_Hamilton",
//       "teams": "McLaren, Mercedes",
//       "description": "Sir Lewis Carl Davidson Hamilton MBE HonFREng (born 7 January 1985) is a British racing driver currently competing in Formula One, driving for Mercedes-AMG Petronas Formula One Team. In Formula One, Hamilton has won a joint-record seven World Drivers' Championship titles (tied with Michael Schumacher), and holds the records for the most wins (103), pole positions (103), and podium finishes (191), among many others. He is statistically considered as the most successful driver in Formula One history."
//     },
//   ]
// }