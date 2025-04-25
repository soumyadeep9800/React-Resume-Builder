const jwt=require('jsonwebtoken');
require('dotenv').config();


const jwtAuthMiddleware=(req,res,next)=>{
    const authheader=req.headers.authorization;
    if(!authheader) return res.status(404).json({error:'unauthorized'});
    try {
        const token=authheader.split(" ")[1];
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        console.log("middleware error invalid token");
        res.status(400).json({error:'internal server error'});
    }
}

const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{
        expiresIn:'24h'
    });
}

module.exports={
    jwtAuthMiddleware,
    generateToken
}