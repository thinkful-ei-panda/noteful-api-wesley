function makeFolders() {
  return [
    {
      'id': 1,
      'folder_name': 'Folder 1'
    },
    {
      'id': 2,
      'folder_name': 'Folder 2'
    },
    {
      'id': 3,
      'folder_name': 'Folder 3'
    },
    {
      'id': 4,
      'folder_name': 'Folder 8'
    }
  ];
}

function makeNotes() {
  return [
    {
      'id': 1,
      'note_name': 'Note 1',
      'modified': '2020-07-21T17:12:28.841Z',
      'content': 'some content',
      'folder_id': 1
    },
    {
      'id': 2,
      'note_name': 'Note 2',
      'modified': '2020-07-21T17:12:28.841Z',
      'content': 'some content',
      'folder_id': 1
    },
    {
      'id': 3,
      'note_name': 'Note 3',
      'modified': '2020-07-21T17:12:28.841Z',
      'content': 'some content',
      'folder_id': 1
    },
    {
      'id': 4,
      'note_name': 'Note 4',
      'modified': '2020-07-21T17:12:28.841Z',
      'content': 'some content',
      'folder_id': 2
    },
    {
      'id': 5,
      'note_name': 'Note 5',
      'modified': '2020-07-21T17:12:28.841Z',
      'content': 'some content',
      'folder_id': 2
    },
    {
      'id': 6,
      'note_name': 'Note 6',
      'modified': '2020-07-21T17:12:28.841Z',
      'content': 'some content',
      'folder_id': 2
    },
    {
      'id': 7,
      'note_name': 'Note 7',
      'modified': '2020-07-21T17:12:28.841Z',
      'content': 'some content',
      'folder_id': 3
    },
    {
      'id': 8,
      'note_name': 'Note 8',
      'modified': '2020-07-21T17:12:28.841Z',
      'content': 'some content',
      'folder_id': 3
    },
    {
      'id': 9,
      'note_name': 'Note 9',
      'modified': '2020-07-21T17:12:28.841Z',
      'content': 'some content',
      'folder_id': 3
    }
  ];
}

module.exports = {makeFolders, makeNotes};