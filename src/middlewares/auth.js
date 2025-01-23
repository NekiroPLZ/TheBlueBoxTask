import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config/config.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    jwt.verify(token, SECRET_JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
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