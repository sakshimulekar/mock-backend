let jwt=require("jsonwebtoken");
const { BlacklistModel } = require("./model/logout.model");

const auth=async(req,res,next)=>{
    
    try {
        const token=req.headers.authorization?.split(" ")[1];
        const isBlacklisted=await BlacklistModel.findOne({blacklist:token})
        if(isBlacklisted){
            return req.status(401).json({msg:"token is blacklisted"})
        }
        const decoded=jwt.verify(token,"mock")
            if(decoded){
                next()
        }
        
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

module.exports={
    auth
}