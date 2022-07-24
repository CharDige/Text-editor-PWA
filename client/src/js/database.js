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

// Function will POST to the database
export const putDb = async (content) => {
  console.log('Add to the database');

  // Connection to database and version to use
  const jateDb = await openDB('jate', 1);

  // New transaction, specifying the database and privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open desired object store
  const store = tx.objectStore('jate');

  // Using .add() on the store and pass in the content
  const request = store.add({ content: content });

  // Confirm results
  const result = await request;
  console.log('Data has been served to the database!', result);
};

// Function gets all the content from the database
export const getDb = async () => {
  console.log('GET data from the database');

  // Connection to database and version to use
  const jateDb = await openDB('jate', 1);

  // New transaction, specifying the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // Open desired object store
  const store = tx.objectStore('jate');

  // .getAll() to get all data in database
  const request = store.getAll();

  // Confirm request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
