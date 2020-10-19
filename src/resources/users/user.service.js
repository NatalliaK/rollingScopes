const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = user => usersRepo.update(user);

const remove = async id => {
  const allTasks = await tasksRepo.getAll();

  const userTasks = allTasks.filter(entity => entity.userId === id);

  Promise.all(
    userTasks.map(entity => tasksRepo.update({ ...entity, userId: null }))
  ).catch(err => console.error('Error deleting user tasks', err));

  return usersRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
