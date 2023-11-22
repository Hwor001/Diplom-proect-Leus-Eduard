import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD4Agl1G3zOfqeINTdiGnFDYukX3f7Wqd4',
  authDomain: 'book3-1402e.firebaseapp.com',
  databaseURL:
    'https://book3-1402e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'book3-1402e',
  storageBucket: 'book3-1402e.appspot.com',
  messagingSenderId: '759446561525',
  appId: '1:759446561525:web:62be197d9283484be31bbc',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
