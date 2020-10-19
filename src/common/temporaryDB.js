const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const { USERS, BOARDS, TASKS } = require('../constants');

const DB = {
  [USERS]: {},
  [BOARDS]: {},
  [TASKS]: {}
};

(() => {
  const usersDB = DB.USERS;
  const boardsDB = DB.BOARDS;
  const tasksDB = DB.TASKS;

  for (let i = 0; i <= 3; i++) {
    /* usersDB*/
    const user = new User();
    usersDB[user.id] = { ...user };

    /* boardsDB*/
    const board = new Board();
    boardsDB[board.id] = { ...board };

    /* tasksDB */

    const task = new Task(board.id);

    tasksDB[task.id] = { ...task };
  }
})();

const getAll = async entitiesName => Object.values(DB[entitiesName]);

const get = async (entitiesName, id) => DB[entitiesName][id];

const create = async (entitiesName, entity) => {
  DB[entitiesName][entity.id] = entity;
  return entity;
};

const update = async (entitiesName, entity) => {
  DB[entitiesName][entity.id] = entity;
  return entity;
};

const remove = async (entitiesName, id) => {
  const entity = await get(entitiesName, id);

  if (entity) {
    return delete DB[entitiesName][id];
  }
  return entity;
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
