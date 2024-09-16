const { Pool } = require('pg');

module.exports = new Pool({
    host: process.env.HOST || "localhost",
    user: process.env.USER || "postgres",
    database: process.env.DB || "inventory",
    password: process.env.PASSWORD || "postgres",
    port: process.env.PORT || 5432
});