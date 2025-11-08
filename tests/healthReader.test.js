const { readHealthFile } = require('../healthReader');
const fs = require('fs/promises');

describe('Health Reader Tests', () => {
    const validPath = './data/health-metrics.json';
    const invalidPath = './data/missing.json';

    test('Reads valid JSON and returns correct structure', async () => {
        const data = await readHealthFile(validPath);
        expect(data).toBeDefined();
        expect(Array.isArray(data) || typeof data === 'object').toBe(true);
    });

    test('Handles missing JSON file properly', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});

        // Manually simulate file not found
        await expect(readHealthFile(invalidPath)).resolves.toEqual([]);

        console.error.mockRestore();
    });

    test('Handles invalid JSON format', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        
        // Create a temporary invalid JSON file
        await fs.writeFile('./data/bad.json', '{ invalid json', 'utf8');

        const result = await readHealthFile('./data/bad.json');
        expect(result).toEqual([]);

        // Cleanup
        await fs.unlink('./data/bad.json');
        console.error.mockRestore();
    });
});
