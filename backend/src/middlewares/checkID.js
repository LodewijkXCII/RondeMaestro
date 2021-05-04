const jwt = require('jsonwebtoken');
const stage = require('../api/stages/stages.queries');

// CHECK IF STAGE IS OVER SO USER CAN VIEW OTHER'S ENTRIES
module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];
  const userParam = +req.query.users_id;
  const stageID = +req.query.stage_id;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // CHECK TOKEN-ID EN ENTRIE EIGENAAR-ID
  if (decoded.id !== userParam) {
    res.status(401).send('Je mag deze selectie (nog) niet zien.');
  } else {
    // CHECK DATUM
    const currentDate = new Date();
    const { date } = await stage.get(parseInt(stageID, 10) || 0);
    const stagesTime = new Date(date);
    // IF DATUM VAN ETAPPE IN HET VERLEDEN GEEF MELDING
    if (currentDate < stagesTime) {
      res.status(401).send('Je mag deze selectie (nog) niet inzien');
    } else {
      next();
    }
  }
};
