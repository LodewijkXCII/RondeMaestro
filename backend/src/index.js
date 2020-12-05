const app = require('./app.js');
require('dotenv').config();

const port = process.env.PORT || 1992;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
