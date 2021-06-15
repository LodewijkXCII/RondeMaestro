const date = new Date().getFullYear();
// Dependencies
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
// AWS SDK Configuration
AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
  apiVersion: '2006-03-01',
});
// Creating an S3 instance
const s3 = new AWS.S3({ signatureVersion: 'v4' });

const uploadCyclist = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWSBucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(
        null,
        // TODO FIX THIS SO IT'S UNIVERSAL FOR
        `renners/${date}-${req.body.first_name.toLowerCase()}-${req.body.last_name.toLowerCase()}.jpg`
      );
    },
  }),
});

exports.uploadCyclist = uploadCyclist;

const uploadTeam = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWSBucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(
        null,
        // TODO FIX THIS SO IT'S UNIVERSAL FOR
        `teams/${date}-${req.body.team_name
          .split(' ')
          .join('-')
          .toLowerCase()}.jpg`
      );
    },
  }),
});

exports.uploadTeam = uploadTeam;
