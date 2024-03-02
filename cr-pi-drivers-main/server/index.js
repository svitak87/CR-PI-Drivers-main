const axios = require("axios");
const os = require('os')
const server = require("./src/server");
const { sequelize } = require("../server/src/db");
const PORT = 3001;


const main = async () => {
  try {
    await sequelize.sync({ force: false });
    server.listen(PORT, () => {
      console.log(`Running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
