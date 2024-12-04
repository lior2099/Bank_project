import jwt from 'jsonwebtoken';

export const tokenACCValidator = (req, res, next) => {
  const secretKeyACC = process.env.JWT_SECRET_ACC;

  const token = req.headers['authorization']?.split(' ')[1]; 
  
  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKeyACC);
    req.user = decoded.email; 
    next(); 
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

export const tokenREFValidator = (req, res, next) => {
  const secretKeyREF = process.env.JWT_SECRET_REF;

  const token = req.headers['authorization']?.split(' ')[1]; 
  
  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKeyREF);
    req.user = decoded.email; 
    next(); 
  } catch (err) {
    console.log(err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    return res.status(401).json({ msg: 'Invalid token' });
  }
};