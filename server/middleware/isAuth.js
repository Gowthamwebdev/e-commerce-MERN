import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { User } from '../models/UserModel.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }
    //Decode JWT signed
    const decoded = jwt.verify(token, JWT_SECRET); 
    const user = await User.findById(decoded._id);
    next();

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed: user not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
