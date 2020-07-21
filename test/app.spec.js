const supertest = require('supertest');
const knex = require('knex');

const app = require('../src/app');
const { makeFolders, makeNotes } = require('./noteful_fixtures');
const { expect } = require('chai');

describe('App', () => {
  let db;
  before('make knex instance', () => {
    db = knex({
      client:'pg',
      connection:process.env.TEST_DB_URL
    });
    app.set('db',db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean table', () => db.raw('TRUNCATE noteful_folders, noteful_notes RESTART IDENTITY;'));

  afterEach('clean table', () => db.raw('TRUNCATE noteful_folders, noteful_notes RESTART IDENTITY;'));

  describe('GET /notes', () => {
    context('given no notes', () => {
      it('responds with a 200 and an empty list', () =>{
        return supertest(app)
          .get('/notes')
          .expect(200,[]);
      });
    });

    context('given some notes', () => {
      const testFolders = makeFolders();
      const testNotes = makeNotes();

      beforeEach('insert notes', () =>{
        return db
          .into('noteful_folders')
          .insert(testFolders)
          .then(() => {
            return db
              .into('noteful_notes')
              .insert(testNotes);
          });
      });

      it('responds with a 200 and all of the notes', () => {
        return supertest(app)
          .get('/notes')
          .expect(200)
          .expect(res => {
            expect(res.body).to.eql(testNotes);
          });
      });
    });
  });

  describe('GET /notes/:notesId', () => {
    context('given no notes', () => {
      it('responds with a 400', () => {
        return supertest(app)
          .get('/notes/1')
          .expect(400);
      });

    });

    context('given some notes', () => {
      const testFolders = makeFolders();
      const testNotes = makeNotes();
  
      beforeEach('insert notes', () =>{
        return db
          .into('noteful_folders')
          .insert(testFolders)
          .then(() => {
            return db
              .into('noteful_notes')
              .insert(testNotes);
          });
      });
  
      it('responds with a 200 and the specified note', () => {
        const thirdNoteId=3;
        return supertest(app)
          .get(`/notes/${thirdNoteId}`)
          .expect(200)
          .expect(res => {
            expect(res.body).to.eql(testNotes[thirdNoteId-1]);
          });
      });
    });

  });
});

