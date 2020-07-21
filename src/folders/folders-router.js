const express = require('express');
const FoldersService = require('./folders-service');
const xss = require('xss');

const FoldersRouter = express.Router();

const serializeFolder = folder => ({
  id:folder.id,
  folder_name:xss(folder.folder_name)
});

FoldersRouter
  .route('/')
  .get((req,res,next) => {
    FoldersService.getAllFolders(req.app.get('db'))
      .then(folders => {
        const sanitizedFolders = folders.map(folder => serializeFolder(folder));
        res.status(200).json(sanitizedFolders);
      })
      .catch(next);
  })
  .post(express.json(), (req,res,next) => {
    const {folder_name} = req.body;
    if(folder_name == null){
      return res.status(400).json({
        error: {message: 'Needs a folder name.'}
      });
    }
    const newFolder = {folder_name};
    FoldersService.insertFolder(req.app.get('db'),newFolder)
      .then(folder => {
        res.status(201).json(serializeFolder(folder));
      })
      .catch(next);
  });

FoldersRouter
  .route('/:folderId')
  .all((req,res,next) => {
    FoldersService.getById(req.app.get('db'),req.params.folderId)
      .then(folder => {
        if(!folder){
          return res.status(400).json({
            error: {message: 'Could not find folder by that id'}
          });
        }
        res.folder = folder;
        next();
      })
      .catch(next);
  })
  .get((req,res,next) => {
    res.status(200).json(serializeFolder(res.folder));
  })
  .patch(express.json(), (req,res,next) => {
    const newFolderFields = {folder_name:req.body.folder_name};

    const numberOfValues = Object.values(newFolderFields).filter(Boolean).length;
    if(numberOfValues === 0 ){
      return res.status(400).json({
        error: {message: 'Must have folder name to update'}
      });
    }
    FoldersService.renameFolder(
      req.app.get('db'),
      req.params.folderId,
      newFolderFields
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);    
  })
  .delete((req,res,next) => {
    FoldersService.deleteFolder(req.app.get('db'),req.params.folderId)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });


module.exports = FoldersRouter;