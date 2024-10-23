const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../validation/validation");

authRouter.post("/signup",async(req,res)=>{
   
    
   try {
    validateSignUpData(req);
    if(!validateSignUpData){
        throw new Error("Validation Failed")
    }
    const {fullName} = req.body;
    res.send(fullName);
    
   } catch (error) {
      return res.status(400).send(error.message);
   }
});

module.exports = authRouter;
