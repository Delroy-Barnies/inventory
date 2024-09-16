const db = require("../db/queries");

exports.getAll = async (req, res) => {
    const records = await db.getAll("games");
    res.render("records", { heading: "games", records: records });
}

exports.getAddPage = async (req, res) => {
    res.render('add', { heading: "Game", route: "/games", game: true });
}

exports.add = async (req, res) => {
    await db.postGame(req.body);
    res.redirect("/");
}

exports.getGame = async (req, res) => {
    const genres = await db.getGenresFromGameName(req.params.name);
    const developers = await db.getDevelopersFromGameName(req.params.name);
    res.render('game', { name: req.params.name, genres: genres, developers: developers });
}