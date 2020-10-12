const DB = require('../../common/temporaryDB');
const USERS = require('../../constants').USERS;

const TABLE_NAME = USERS;

const getAll = async () => await DB.getAll(TABLE_NAME);

const get = async id => {
  const user = await DB.get(TABLE_NAME, id);
  if (!user) {
    throw new Error(`The user with  id: ${id} is not found`);
  }
  return user;
};

const create = async user => await DB.create(TABLE_NAME, user);

const update = async user => await DB.update(TABLE_NAME, user);

const remove = async id => await DB.remove(TABLE_NAME, id);

module.exports = { getAll, get, create, update, remove };
