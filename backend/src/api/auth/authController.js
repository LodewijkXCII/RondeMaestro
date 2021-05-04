const jwt = require('jsonwebtoken');
const { signAccesToken } = require('../../lib/jwt');

exports.generateRefreshToken = async (req, res) => {
  try {
    //get refreshToken
    const { refreshToken } = req.body;
    //send error if no refreshToken is sent
    if (!refreshToken) {
      return res.status(403).json({ error: 'Access denied,token missing!' });
    } else {
      //query for the token to check if it is valid:
      const tokenDoc = await Token.findOne({ token: refreshToken });
      //send error if no token found:
      if (!tokenDoc) {
        return res.status(401).json({ error: 'Token expired!' });
      } else {
        //extract payload from refresh token and generate a new access token and send it
        const payload = jwt.verify(
          tokenDoc.token,
          process.env.JWT_REFRESH_SECRET
        );
        const accessToken = signAccesToken(payload);
        return res.status(200).json({ accessToken });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error!' });
  }
};
