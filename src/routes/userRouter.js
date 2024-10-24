
const express = require ("express");
const userRouter = express.Router();
const {UserAuth} = require("../middlewares/UserAuth");
const {getAllUsers} = require("../controller/userController");

userRouter.get("/user",UserAuth,getAllUsers);


module.exports = userRouter;