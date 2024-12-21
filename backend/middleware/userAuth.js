const jwt = require('jsonwebtoken');
const SECRET_KEY = 'NIRAJ'

export const userAuth = (req, res, next) =>{
    const authHeader = req.header('Authorization');
    
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(401).json({
            msg : 'No token provided, authorization denied'
        })
        return;
    }

    const Auth = authHeader.split(" ");
    const token = Auth[1];

    try{
        //verify the token
        const decodeToken = jwt.verify(token, SECRET_KEY);
        const userId = decodeToken.userId;
        req.userId = userId;
        next();
    }
    catch(err){
        res.status(401).json({
            msg : "Invalid token"
        })
    }
}

