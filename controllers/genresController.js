const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 20 characters";

const validateGenre = [
    body("name").trim()
        .isLength({ min: 1, max: 20 }).withMessage(`name ${lengthErr}`),
]

exports.getAll = async (req, res) => {
    const records = await db.getAll("genres");
    res.render("records", { heading: "genres", records: records });
}

exports.getAddPage = async (req, res) => {
    res.render('add', { heading: "Genre", route: "/genres" });
}

exports.add = [validateGenre, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('add', { heading: "Genre", route: "/genres", errors: errors.array() })
    }
    await db.postGenre(req.body);
    res.redirect("/");
}]

exports.getGenre = async (req, res) => {
    const genres = await db.getGenres(req.params.name);
    res.render('categories', { name: req.params.name, categories: genres });
}

exports.deleteGenre = async (req, res) => {
    await db.deleteGenre(req.params.name);
    res.redirect('/');
}