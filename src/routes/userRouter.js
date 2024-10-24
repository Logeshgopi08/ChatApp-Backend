
const express = require ("express");
const userRouter = express.Router();
const {UserAuth} = require("../middlewares/UserAuth");
const {getUserData} = require("../controller/userController");

userRouter.get("/user",UserAuth,getUserData);


module.exports = userRouter;