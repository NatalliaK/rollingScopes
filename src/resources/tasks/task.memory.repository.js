const DB = require('../../common/temporaryDB');
const TABLE_NAME = 'TASKS';

const getAll = async () => await DB.getAll(TABLE_NAME);

const get = async id => {
  const task = await DB.get(TABLE_NAME, id);
  if (!task) {
    throw new Error(`The task with  id: ${id} is not found`);
  }
  return task;
};

const create = async task => await DB.create(TABLE_NAME, task);

const update = async task => await DB.update(TABLE_NAME, task);

const remove = async id => await DB.remove(TABLE_NAME, id);

module.exports = { getAll, get, create, update, remove };
