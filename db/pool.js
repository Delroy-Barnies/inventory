const { Pool } = require('pg');

module.exports = new Pool({ connectionString: process.env.DATABASE_URL });

/*host: process.env.HOST || "localhost",
    user: process.env.USER || "postgres",
    database: process.env.DB || "inventory",
    password: process.env.PASSWORD || "postgres",
    port: process.env.PORT || 5432*/