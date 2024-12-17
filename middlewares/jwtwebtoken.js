const jwt = require('jsonwebtoken')

exports.verifytoken=(req,res,next)=>{
    const token = req.headers['authorization']

   try{ if(!token){
        return res.status(404).json({message:"Access denied no token provided"})
    }

    const jwtresponse = jwt.verify(token.split(" ")[1],process.env.JWTKEY)

    
    

    req.payload = jwtresponse.user.userId

    
    

    next()}

    catch(error){
        res.status(404).json({message:"invalid or expired token"})
    }


}