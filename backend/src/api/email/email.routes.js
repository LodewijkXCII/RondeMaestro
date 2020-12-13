const message = require('./messages');
const https = require('https');

const express = require('express');
const sgMail = require('@sendgrid/mail');
const { config } = require('process');
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

router.post('/new-user', async (req, res, next) => {
  try {
    const msg = {
      from: 'loek@zweersdesign.com',
      to: req.body.email,
      templateId: 'd-88dbf2b1a4be473690ddca4e6f663611',
      dynamicTemplateData: {
        user_name: req.body.user_name,
        email: req.body.email,
      },
    };
    await sgMail.send(msg);
    res.send('Succes!');
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
