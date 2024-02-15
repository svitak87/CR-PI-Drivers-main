const { Team } = require("../db");
const api = require("../../api/db.json");

const getAllTeams = async () => {
  try {
    const drivers = api.drivers;
    const teamsArray = [];

    for (const driver of drivers) {
      if (driver.teams !== undefined) {
        const teams = driver.teams.split(",");

        for (const teamName of teams) {
          const name = teamName.trim();

          const existingTeam = await Team.findOne({ where: { name } });

          if (!existingTeam) {
            const newTeam = await Team.create({ name });
            teamsArray.push(newTeam);
          }
        }
      }
    }

    return teamsArray;
  } catch (error) {
    throw error;
  }
};

module.exports = getAllTeams;
