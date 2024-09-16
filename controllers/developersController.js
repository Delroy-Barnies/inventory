const db = require("../db/queries");

exports.getAll = async (req, res) => {
    const records = await db.getAll("developers");
    res.render("records", { heading: "developers", records: records });
}

exports.getAddPage = async (req, res) => {
    res.render('add', { heading: "Developer", route: "/developers" });
}

exports.add = async (req, res) => {
    await db.postDeveloper(req.body);
    res.redirect("/");
}

exports.getDeveloper = async (req, res) => {
    const developers = await db.getDevelopers(req.params.name);
    res.render('categories', { name: req.params.name, categories: developers });
}