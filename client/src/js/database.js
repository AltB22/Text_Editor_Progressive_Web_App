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
 const transTextContent = textEditorDb.transaction('jate', 'readwrite');

 // Opens up the desired object store.
 const store = transTextContent.objectStore('jate');

 // Uses the put method to update the content. 
 const request = store.put({ id: 1, value: content });

 // console.logs a confirmation of the request.
 const result = await request;
 console.log('🚀 - content saved to the database', result);
};

//Added logic for a method that gets all the content from the database
export const getDb = async () => {
 
  // Creates connection to the database database and version
  const textEditorDb = await openDB('jate', 1);

  // Creates a new transaction and specify the database and data privileges.
  const transTextContent = textEditorDb.transaction('jate', 'readonly');

  // Opens up the desired object store.
  const store = transTextContent.objectStore('jate');

  // Uses the get(1) method to get the version number specified above.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
 
  console.log('Getting content from database');
  return result?.value;
  
}

initdb();
