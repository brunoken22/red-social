import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
// let rtdb; // Variable para rastrear la conexión a Firebase RTDB

const app = initializeApp({
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_RTDB,
});

// if (!rtdb) {
const rtdb = getDatabase(app); // Conéctate a Firebase RTDB si no lo has hecho antes
// console.log('Conectado a Firebase RTDB');
// }

export {rtdb};
