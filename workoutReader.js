const fs = require('fs/promises');
const csv = require('csv-parse/sync'); // or whatever CSV library you use

async function readWorkoutFile(filePath = './data/workouts.csv') {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        // process CSV here
        return data;
    } catch (error) {
        console.error('Error reading workout file:', error.message);
        return [];
    }
}

module.exports = { readWorkoutFile };
