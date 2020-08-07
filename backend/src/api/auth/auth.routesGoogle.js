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

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:1992/api/v1/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
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
  async function (req, res) {
    // console.log(req);

    const payload = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    };
    const token = await jwt.sign(payload);

    const htmlWithEmbeddedJWT = `
    <html>
      <script>
        // Save JWT to localStorage
        window.localStorage.setItem('JWT', '${token}');
        // Redirect browser to root of application
        window.location.href = 'http://localhost:8080/#/';
      </script>
    </html>
    `;

    res.send(htmlWithEmbeddedJWT);

    // res.status(200).json({
    //   success: true,
    //   user: payload,
    //   token,
    // });
    // res.redirect('http://localhost:8080/#/');
    console.log('sucess! 🚵🏽‍♀️🚵🏽‍♀️');
  }
);

module.exports = router;
