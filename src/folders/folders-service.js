const FoldersService = {
  getAllFolders(db){
    return db
      .select()
      .from('noteful_folders');
  },

  getById(db,id){
    return db
      .select()
      .from('noteful_folders')
      .where({ id })
      .first();
  },

  insertFolder(db,newFolder){
    return db
      .insert(newFolder)
      .into('noteful_folders')
      .returning('*')
      .then(rows => rows[0]);
  },

  renameFolder(db,id,newFolderFields){
    return db('noteful_folders')
      .update(newFolderFields)
      .where({ id });
  },

  deleteFolder(db,id){
    return db('noteful_folders')
      .delete('*')
      .where({ id });
  }
};

module.exports = FoldersService;