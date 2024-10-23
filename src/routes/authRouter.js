const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../validation/validation");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

authRouter.post("/signup",async(req,res)=>{
   
    
   try {
    validateSignUpData(req);
   
    const {fullName,emailId,password,phoneNumber} = req.body;

     const HashPassword = await bcrypt.hash(password,10);

     const user = await User({
        fullName,
        emailId,
        password:HashPassword,
        phoneNumber
     });
      
     const token = await user.createJWTtoken();
     if(!token){
        throw new Error("Token Not Created");
     }
     res.cookie("token",token,);

     await user.save();
     res.send(user);
    
    
   } catch (error) {
      return res.status(400).send(error.message);
   }
});

authRouter.post("/login",async(req,res)=>{
    const {emailId,password} = req.body;
    try {
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("User Not Found");
        }
        const isPassWordValid =await user.validPassword(password);
       
        
        if(isPassWordValid){
            const token = await user.createJWTtoken();
            res.cookie("token",token);
            res.send("Login Sucessfully !!");
        } else{
            throw new Error("Password is Wrong");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
});

authRouter.post("/logout",async(req,res)=>{
    res.clearCookie("token");
    res.send("LogOut Succesfully");
});

module.exports = authRouter;
