
const jwt = require('jsonwebtoken');



function verifyToken(req,res,next){

    const token = req.headers.token;
if(token){

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;
        next();

        
    } catch (error) {
        res.status(401).json({message:"Invalid Token"})
    }
}
else{
    res.status(401).json({message:"No Token Provided"})
}

}



module.exports = {
    verifyToken
}