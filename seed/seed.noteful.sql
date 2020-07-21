BEGIN;
TRUNCATE noteful_folders, noteful_notes RESTART IDENTITY;

INSERT INTO noteful_folders 
(folder_name)
VALUES
('Folder 1'),
('Folder 2'),
('Folder 3');

INSERT INTO noteful_notes
(note_name, folder_id,content)
VALUES
('Note 1', 1, 'some content'),
('Note 2', 1, 'some content'),
('Note 3', 1, 'some content'),
('Note 4', 2, 'some content'),
('Note 5', 2, 'some content'),
('Note 6', 2, 'some content'),
('Note 7', 3, 'some content'),
('Note 8', 3, 'some content'),
('Note 9', 3, 'some content');

COMMIT;
