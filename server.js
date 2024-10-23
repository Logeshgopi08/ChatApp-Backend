const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/working",(req,res)=>{
   res.send("Api is Working");
    
});


app.listen(5000,()=>{
    console.log(`Server is Running in Port ${PORT}`);
    
});