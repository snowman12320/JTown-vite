// https://www.youtube.com/watch?v=VWCP2jidNi8&list=PLliocbKHJNwtMa0AaYC7w5SuwhpbtcP5u&index=6
// 在 Firebase 控制台中，選擇你的專案。
// 在左側選單中，選擇 "設定" > "專案設定"。
// 在 "服務帳戶" 頁面，點擊 "生成新的私鑰" 按鈕。這將會下載一個 JSON 檔案。
// 將這個 JSON 檔案放到你的專案資料夾中，並記住它的路徑。
// 在你的程式碼中，使用這個路徑來初始化 Firebase。
var admin = require('firebase-admin');
var serviceAccount = require('./my-first-project-1110913-firebase-adminsdk-qcepc-d4b6ea47ae.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my-first-project-1110913-default-rtdb.asia-southeast1.firebasedatabase.app'
});
let db = admin.firestore();

/**
 *
 * DEMO
 *
 */

// +++https://w3c.hexschool.com/blog/8a8d783c
// add data
// const FieldValue = admin.firestore.FieldValue;
// db.collection('students')
//   .add({
//     no: 6,
//     name: 'william',
//     regdate: FieldValue.serverTimestamp()
//   })
//   .then(function (docRef) {
//     console.log('新增成功，id 是' + docRef.id);
//   })
//   .catch(function (error) {
//     console.error('新增失敗原因： ', error);
//   });

// add document
// db.collection("students").doc("five").set([{
//     no: 6,
//     name: "william",
// }, {
//     no: 7,
//     name: "william",
// }]).then(function() {
//     console.log("新增成功");
// })

// get
var docRef = db.collection('students');
docRef.get().then(function (querySnapshot) {
  querySnapshot.forEach(function (doc) {
    console.log(doc.data());
  });
});

// search
// var docRef = db.collection("students");
// docRef.where("no","==",3).get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         console.log(doc.data());
//     });
// })

// update
// db.collection("students").doc("five").update({
//     no: 5,
//     name: "Jane"
// })
// db.collection("students").doc("RkfQTW44piVEynVBaygu").update({
//     no: 6,
//     name: "Jane"
// }).then(function() {
//     console.log("更新成功");
// })

// delete
// 要做邏輯刪除 假刪除 就是標記他是刪除 https://www.youtube.com/watch?v=VWCP2jidNi8&list=PLliocbKHJNwtMa0AaYC7w5SuwhpbtcP5u&index=6
// (async () => {
//   try {
//     await db.collection("students").doc("RkfQTW44piVEynVBaygu").delete();
//     console.log("刪除成功");
//   } catch (error) {
//     console.error("更新失敗原因：", error);
//   }
// })();

// 寫成函式去開關
