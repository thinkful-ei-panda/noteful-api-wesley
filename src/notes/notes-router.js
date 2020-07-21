const express = require('express');

const NotesRouter = express.Router();

NotesRouter
  .route('/')
  .get()
;

module.exports = NotesRouter;