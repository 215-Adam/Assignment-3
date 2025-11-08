const { readSalesData, totalMinutes } = require('../workoutReader');
const fs = require('fs');

describe('Workout Reader Tests', () => {
    const validPath = './data/workouts.csv';
    const invalidPath = './data/missing.csv';

    test('Reads valid CSV and returns an array of objects', async () => {
        const data = await readSalesData(validPath);
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('date');
        expect(data[0]).toHaveProperty('exercise');
    });

    test('Calculates total workout minutes correctly', async () => {
        const total = await totalMinutes(validPath);
        // You can change this to match your CSV total (should be 330)
        expect(total).toBe(330);
    });

    test('Handles missing CSV file properly', async () => {
        // Temporarily silence console.error
        jest.spyOn(console, 'error').mockImplementation(() => {});
        
        await expect(readSalesData(invalidPath)).rejects.toThrow();
        
        console.error.mockRestore();
    });
});
