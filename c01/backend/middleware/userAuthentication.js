const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.header("authentication-token-user");
    const decoded = jwt.verify(token,process.env.JSONWEBTOKEN);
    req.user = decoded.user;
    next();
}