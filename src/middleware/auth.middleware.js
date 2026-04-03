const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 🔥 handle all possible header formats
  const authHeader =
    req.headers.authorization ||
    req.headers.Authorization ||
    req.get('Authorization') ||
    req.get('authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized - No header' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};