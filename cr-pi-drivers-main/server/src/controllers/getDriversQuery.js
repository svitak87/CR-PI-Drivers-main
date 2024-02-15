const { Driver } = require("../db");
const api = require("../../api/db.json");
const { Op } = require("sequelize");


const getDriversQuery = async (query) => {
    try {
        
        const lowercaseQuery = query.toLowerCase();
        const dbDrivers = await Driver.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${lowercaseQuery}%` 
                }
            },
            limit: 15
        });
        const apiDrivers = api.drivers.filter(driver => {
            const fullName = `${driver.name.forename} ${driver.name.surname}`.toLowerCase();
            return fullName.includes(lowercaseQuery);
        }).slice(0, 15); 

        const combinedDrivers = [...dbDrivers, ...apiDrivers];


        if (combinedDrivers.length === 0) {
            throw new Error("There are no drivers with that query");
        }

        return combinedDrivers;
    } catch (error) {
        throw error;
    }
}

module.exports = getDriversQuery;
