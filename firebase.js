const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter, doc, setDoc } = require('firebase-admin/firestore');

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
      apiKey: 'AIzaSyBjht0vea76V6ZLkCyqiFxeYRp4rvTaCYA',
      authDomain: 'my-first-project-1110913.firebaseapp.com',
      projectId: 'my-first-project-1110913',
      storageBucket: 'my-first-project-1110913.appspot.com',
      messagingSenderId: '975844882213',
      appId: '1:975844882213:web:fe2ad0746c2de61e5f4ccc',
      measurementId: 'G-C8JWYX7WYP',
      databaseURL: 'https://DATABASE_NAME.firebaseio.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// how to set firestore data
const docRef = doc(db, 'users', 'alovelace');
const setAda = setDoc(docRef, {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815
});
console.log(setAda);