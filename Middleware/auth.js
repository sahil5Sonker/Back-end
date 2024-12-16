import jwt from 'jsonwebtoken';

export const Authenticated = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
