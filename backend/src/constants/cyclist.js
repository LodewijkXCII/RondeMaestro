const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
  path.join(__dirname, '..', '..', 'db', 'sources', 'cyclist.csv'),
  'utf8'
);

const cyclist = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
  encoding: "utf-8"
});

module.exports = cyclist.data.map(
  ({
    first_name,
    last_name,
    team_id,
    country_id,
    speciality_id,
    image_url,
    speciality_id_2,
  }) => ({
    first_name,
    last_name,
    team_id,
    country_id,
    speciality_id,
    image_url,
    speciality_id_2,
  })
);
