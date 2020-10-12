const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DB = {
  USERS: {},
  BOARDS: {},
  TASKS: {}
};

(() => {
  const usersDB = DB.USERS;
  const boardsDB = DB.BOARDS;
  const tasksDB = DB.TASKS;

  /* usersDB*/

  const user1 = new User();
  const user2 = new User();
  const user3 = new User();

  usersDB[user1.id] = { ...user1 };
  usersDB[user2.id] = { ...user2 };
  usersDB[user3.id] = { ...user3 };

  /* boardsDB*/

  const board1 = new Board();
  const board2 = new Board();

  boardsDB[board1.id] = { ...board1 };
  boardsDB[board2.id] = { ...board2 };

  /* tasksDB */

  const task1 = new Task(board1.id);
  const task2 = new Task(board2.id);

  tasksDB[task1.id] = { ...task1 };
  tasksDB[task2.id] = { ...task2 };
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

const remove = async (entitiesName, id) => delete DB[entitiesName][id];

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
