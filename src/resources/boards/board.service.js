const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const update = board => boardsRepo.update(board);

const remove = async id => {
  const allTasks = await tasksRepo.getAll();
  const boardTasks = allTasks.filter(entity => entity.boardId === id);

  Promise.all(
    boardTasks.map(entity => tasksRepo.remove(entity.id))
  ).catch(err => console.error("Error delete board's tasks", err));

  return boardsRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
