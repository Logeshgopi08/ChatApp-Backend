
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new  mongoose.Schema (
    {
        fullName:{
            type:String,
            required:true,
            minLength:3,
            maxLength:15,
        },
        
            emailId:{
                type:String,
                required:true,
                unique:true,
                trim:true,
                lowercase:true

            },
            phoneNumber:{
                type:Number,
                minLength:10,
                maxLength:10,
                required:true
            },
            password:{
                type:String,
                required:true,
                
            },
            profilePhoto:{
                type:String,
                default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvDtoEwuV9E2kHqNDi6MnBzXlefn8TfyrwgQ&s"
            }
        
    },
    {timestamps:true}
);

userSchema.methods.createJWTtoken = async function(){
    const user = this;

    const token = await jwt.sign({_id:user._id},"ChatApp@2310");
    return token;
}

userSchema.methods.validPassword = async function (password) {
    const user = this;
    const passwordhash = user.password;
    const isValidPassword = await bcrypt.compare(password,passwordhash);
    return isValidPassword;
}

module.exports = mongoose.model("User",userSchema);