// Load environment variables
require('dotenv').config();
const { readHealthFile } = require('./healthReader');
const { readSalesData, totalMinutes } = require('./workoutReader');

async function main() {
    try {
        const userName = process.env.USER_NAME;
        const weeklyGoal = Number(process.env.WEEKLY_GOAL);

        console.log(`\n Hello, ${userName}! Let's check your weekly fitness progress.\n`);

        // Read and display workout data
        const workouts = await readSalesData('./data/workouts.csv');
        const totalWorkoutMinutes = await totalMinutes('./data/workouts.csv');
        console.log(` You have ${workouts.length} workout records.`);
        console.log(`Total workout minutes: ${totalWorkoutMinutes}`);

        // Read and display health data
        console.log(`\n Checking your health metrics data...`);
        await readHealthFile(); // This function already logs its summary

        // Check if weekly goal is met
        console.log('\n Weekly Goal Progress:');
        if (totalWorkoutMinutes >= weeklyGoal) {
            console.log(` Congratulations ${userName}! You've met your weekly goal of ${weeklyGoal} minutes!`);
        } else {
            const remaining = weeklyGoal - totalWorkoutMinutes;
            console.log(`Keep going ${userName}! You need ${remaining} more minutes to reach your goal of ${weeklyGoal}.`);
        }

    } catch (error) {
        console.error('\n An error occurred while processing your data:');
        console.error(error.message);
    }
}

main();
