import jwt from 'jsonwebtoken';

export const Authenticated = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Get the token after "Bearer "

  if (!token) {
    return res.status(401).json({ message: 'Access Denied, Token Missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Attach userId to request
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
