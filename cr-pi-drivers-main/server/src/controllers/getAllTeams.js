const { Team } = require("../db");
const api = require("../../api/db.json");

const getAllTeams = async () => {
  try {
    const teamsCount = await Team.count();

    if (teamsCount === 0) {
      for (const driver of api.drivers) {
        if (driver.teams !== undefined) {
          const teams = driver.teams.split(",");

          for (const teamName of teams) {
            const name = teamName.trim();

            const existingTeam = await Team.findOne({ where: { name } });
            if (!existingTeam) {
              await Team.create({ name });
            }
          }
        }
      }
    }
    const teams = await Team.findAll();
    return teams;
  } catch (error) {
    throw error;
  }
};

module.exports = getAllTeams;


