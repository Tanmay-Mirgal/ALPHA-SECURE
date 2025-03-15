import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, please login' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
        console.log(error);
        return;
    }
}

export const isKYCVerified = (req, res, next) => {
    if (req.user.kycStatus !== "verified") {
      return res.status(403).json({ message: "KYC verification required" });
    }
    next();
  };