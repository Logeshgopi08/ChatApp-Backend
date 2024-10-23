const validator = require("validator");
 
const validateSignUpData = (req)=>{
    const {fullName,emailId,password,confirmpassword} = req.body;
    if(!fullName || !emailId || !password || !confirmpassword){
        throw new Error("Enter the Credentials Properly");
    } else if( !validator.isEmail(emailId)){
        throw new Error("Invalid Email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("Enter Strong Password");
    }
    else if(password !== confirmpassword){
        throw new Error ("Password and ConfirmPassword should be Same");
    }

}


module.exports = {validateSignUpData}