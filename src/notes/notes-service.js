const NotesService = {
  getAllNotes(db){
    return db('noteful_notes')
      .select();
  },

  getById(db,id){
    return db('noteful_notes')
      .select()
      .where({ id })
      .first();
  },

  insertNote(db,newNote){
    return db
      .insert(newNote)
      .into('noteful_notes')
      .returning('*')
      .then(rows => rows[0]);
  },

  updateNote(db,id,newNoteFields){
    return db('noteful_notes')
      .update(newNoteFields)
      .where({ id });
  },

  deleteNote(db,id){
    return db('noteful_notes')
      .delete('*')
      .where({ id });
  }
};

module.exports = NotesService;