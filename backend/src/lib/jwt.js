const jwt = require('jsonwebtoken');
const Token = require('../api/auth/token.model');

function signAccesToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      }
    );
  });
}

async function signRefreshToken(payload) {
  try {
    const refreshToken = await jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: '7d',
      }
    );

    // Insert RefreshToken in DB
    await Token.query().insert({
      token: refreshToken,
    });

    return refreshToken;
  } catch (error) {
    console.error(error);
  }
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
async function verifyRefreshToken(token) {
  const decoded = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  return decoded;
}

module.exports = {
  signAccesToken,
  signRefreshToken,
  verifyToken,
  verifyRefreshToken,
};
