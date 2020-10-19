const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchErrors } = require('../../utility');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const users = await usersService.getAll();

      if (users) {
        res.status(200).json(users.map(User.toResponse));
      } else res.status(404).send('Users not found');
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const { login, password, name } = req.body;
      const user = await usersService.create(
        new User({ login, password, name })
      );

      if (user) {
        res.status(200).json(User.toResponse(user));
      } else res.status(404).send('User not created');
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const user = await usersService.get(req.params.id);

      if (user) {
        res.status(200).json(User.toResponse(user));
      } else {
        res.status(404).send('User not found');
      }
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const {
        body,
        params: { id }
      } = req;
      const user = await usersService.update({ id, ...body });

      if (user) {
        res.status(200).json(User.toResponse(user));
      } else {
        res.status(404).send('User not update');
      }
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const user = await usersService.remove(req.params.id);

      if (user) {
        res.status(200).json(User.toResponse(user));
      } else {
        res.status(404).send('User not removed');
      }
    })
  );

module.exports = router;
