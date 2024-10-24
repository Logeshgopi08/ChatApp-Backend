
const express =  require("express");
const messageRouter = express.Router();
const {UserAuth} = require("../middlewares/UserAuth");
const {SendMessage,getMessage} = require("../controller/messageController");


messageRouter.post("/send/:id",UserAuth,SendMessage);

messageRouter.get("/:id",UserAuth,getMessage)


module.exports = messageRouter;