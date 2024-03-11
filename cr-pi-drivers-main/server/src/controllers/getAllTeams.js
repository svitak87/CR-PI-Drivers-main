const { Team } = require("../db");
const axios = require("axios");

const getAllTeams = async () => {
  try {
    const teamsCount = await Team.count();

    if (teamsCount === 0) {
      const response = await axios.get(`http://localhost:5000/drivers`);
      const drivers = await response.data;

      for (const driver of drivers) {
        const teams = driver.teams ? driver.teams.split(", ") : [];

        for (const teamName of teams) {
          const name = teamName.trim();

          const existingTeam = await Team.findOne({ where: { name } });

          if (!existingTeam) {
            await Team.create({ name });
          }
        }
      }
    }
    const teams = await Team.findAll({ order: [["name", "ASC"]] });

    return teams;
  } catch (error) {
    throw error;
  }
};

module.exports = getAllTeams;
