import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

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
        const decodeToken = jwt.verify(token, process.env.SECRET);
        const userId = decodeToken.userId;
        const airtableId = decodeToken.airtableId;

        req.userId = userId;
        req.airtableId = airtableId;
        
        next();
    }
    catch(err){
        res.status(401).json({
            msg : "Invalid token"
        })
    }
}

