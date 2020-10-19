const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { catchErrors } = require('../../utility');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const tasks = await tasksService.getAll();
      if (tasks) {
        res.status(200).json(tasks.map(Task.toResponse));
      } else res.status(404).send('Tasks not found');
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const {
        body: { title, order, description, userId, columnId },
        params: { boardId }
      } = req;

      const task = await tasksService.create(
        new Task({ title, order, description, userId, columnId, boardId })
      );

      if (task) {
        res.status(200).json(Task.toResponse(task));
      } else res.status(404).send('Task not created');
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const task = await tasksService.get(req.params.id);

      if (task) {
        res.status(200).json(Task.toResponse(task));
      } else res.status(404).send('Task not found');
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const {
        body,
        params: { id }
      } = req;

      const task = await tasksService.update({ id, ...body });

      if (task) {
        res.status(200).json(Task.toResponse(task));
      } else return res.status(404).send('Task not updated');
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const task = await tasksService.remove(req.params.id);

      if (task) {
        res.status(204).json(Task.toResponse(task));
        return await res.sendStatus(204);
      }
      return res.status(404).send('Task not found');
    })
  );

module.exports = router;
