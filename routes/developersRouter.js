const Router = require("express")
const developersRouter = Router();
const developersController = require("../controllers/developersController")

developersRouter.get("/", developersController.getAll);
developersRouter.get("/add", developersController.getAddPage);
developersRouter.post("/add", developersController.add);
developersRouter.get("/details/:name", developersController.getDeveloper);
developersRouter.get("/delete/:name", developersController.deleteDeveloper);

module.exports = developersRouter;