const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = (req,res,next) => {
    const token = req.header('Authentication');
    if(!token) return res.status(401).send('Access Denied JWT Token is not Present')
    try{
       const verified = jwt.verify(token,process.env.JWT_KEY);
       req.user = verified;
       next();
    }
    catch(err){
       res.status(401).send('Invalid JWT Token ');
    }
};

module.exports = {
    verify,
}