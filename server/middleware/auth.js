
const jwt = require('jsonwebtoken');


const verifyToken = async(req, res, next)=>{
    try {
        const token = req.body.token || req.query.token || req.params.token || req.header("Authorization");
        if (!token) {
            return res.status(401).json("Access Denied");
        }
        
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = verified;
        next();
    } catch (err) {
        err.status = 401;
        next(err);
    }
}

module.exports = verifyToken;