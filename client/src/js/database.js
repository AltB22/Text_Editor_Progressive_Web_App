import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Updating the database');

 // Creates a connection to the database database and version we want to use.
 const textEditorDb = await openDB('jate', 1);

 // Creates a new transaction and specify the database and data privileges.
 const textContent = textEditorDb.transaction('jate', 'readwrite');

 // Opens up the desired object store.
 const store = textContent.objectStore('jate');

 // Uses the .add() method on the store and pass in the content.
 const request = store.put({ id: 1, value: content });

 // console.logs a confirmation of the request.
 const result = await request;
 console.log('🚀 - content saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Getting content from database');
  // Creates connection to the database database and version
  const textEditorDb = await openDB('jate', 1);d

  // Creates a new transaction and specify the database and data privileges.
  const textContent = textEditorDb.transaction('jate', 'readonly');

  // Opens up the desired object store.
  const store = textContent.objectStore('jate');

  // Uses the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
