const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { catchErrors } = require('../../utility');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const boards = await boardsService.getAll();

      if (boards) {
        res.status(200).json(boards.map(Board.toResponse));
      } else {
        res.status(404).send('Boards not found');
      }
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const { title, columns } = req.body;
      const board = await boardsService.create(new Board({ title, columns }));

      if (board) {
        res.status(200).json(Board.toResponse(board));
      } else {
        res.status(404).send('Board not created');
      }
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const board = await boardsService.get(req.params.id);

      if (board) {
        res.status(200).json(Board.toResponse(board));
      } else {
        res.status(404).send('Board not found');
      }
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const {
        body,
        params: { id }
      } = req;
      const board = await boardsService.update({ id, ...body });

      if (board) {
        res.status(200).json(Board.toResponse(board));
      } else {
        res.status(404).send('Board not updated');
      }
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const board = await boardsService.remove(req.params.id);

      if (board) {
        res.status(200).json(Board.toResponse(board));
      } else {
        res.status(404).send('Board not removed');
      }
    })
  );

module.exports = router;
