// Imports
const { Router } = require("express");
const menuController = require("../controllers/menuController");

const menuRouter = Router();

// The get /search has be defined before the get /:id route to avoid conflicts
menuRouter.get("/", menuController.getAll);
menuRouter.get("/search", menuController.getByNameOrDesc);
menuRouter.get("/:id", menuController.getOne);
menuRouter.post("/", menuController.create);
menuRouter.put("/:id", menuController.update);
menuRouter.delete("/:id", menuController.remove);

module.exports = menuRouter;