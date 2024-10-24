const jwt = require("jsonwebtoken");
const User = require ("../models/userModel");
const UserAuth = async(req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }
        const decoded = await jwt.verify(token,"ChatApp@2310");
        if(!decoded){
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById({_id:decoded._id});
        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
        
        next();
        
    } catch (error) {
         console.log(error.message);
         
    }
}

module.exports = {UserAuth}