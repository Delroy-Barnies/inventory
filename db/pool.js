const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

module.exports = new Pool({ connectionString: connectionString });

/*host: process.env.HOST || "localhost",
    user: process.env.USER || "postgres",
    database: process.env.DB || "inventory",
    password: process.env.PASSWORD || "postgres",
    port: process.env.PORT || 5432*/