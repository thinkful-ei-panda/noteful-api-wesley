const express = require('express');
const FoldersService = require('./folders-service');

const FoldersRouter = express.Router();

FoldersRouter
  .route('/')
  .get((req,res,next) => {
    FoldersService.getAllFolders(req.app.get('db'))
      .then(folders => {
        res.status(200).json(folders);
      })
      .catch(next);
  })
  .post(express.json(), (req,res,next) => {
    const {folder_name} = req.body;
    const newFolder = {folder_name};
    console.log(newFolder);
    FoldersService.insertFolder(req.app.get('db'),newFolder)
      .then(folder => {
        res.status(201).json(folder);
      })
      .catch(next);
  });

// FoldersRouter
//   .route('/:folderId')
//   .all((req,res,next) => {

//   })
//   .get((req,res,next) => {

//   })
//   .patch((req,res,next) => {

//   })
//   .delete((req,res,next) => {
    
//   });


module.exports = FoldersRouter;