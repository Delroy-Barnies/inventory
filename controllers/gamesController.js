const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 20 characters";

const validateGame = [
    body("name").trim()
        .isLength({ min: 1, max: 20 }).withMessage(`name ${lengthErr}`),
    body("genre").trim()
        .isLength({ min: 1, max: 20 }).withMessage(`genre ${lengthErr}`)
        .optional({ checkFalsy: true }),
    body("developer").trim()
        .isLength({ min: 1, max: 20 }).withMessage(`developer ${lengthErr}`)
        .optional({ checkFalsy: true })
]

exports.getAll = async (req, res) => {
    const records = await db.getAll("games");
    res.render("records", { heading: "games", records: records, game: true });
}

exports.getAddPage = async (req, res) => {
    res.render('add', { heading: "Game", route: "/games", game: true });
}

exports.add = [validateGame, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('add', { heading: "Game", route: "/games", errors: errors.array(), game: true })
    }
    await db.postGame(req.body);
    res.redirect("/");
}]

exports.getGame = async (req, res) => {
    const genres = await db.getGenresFromGameName(req.params.name);
    const developers = await db.getDevelopersFromGameName(req.params.name);
    res.render('game', { name: req.params.name, genres: genres, developers: developers });
}

exports.deleteGame = async (req, res) => {
    await db.deleteGame(req.params.name);
    res.redirect('/');
}