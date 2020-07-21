const express = require('express');
const xss = require('xss');
const NotesRouter = express.Router();

const NotesService = require('./notes-service');

const serializeNote = note => ({
  id: note.id,
  note_name: xss(note.note_name),
  modified: note.modified,
  content: xss(note.content),
  folder_id: note.folder_id,
});

NotesRouter
  .route('/')
  .get((req,res,next)=> {
    NotesService.getAllNotes(req.app.get('db'))
      .then(notes => {
        const sanitizedNotes = notes.map(note => serializeNote(note));
        res.status(200).json(sanitizedNotes);
      })
      .catch(next);
  })
  .post(express.json(), (req,res,next) => {
    const {note_name,content,folder_id} = req.body;
    const newNote = {
      note_name,
      content,
      folder_id
    };

    for( const [key, value] of Object.entries(newNote)){
      if(value == null){
        return res.status(400).json({
          error: {message: `Missing '${key}' in request body`}
        });
      }
    }

    NotesService.insertNote(req.app.get('db'),newNote)
      .then(note => {
        res.status(201).json(serializeNote(note));
      });
  });

NotesRouter
  .route('/:noteId')
  .all((req,res,next) => {
    NotesService.getById(req.app.get('db'),req.params.noteId)
      .then(note => {
        if(!note) {
          return res.status(400).json({
            error: {message: 'Note doesn\'t exist'}
          });
        }
        res.note = note;
        next();
      })
      .catch(next);
  })
  .get((req,res,next) => {
    res.status(200).json(serializeNote(res.note));
  })
  .patch(express.json(), (req,res,next) => {
    const {note_name,content,folder_id} = req.body;
    const newNoteFields = {note_name,content,folder_id};

    const numberOfValues = Object.values(newNoteFields).filter(Boolean).length;
    if(numberOfValues === 0) {
      return res.status(400).json({
        error: {message: 'Must include at least one of \'note_name\', \'content\', or \'folder_id\' to change'}
      });
    }
    NotesService.updateNote(req.app.get('db'),req.params.noteId,newNoteFields)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .delete((req,res,next) => {
    NotesService.deleteNote(req.app.get('db'),req.params.noteId)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = NotesRouter;