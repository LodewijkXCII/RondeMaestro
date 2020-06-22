const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
  path.join(__dirname, '..', '..', 'db', 'sources', 'race.csv'),
  'utf8'
);

const race = Papa.parse(csvData, {
  header: true,
});

module.exports = race.data.map(({ name, season_time_id, year, image_url }) => ({
  name,
  season_time_id,
  year,
  image_url,
}));
