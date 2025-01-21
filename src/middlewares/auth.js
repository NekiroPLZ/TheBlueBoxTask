import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config/config.js";


const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXRpYXNtYWxhbXVkOTU0NkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNzM5Njg4NywiZXhwIjoxNzM3NDAwNDg3fQ.72wbhB-Oc35pEX-HND4VqqqlKTqEuZUCh_OsemulCu0' 

const decoded = jwt.decode(token); // Esto solo decodifica, sin validarlo
console.log(decoded);

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization Header:", authHeader); 
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {return res.sendStatus(401).json({ message: 'Access Denied' });};

    jwt.verify(token, SECRET_JWT_KEY, (err, user) => {
        if (err) {return res.sendStatus(403).json({ message: 'Invalid token' });};
        console.log("token", user);
        
        req.user = user;
        next();
    });
};

export const authorizeRole = (...role)=>{
    return (req, res, next)=>{
        if (!role.includes(req.user.role)) {return res.sendStatus(403).json({ message: 'Unauthorized' });};
        next();
    };
}