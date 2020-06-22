const express = require('express');

const queries = require('./user_role.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const userRoles = await queries.find();
  res.json(userRoles);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const userRole = await queries.get(parseInt(id, 10) || 0);
    if (userRole) {
      res.json(userRole);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
