
const mongoose = require("mongoose");

connectDb = async()=>{
    await mongoose.connect("mongodb+srv://Logesh:7jb2DunzD5AlVZzt@logesh.jolaj.mongodb.net/chatapp");
}

module.exports = connectDb;