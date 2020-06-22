const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
  path.join(__dirname, '..', '..', 'db', 'sources', 'stage.csv'),
  'utf8'
);

const stage = Papa.parse(csvData, {
  header: true,
});

module.exports = stage.data.map(
  ({ stage_nr, start_city, finish_city, distance, date }) => ({
    stage_nr,
    start_city,
    finish_city,
    distance,
    date,
  })
);
