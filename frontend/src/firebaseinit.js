import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDUJwa9SpvVL584IbTkqgtTFWM0hlo8gCU',
  authDomain: 'rondemaestro-285519.firebaseapp.com',
  projectId: 'rondemaestro-285519',
  storageBucket: 'rondemaestro-285519.appspot.com',
  messagingSenderId: '441260892947',
  appId: '1:441260892947:web:aadd06bc1dabd0e5f6b0e6',
});

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export default firebase;
