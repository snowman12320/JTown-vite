var uuid = require('uuid-v4');
var admin = require('firebase-admin');
var serviceAccount = require('./my-first-project-1110913-firebase-adminsdk-qcepc-a05f095b32.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://my-first-project-1110913.appspot.com'
});
var bucket = admin.storage().bucket();

// var uploadFile = function uploadFile(file) {
//   return new Promise(function (resolve, reject) {
//     if (!file) {
//       reject('No image file');
//     }

//     var newFileName = ''.concat(uuid(), '-').concat(file.originalname);
//     var fileUpload = bucket.file(newFileName);
//     var blobStream = fileUpload.createWriteStream({
//       metadata: {
//         contentType: file.mimetype
//       }
//     });
//     blobStream.on('error', function (error) {
//       reject('Something is wrong! Unable to upload at the moment.');
//     });
//     blobStream.on('finish', function () {
//       var url = 'https://firebasestorage.googleapis.com/v0/b/'
//         .concat(bucket.name, '/o/')
//         .concat(encodeURI(fileUpload.name), '?alt=media');
//       resolve(url);
//     });
//     blobStream.end(file.buffer);
//   });
// };
