const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 20 characters.";

const validateDeveloper = [
    body("name").trim()
        .isLength({ min: 1, max: 20 }).withMessage(`name ${lengthErr}`),
];

exports.getAll = async (req, res) => {
    const records = await db.getAll("developers");
    res.render("records", { heading: "developers", records: records });
}

exports.getAddPage = async (req, res) => {
    res.render('add', { heading: "Developer", route: "/developers" });
}

exports.add = [validateDeveloper, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("add", {
            heading: "Developer",
            errors: errors.array(),
            route: "/developers"
        });
    }
    await db.postDeveloper(req.body);
    res.redirect("/");
}]

exports.getDeveloper = async (req, res) => {
    const developers = await db.getDevelopers(req.params.name);
    res.render('categories', { name: req.params.name, categories: developers });
}

exports.deleteDeveloper = async (req, res) => {
    await db.deleteDeveloper(req.params.name);
    res.redirect('/');
}