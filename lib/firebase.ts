import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const app = initializeApp({
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_RTDB,
});

const rtdb = getDatabase(app);

export {rtdb};
