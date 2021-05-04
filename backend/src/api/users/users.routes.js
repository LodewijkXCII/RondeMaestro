const express = require('express');

const User = require('./users.model');
const queries = require('./users.queries');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.query()
    .select(
      'users.id',
      'users.email',
      'users.name',
      'user_role.name as user_type',
      'users.created_at',
      'users.updated_at'
    )
    .join('user_role', 'users.user_role_id', 'user_role.id')
    .where('users.deleted_at', null);
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
    const user = await User.query()
      .insert(req.body)
      .join('user_role', 'users.user_role_id', 'user_role.id')
      .returning(
        'users.id',
        'users.email',
        'users.name',
        'user_role.name as user_type',
        'users.created_at',
        'users.updated_at'
      );
    res.json(user);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
