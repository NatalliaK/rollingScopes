// id,
//   title,
//   order,
//   description,
//   userId, //assignee
//   boardId,
//   columnId

const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'string',
    order = 0,
    description = 'string',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, boardId, userId, columnId } = task;
    return { id, title, order, description, boardId, userId, columnId };
  }
}

module.exports = Task;
