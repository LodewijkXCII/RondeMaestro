const express = require('express');
const sgMail = require('@sendgrid/mail');

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'loekzweers@gmail.com',
  from: 'rondemaestro@gmail.com', // Use the email address or domain you verified above
  subject: 'Welkom bij RondeMaestro!',
  text:
    'Hallo, Wat leuk dat je mee doet aan RondeMaestro! We vinden je nu al een held dat je mee wil doen! Je kan nu dagelijks meedoen voor de eeuwige roem en de beste verhalen bij het koffiezetapparaat. Tot ziens op RondeMaestro! Met vriendelijke groet, De RondeMaestro’s',
  html: `Hallo,<br/>
  <p>
  Wat leuk dat je mee doet aan RondeMaestro! We vinden je nu al een held dat je mee wil doen! Je kan nu dagelijks meedoen voor de eeuwige roem en de beste verhalen bij het koffiezetapparaat. 
  </p>
  <p>
  Tot ziens op RondeMaestro!
  </p>
  <p>
  Met vriendelijke groet,<br/>
  De RondeMaestro’s</p>`,
};

router.get('/', async (req, res, next) => {
  try {
    await sgMail.send(msg);
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
