const axios = require("axios");
const server = require("./src/server");
// const { conn } = require("./src/db.js");
const { sequelize } = require("../server/src/db");
const PORT = 3001;

// conn
//   .sync({ force: false })
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   })
//   .catch((error) => console.error(error));

const main = async () => {
  try {
    await sequelize.sync({ force: false });
    // await userdatabase.sync({force: false})
    server.listen(PORT, () => {
      console.log(`Running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
