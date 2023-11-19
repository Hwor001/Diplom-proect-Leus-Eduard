import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD4Agl1G3zOfqeINTdiGnFDYukX3f7Wqd4',
  authDomain: 'book3-1402e.firebaseapp.com',
  projectId: 'book3-1402e',
  storageBucket: 'book3-1402e.appspot.com',
  messagingSenderId: '759446561525',
  appId: '1:759446561525:web:62be197d9283484be31bbc',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
