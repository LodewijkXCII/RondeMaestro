const admin = require('firebase-admin');

const serviceAccount = require('../config/rondemaestro-285519-firebase-adminsdk-8qjw7-3ef53ae796.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'rondemaestro-285519.firebaseapp.com',
});

function checkAuth(req, res, next) {
  if (!req.headers.authtoken) {
    res.status(403);
    console.log('testing failed');
  }

  admin
    .auth()
    .verifyIdToken(req.headers.authtoken)
    .then(() => {
      next();
    })
    .catch(() => {
      res.send('Unauthorized');
      console.log('testing failed again');
    });
}
// TODO ADD ADMIN AUTH
function adminAuth(req, res, next) {}

module.exports = {
  checkAuth,
  adminAuth,
};
