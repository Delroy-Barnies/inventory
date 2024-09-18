const { exec } = require('child_process');

// Run database seeding
exec('node db/populatedb.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error seeding database: ${error}`);
        return;
    }
    console.log('Database seeded successfully');

    // Start the application
    exec('node app.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting app: ${error}`);
            return;
        }
        console.log('Application started');
    });
});