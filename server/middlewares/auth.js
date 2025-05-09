
const userModel = require("../models/user") ; 
const jwt = require("jsonwebtoken") ; 
const blacklistmodel = require("../models/blacklist")


module.exports.isAuthenticated = async (req , res , next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] ; 

        const isBlackListed = await blacklistmodel.findOne({token}) ; 

        if(isBlackListed){
            return res.status(401).json({
                message : "Unothorized" , 
            }) ; 
        }

        const decode = jwt.verify(token , process.env.JWT_SECRET) ; 
        const user = await userModel.findById(decode._id) ; 

        if(!user){
            return res.status(401).json({
                message : "Unauthorized" , 
            })
        }
        req.user = user ; 
        next() ; 
    }
    catch(err){
        next(err) ; 
    }
}


module.exports.isSeller = async (req , res , next) =>{
    try {
        const user = req.user ; 
        if(user.role !== "seller"){
            return res.status(401).json({
                message : "Unauthorized" , 
            }) ; 
        }
        next() ; 
    }   
    catch(err){
        next(err);
    }
}