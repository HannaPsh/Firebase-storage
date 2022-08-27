// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCUyvqkLnYjvdCrZYdEiAFbsJXmrRjmXXQ',
  authDomain: 'candy-crush-project-9eb0e.firebaseapp.com',
  projectId: 'candy-crush-project-9eb0e',
  storageBucket: 'candy-crush-project-9eb0e.appspot.com',
  messagingSenderId: '322600811024',
  appId: '1:322600811024:web:c6b50be13879cecdf26895',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
