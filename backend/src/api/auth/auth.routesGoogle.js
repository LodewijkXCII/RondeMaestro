const express = require('express');
const passport = require('passport');
const jwt = require('../../lib/jwt');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../users/users.model');
require('dotenv').config();

const router = express.Router();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (obj, done) {
  const existingUser = await User.query().where('googleid', profile.id).first();
  if (existingUser) {
    return done(null, profile);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: 'http://localhost:1992/api/v1/auth/google/callback',
      callbackURL: 'http://localhost:8080',
    },
    async function (accessToken, refreshToken, profile, done) {
      // console.log('accessToken:', accessToken);
      // console.log('refreshToken:', refreshToken);

      const existingUser = await User.query()
        .where('googleid', profile.id)
        .first();

      if (existingUser) {
        return done(null, profile);
      } else {
        const insertUser = await User.query().insert({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleid: profile.id,
          password: 'Josjos123!',
          user_role_id: 1,
        });
        delete insertUser.password;

        return done(null, insertUser);
      }
      // User.get(accessToken, refreshToken, profile, function (err, user) {
      //   return done(null, user);
      // });
    }
  )
);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res, next) {
    if (!req.user) {
      return res.status(200).send('User Not Authenticated');
    }
    req.auth = {
      id: req.user.id,
    };
    next();

    // const payload = {
    //   id: req.user.id,
    //   name: req.user.name,
    //   // email: req.user.email,
    // };
    // const token = await jwt.sign(payload);

    // res.status(200).json({
    //   success: true,
    //   user: payload,
    //   token,
    // });

    // .redirect('/');

    // console.log('sucess! 🚵🏽‍♀️🚵🏽‍♀️');
  },
  async function generateToken(req, res, next) {
    const payload = {
      id: req.user.id,
      name: req.user.name,
      // email: req.user.email,
    };
    console.log(payload);
    req.token = await jwt.sign(payload);
    next();
  },
  function sendToken(req, res) {
    res.setHeader('x-auth-token', req.token);
    // console.log(req.token);
    return res.status(200).send(JSON.stringify(req.token));
    // return res.status(200).send('Hoera');
  }
);

module.exports = router;
