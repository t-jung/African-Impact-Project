const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.header("authentication-token-company");
    const decoded = jwt.verify(token,process.env.JSONWEBTOKEN);
    req.company = decoded.company;
    next();
}