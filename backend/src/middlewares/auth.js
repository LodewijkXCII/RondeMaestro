const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
  if (process.env.NODE_ENV == 'development') {
    return next();
  }

  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).send({ error: 'Acces denied. No token provided' });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res
          .status(401)
          .json({ error: 'Session timed out, please login again' });
      } else if (error.name === 'JsonWebTokenError') {
        return res
          .status(401)
          .json({ error: 'Invalid token, please login again!' });
      } else {
        //catch other unprecedented errors
        console.error(error);
        return res.status(400).json({ error });
      }
    }
  }
}
// TODO ADD ADMIN AUTH
function adminAuth(req, res, next) {
  if (process.env.NODE_ENV == 'development') {
    return next();
  }
  console.log('Just move along!, nothing to see here');
  next();
  // const token = req.headers['authorization'];
  // if (!token) {
  //   res.status(401).send({ error: 'Acces denied. No token provided' });
  // }
  // const { user_type } = jwt.verify(token, process.env.JWT_SECRET);
  // // TODO ADD ADMIN NAME AS COMPARE
  // if (user_type === 3 || user_type === 6) {
  //   next();
  // } else {
  //   res.status(401).send({ error: 'Unauthorized, only admins can view.' });
  // }
}

module.exports = {
  checkAuth,
  adminAuth,
};
