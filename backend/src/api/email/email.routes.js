const message = require('./messages');

const express = require('express');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/welkom', async (req, res, next) => {
  try {
    /* Haalt het bericht uit messages.js */
    await sgMail.send(message.welkom);
    res.send('Successfully! Sent mail');
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
      next(error);
    }
    return next(error);
  }
});

module.exports = router;
