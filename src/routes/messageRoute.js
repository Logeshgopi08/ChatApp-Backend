
const express =  require("express");
const messageRouter = express.Router();
const {UserAuth} = require("../middlewares/UserAuth");
const {SendMessage} = require("../controller/messageController");


messageRouter.post("/send/:id",UserAuth,SendMessage);


module.exports = messageRouter;