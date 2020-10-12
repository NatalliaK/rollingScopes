const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll();
    res.json(tasks.map(Task.toResponse));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.id);
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const {
      body: { title, order, description, userId, columnId },
      params: { boardId }
    } = req;

    const task = await tasksService.create(
      new Task({ title, order, description, userId, columnId, boardId })
    );
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const {
      body,
      params: { id }
    } = req;
    const task = await tasksService.update({ id, ...body });
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const task = await tasksService.remove(req.params.id);
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
