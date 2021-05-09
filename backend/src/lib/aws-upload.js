// Dependencies
import fs from 'fs';
import * as AWS from 'aws-sdk';
// AWS SDK Configuration
AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4', //API version
});
// Creating an S3 instance
const s3 = new AWS.S3({ signatureVersion: 'v4' });

// Reading the file from local path and uploading to S3 Bucket
fs.readFile('PATH_OF_FILE_TO_BE_UPLOADED', (err, fileBody) => {
  if (err) {
    console.log('Error', err);
  } else {
    let params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: 'file_name.pdf',
      Body: fileBody,
    };
    s3.upload(params, (err, result) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('S3 Response', result);
      }
    });
  }
});
