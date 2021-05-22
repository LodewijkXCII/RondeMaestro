const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');

const jwt = require('../../lib/jwt');
const User = require('../users/users.model');
const Token = require('./token.model');
const userQuery = require('../users/users.queries');
const roleQuery = require('../user_role/user_role.queries');

const router = express.Router();

const schema = yup.object().shape({
  name: yup.string().trim().min(2).required(),
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
    .matches(/[A-Z]/, 'password must contain an uppercase letter')
    .matches(/[a-z]/, 'password must contain a lowercase letter')
    .matches(/[0-9]/, 'password must contain a number')
    .required(),
});

const errorMessages = {
  invalidLogin: 'Email of wachtwoord verkeerd',
  invalidEmail: 'Emailadres niet bekend',
  emailOrNameInUse: 'Email or name in gebruik.',
};

router.post('/signup', async (req, res, next) => {
  // FIND SUBSRIBER ACCOUNT ID
  const { id: userRole } = await roleQuery.getName('public');

  // SETUP POSTGRESQL USER
  const { name, email, password } = req.body;

  try {
    const createUser = {
      name,
      email,
      password,
      user_role_id: userRole,
    };

    await schema.validate(createUser, {
      abortEarly: false,
    });
    const existingUser = await User.query().where({ email }).first();
    const existingName = await User.query().where({ name }).first();

    if (existingUser || existingName) {
      res.status(401).send({ error: errorMessages.emailOrNameInUse });
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const insertedUser = await User.query()
      .insertAndFetch({
        name,
        email,
        password: hashedPassword,
        user_role_id: userRole,
      })
      .join('user_role as user_role_id', 'user_role.id', 'users.user_role_id');
    delete insertedUser.password;

    const payload = {
      id: insertedUser.id,
      name: insertedUser.name,
      user_type: insertedUser.user_role_id,
      email: insertedUser.email,
    };

    const accesToken = await jwt.signAccesToken(payload);
    const refreshToken = await jwt.signRefreshToken(payload);
    res.json({
      user: payload,
      accesToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await schema.validate(
      {
        name: 'Loek',
        email,
        password,
      },
      {
        abortEarly: false,
      }
    );

    /* CONTROLEER USER EN GEEF FOUTCODE WANNEER NIET GEVONDEN IS */
    const user = await User.query().where({ email }).first();

    if (!user) {
      res.status(401).send({ error: errorMessages.invalidEmail });
    }
    /* CONTROLEER WACHTWOORD EN GEEF FOUTCODE ONJUIST IS */
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).send({ error: errorMessages.invalidLogin });
    }

    await userQuery.update(user.id);

    const payload = {
      id: user.id,
      name: user.name,
      user_type: user.user_role_id,
      email,
    };
    const accesToken = await jwt.signAccesToken(payload);
    const refreshToken = await jwt.signRefreshToken(payload);
    res.status(200).json({
      user: payload,
      accesToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/refresh_token', async (req, res, next) => {
  try {
    //get refreshToken
    const { refreshToken } = req.body;
    console.log(refreshToken);
    //send error if no refreshToken is sent
    if (!refreshToken) {
      return res.status(403).json({ error: 'Access denied,token missing!' });
    } else {
      //query for the token to check if it is valid:
      const tokenDoc = await Token.query().where('token', refreshToken).first();

      //send error if no token found:
      if (!tokenDoc) {
        await Token.query().delete().where('token', refreshToken);
        return res.status(401).json({ error: 'Token expired!' });
      } else {
        //extract payload from refresh token and generate a new access token and send it
        const payload = await jwt.verifyRefreshToken(tokenDoc.token);
        delete payload.exp;

        const accessToken = await jwt.signAccesToken(payload);
        return res.status(200).json({ accessToken });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error!' });
  }
});

router.delete('/logout', async (req, res, next) => {
  try {
    //delete the refresh token saved in database:
    const { refreshToken } = req.body;
    await Token.query().delete().where('token', refreshToken);
    return res.status(200).json({ success: 'User logged out!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error!' });
  }
});

module.exports = router;
