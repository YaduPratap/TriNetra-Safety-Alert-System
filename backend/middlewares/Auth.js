import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Attach user info from the token to `req.user`
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default authenticateToken;