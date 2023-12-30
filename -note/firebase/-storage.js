var uuid = require('uuid-v4');
var admin = require('firebase-admin');
var serviceAccount = require('./my-first-project-1110913-firebase-adminsdk-qcepc-a05f095b32.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://my-first-project-1110913.appspot.com'
});
var bucket = admin.storage().bucket();
