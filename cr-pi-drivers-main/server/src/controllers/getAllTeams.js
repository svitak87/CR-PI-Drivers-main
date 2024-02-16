const { Team } = require("../db");
const api = require("../../api/db.json");

const getAllTeams = async () => {
  try {
    // Verificar si la tabla de equipos está vacía en la base de datos
    const teamsCount = await Team.count();

    if (teamsCount === 0) {
      // La tabla de equipos está vacía, así que guardamos todos los equipos de la API local en la base de datos
      for (const driver of api.drivers) {
        if (driver.teams !== undefined) {
          const teams = driver.teams.split(",");

          for (const teamName of teams) {
            const name = teamName.trim();

            // Verificar si el equipo ya existe en la base de datos
            const existingTeam = await Team.findOne({ where: { name } });

            // Si el equipo no existe, créalo y agrégalo a la base de datos
            if (!existingTeam) {
              await Team.create({ name });
            }
          }
        }
      }
    }

    // Después de asegurarnos de que los equipos estén en la base de datos, los recuperamos y los devolvemos
    const teams = await Team.findAll();
    return teams;
  } catch (error) {
    throw error;
  }
};

module.exports = getAllTeams;

40113570 
