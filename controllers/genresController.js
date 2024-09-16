const db = require("../db/queries");

exports.getAll = async (req, res) => {
    const records = await db.getAll("genres");
    res.render("records", { heading: "genres", records: records });
}

exports.getAddPage = async (req, res) => {
    res.render('add', { heading: "Genre", route: "/genres" });
}

exports.add = async (req, res) => {
    await db.postGenre(req.body);
    res.redirect("/");
}

exports.getGenre = async (req, res) => {
    const genres = await db.getGenres(req.params.name);
    res.render('categories', { name: req.params.name, categories: genres });
}