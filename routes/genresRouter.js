const Router = require("express")
const genresRouter = Router();
const genresController = require("../controllers/genresController")

genresRouter.get("/", genresController.getAll);
genresRouter.get("/add", genresController.getAddPage);
genresRouter.post("/add", genresController.add);
genresRouter.get("/details/:name", genresController.getGenre);
genresRouter.get("/delete/:name", genresController.deleteGenre);

module.exports = genresRouter;