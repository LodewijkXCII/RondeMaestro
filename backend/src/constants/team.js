const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
  path.join(__dirname, '..', '..', 'db', 'sources', 'team.csv'),
  'utf8'
);

const team = Papa.parse(csvData, {
  header: true,
});

module.exports = team.data.map(
  ({ id, name, abbreviation, country_id, level, year, image_url }) => ({
    id,
    name,
    abbreviation,
    country_id,
    level,
    year,
    image_url,
  })
);
