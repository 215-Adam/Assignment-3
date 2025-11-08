const fs = require('fs/promises');

async function readHealthFile(filePath = './data/health-metrics.json') {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const json = JSON.parse(data);
        console.log(`Total health entries: ${json.metrics.length}`);
        return json;
    } catch (error) {
        console.error('Error reading health file:', error.message);
        // Return an empty array when file not found or JSON invalid
        return [];
    }
}

module.exports = { readHealthFile };

