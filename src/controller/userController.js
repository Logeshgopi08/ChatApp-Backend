const User = require("../models/userModel");  

const getAllUsers = async(req,res)=>{
   try {
    const loggedUser = req.user._id;
    const Remainingusers = await User.find({_id:{$ne:loggedUser}}).select("-password");

    res.json({
        message:"Sent Successfully",
        data:Remainingusers
    });
    
   } catch (error) {
     res.status(401).send(error.message);
   }
}


module.exports = {getAllUsers}