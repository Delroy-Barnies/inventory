const pool = require("./pool");

async function getAll(table) {
    const { rows } = await pool.query(`SELECT * FROM ${table}`);
    return rows;
}

async function postGame(row) {
    await pool.query(`INSERT INTO games(name) 
                      VALUES($1) 
                      ON CONFLICT (name) DO NOTHING`,
        [row.name]);

    if (row.genre) {
        await pool.query(`INSERT INTO genres(name) 
                          VALUES($1) 
                          ON CONFLICT (name) DO NOTHING`,
            [row.genre]);

        await pool.query(`INSERT INTO game_genres(game_name, genre_name) 
                          VALUES($1, $2)
                          ON CONFLICT (game_name, genre_name) DO NOTHING`,
            [row.name, row.genre]);
    }

    if (row.developer) {
        await pool.query(`INSERT INTO developers(name) 
                          VALUES($1) 
                          ON CONFLICT (name) DO NOTHING`,
            [row.developer]);

        await pool.query(`INSERT INTO game_developers(game_name, developer_name) 
                          VALUES($1, $2) 
                          ON CONFLICT (game_name, developer_name) DO NOTHING`,
            [row.name, row.developer]);

        console.log("added!");
    }
}

async function postGenre(row) {
    await pool.query(`INSERT INTO genres(name) 
                      VALUES($1) 
                      ON CONFLICT (name) DO NOTHING`,
        [row.name]);
}

async function postDeveloper(row) {
    await pool.query(`INSERT INTO developers(name) 
                      VALUES($1) 
                      ON CONFLICT (name) DO NOTHING`,
        [row.name]);
}

async function getGenresFromGameName(name) {
    let { rows } = await pool.query(`SELECT * FROM game_genres WHERE game_name=$1`, [name]);
    return rows;
}

async function getGenres(name) {
    let { rows } = await pool.query(`SELECT * FROM game_genres WHERE genre_name=$1`, [name]);
    return rows;
}

async function getDevelopersFromGameName(name) {
    let { rows } = await pool.query(`SELECT * FROM game_developers WHERE game_name=$1`, [name]);
    return rows;
}

async function getDevelopers(name) {
    let { rows } = await pool.query(`SELECT * FROM game_developers WHERE developer_name=$1`, [name]);
    return rows;
}

module.exports = {
    getAll,
    postGame,
    postGenre,
    postDeveloper,
    getGenresFromGameName,
    getDevelopersFromGameName,
    getGenres,
    getDevelopers
};
