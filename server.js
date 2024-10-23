const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./src/routes/authRouter");
const cookieparser = require("cookie-parser");
const connectDb = require("./src/database/database");


const app = express();

app.use(express.json());
app.use(cookieparser());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/chatapp",authRouter);

connectDb().then(()=>{
    console.log("Database is Connected");
    app.listen(PORT,()=>{
        console.log(`Server is Running in Port ${PORT}`);
        
    });
    
}).catch((err)=>{
    console.log("Database Not Connected");
    
    console.log(err);
    
})
