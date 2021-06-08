const jwt = require('jsonwebtoken');
const stage = require('../api/stages/stages.queries');

// CHECK IF STAGE IS OVER SO USER CAN VIEW OTHER'S ENTRIES
module.exports = async (req, res, next) => {
  if (process.env.NODE_ENV == 'development') {
    return next();
  }
  const token = req.headers['authorization'];
  const userParam = +req.query.users_id;
  const stageID = +req.query.stage_id;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // CHECK TOKEN-ID EN ENTRIE EIGENAAR-ID
  const currentDate = new Date();
  const { date } = await stage.get(parseInt(stageID, 10) || 0);
  const stagesTime = new Date(date);
  if (decoded.id !== userParam && currentDate < stagesTime) {
    res.status(403).send('Je mag deze selectie (nog) niet zien.');
  }
  next();
};
