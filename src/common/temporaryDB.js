const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const { USERS, BOARDS, TASKS } = require('../constants');

const DB = {
  [USERS]: {},
  [BOARDS]: {},
  [TASKS]: {}
};

const actions = {
  [USERS]: id =>
    Object.values(DB[TASKS])
      .filter(entity => entity.userId === id)
      .forEach(entity => (DB[TASKS][entity].id = null)),
  [BOARDS]: id =>
    Object.values(DB[TASKS])
      .filter(entity => entity.boardId !== id)
      .forEach(entity => {
        delete DB[TASKS][entity.id];
      }),
  [TASKS]: () => {}
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

const remove = async (entitiesName, id) => {
  const entity = get(entitiesName, id);

  if (entity) {
    actions[entitiesName]();
    delete DB[entitiesName][id];
    return {};
  }
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
