const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');

const jwt = require('../../lib/jwt');
const User = require('../users/users.model');

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
  const { name, email, password, user_role_id } = req.body;
  try {
    const createUser = {
      name,
      email,
      password,
      user_role_id,
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
    const insertedUser = await User.query().insert({
      name,
      email,
      password: hashedPassword,
      user_role_id: 1,
    });
    delete insertedUser.password;
    const payload = {
      id: insertedUser.id,
      name,
      email,
    };
    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/signin', async (req, res, next) => {
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

    const payload = {
      id: user.id,
      name: user.name,
      user_type: user.user_role_id,
      email,
    };
    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
