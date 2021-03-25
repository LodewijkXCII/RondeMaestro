const express = require('express');

const User = require('./users.model');
const queries = require('./users.queries');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.query()
    .select(
      'id',
      'email',
      'name',
      'user_role_id',
      'created_at',
      'updated_at'
      // 'googleid'
    )
    .where('deleted_at', null);
  res.json(users);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await queries.get(parseInt(id, 10) || 0);
    if (user) {
      res.json(user);
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = await queries.update(req.body, req.params.id);
    if (updatedUser) {
      res.json(updatedUser);
      console.log('Updating');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.query().insert(req.body);
  } catch (error) {
    throw error;
  }
});

// GOOGLE ROUTES
// router.get('/', async (req, res) => {
//   const users = await User.query().select().where('deleted_at', null);
//   res.json(users);
// });

// router.post('/', async (req, res) => {
//   try {
//     const user = await User.query().insert(req.body);
//   } catch (error) {
//     throw error;
//   }
// });

module.exports = router;
