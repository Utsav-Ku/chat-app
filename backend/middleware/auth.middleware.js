import jwt from "jsonwebtoken";


export const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1] || req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized User' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ errors: 'Unauthorized' });
    }
}