export default {
  DEV_URL:
    process.env.VUE_APP_API_URL ||
    'https://rondemaestro-test.herokuapp.com/api/v1/',
  // DEV_URL: process.env.API_URL || 'http://localhost:1992/api/v1/',
  PROD_URL: 'https://rondemaestro-test.heroku.com/api/v1/',
  currentYear: new Date().getFullYear(),
  race_id: 34,
};
