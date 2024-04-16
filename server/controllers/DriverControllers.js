const { Driver } = require('../src/db');

const createDriverDB = async (forename, surname, description, image, nationality, dob, teamID) => {
    try {
        if (forename && surname) {
            let existingDriver = await Driver.findOne({
                where: { forename }
            });

            if (existingDriver) {
                console.log('Driver already exists:', existingDriver.toJSON());
                return existingDriver;
            }

            const newDriver = await Driver.create({
                forename,
                surname,
                description,
                image,
                nationality, 
                dob
            });

            console.log('New driver created:', newDriver.toJSON());

            console.log('Teams:', teamID);

            await newDriver.addTeams(teamID);

            console.log('Teams associated successfully.');

            return newDriver;
        }
    } catch (error) {
        console.error({ error: error.message });
        throw error; // 
    }
};

module.exports = {
    createDriverDB
};
