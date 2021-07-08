const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.header("authentication-token-partner");
    const decoded = jwt.verify(token,process.env.JSONWEBTOKEN);
    req.partner = decoded.partner;
    next();
}