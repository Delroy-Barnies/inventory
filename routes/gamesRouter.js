const Router = require("express")
const gamesRouter = Router();
const gamesController = require("../controllers/gamesController")

gamesRouter.get("/", gamesController.getAll);
gamesRouter.get("/add", gamesController.getAddPage);
gamesRouter.post("/add", gamesController.add);
gamesRouter.get("/details/:name", gamesController.getGame);

module.exports = gamesRouter;