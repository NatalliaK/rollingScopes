const DB = require('../../common/temporaryDB');
const BOARDS = require('../../constants').BOARDS;

const TABLE_NAME = BOARDS;

const getAll = async () => await DB.getAll(TABLE_NAME);

const get = async id => {
  const board = await DB.get(TABLE_NAME, id);
  if (!board) {
    throw new Error(`The board with  id: ${id} is not found`);
  }
  return board;
};

const create = async board => await DB.create(TABLE_NAME, board);

const update = async board => await DB.update(TABLE_NAME, board);

const remove = async id => await DB.remove(TABLE_NAME, id);

module.exports = { getAll, get, create, update, remove };
