const jwt = require('jsonwebtoken');
const Token = require('../api/auth/token.model');

function signAccesToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '8h',
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      }
    );
  });
}

function signRefreshToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      }
    );
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET);
    (error, token) => {
      if (error) return reject(error);
      return resolve(token);
    };
  });
}
function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    (error, token) => {
      if (error) return reject(error);
      return resolve(token);
    };
  });
}

module.exports = {
  signAccesToken,
  signRefreshToken,
  verifyToken,
  verifyRefreshToken,
};
