require("dotenv").config();
const { Sequelize } = require("sequelize");
// const UserModel = require('../src/models/User');


const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;


// const { DB_USER, DB_PASSWORD, DB_HOST, USER, PASSWORD, HOST, PORT_DB, BDD } = process.env;

// const userdatabase = new Sequelize( // users database
//   `postgres://${USER}:${PASSWORD}@${HOST}:${PORT_DB}/${BDD}`,
//   { logging: false }
// );

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`, {
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Driver, Team, User } = sequelize.models;

Driver.belongsToMany(Team, {through: "driver_team"});
Team.belongsToMany(Driver, {through: "driver_team"});

// UserModel(userdatabase); //userdatabase
// const {User} = userdatabase.models //userdatabase

// module.exports = {
//   ...sequelize.models, 
//   conn: sequelize,
// };

module.exports =  {sequelize,
...sequelize.models} 