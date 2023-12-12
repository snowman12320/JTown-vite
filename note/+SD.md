## x 產品有灰底

## x 無法登入 有BUG

## x 修正cli問題 > 成功的版本號是@next 或最新的

E+ 替代方案：
拖曳
https://element.eleme.io/#/zh-CN/component/tree#ke-tuo-zhuai-jie-dian
標籤下拉新增
https://element.eleme.io/#/zh-CN/component/select
不行就註解>詢問時提供cli那頁的連結

## com化

改寫成compositon API
改homeview中、producList、cartList

> 先改成pinia 再說

## pinia化

有用到eimtter，都要統一狀態：
x 登入（每個視圖層
x 購物車 （側邊、結帳頁、商品列表和內頁、數量
x 收藏 （側邊、商品列表、商品內頁、數量
x 搜尋商品（統一商品列表、搜尋欄統一操作 ，看是否修正 搜尋完商品後第一次按分類篩選會失敗
x 文章周邊商品（ 透過人物名稱 改變商品列表狀態
x store有用到this 都要重拆細分
x 後台資料會用到 > this.emitter.emit('push-message 改成共用狀態
x 拿掉
inject: ['emitter'], / provide()

x 留言板由上新增 側邊預先展開
x isloading 分大小 >
store 固定 small和big，> vue內就用 獨立變數去操作 獨立動畫html > 分一般大小和store大小 (例如isLoading_big_product)


x 一鍵部屬vite > sh deploy.sh
## - 元件分類資料夾

如vite官方安裝時的範本

> 之後專案分 後台和前台 或 細分種類(產品/故事等)

> 判斷路由 動態元件 : 減少視圖層 且將元件分類到資料夾 包含再細分成插槽減少重複元件 （插槽也分類到資料夾）

## - 修改router

統一上方import 避免攏長影響閱讀
改名成 簡單路徑名稱 為了引用方便

> 刪掉無用的即可

## - CKEditor 5 為何不能放影片和圖片

是因為文章api的限制嗎
＊影片沒顯示
＊圖片報䥘原因
https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html#error-filerepository-no-upload-adapter

教學 (要設定header之類 可能需後端協助 且應該是要先上傳時轉檔formData後觸發上傳API，然後轉成圖片網址，再存回該上傳的文章內頁個別資料)
https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html

https://stackoverflow.com/questions/39290712/ckeditor-is-not-uploading-images-and-files-even-i-have-no-option-to-upload-imag
https://www.wfublog.com/2017/11/web-wysiwyg-text-editor-ckeditor.html
https://ithelp.ithome.com.tw/articles/10198816

測試用影片https://www.youtube.com/watch?v=_vFuDQ_6Xt8

 #  ///////////////////////////////////////////////#region//////////////////////////////////////////////
// #region
// it('Does not do much!', () => {
//   expect(true).to.equal(true);
// });
// it('visits root url', () => {
//   cy.visit('http://localhost:5173/');
// });
// #endregion


### //// firebase ///
1.安裝
這段程式碼是用來設定和部署 Firebase 專案的。Firebase 是一個 Google 的雲端開發平台，提供了許多如資料庫、身份驗證、雲端函式等功能。

首先，sudo npm install -g firebase-tools 這行指令是用來全域安裝 Firebase CLI（命令列介面）的工具。sudo 是在 Linux 和 macOS 系統中用來執行需要管理員權限的指令，npm install -g 則是 Node.js 的套件管理器 npm 的指令，用來全域安裝套件。
> Windows 要安裝兩次

接著，firebase --version 這行指令是用來確認你已經成功安裝 Firebase CLI，並顯示其版本號。

然後，firebase login 這行指令會開啟一個新的瀏覽器視窗，讓你登入 Google 帳號以連接到 Firebase。如果你在無法開啟瀏覽器的環境（例如遠端伺服器），則可以使用 firebase login --no-localhost 這行指令來登入。

firebase projects:list 這行指令會列出你所有的 Firebase 專案。

firebase init 這行指令會初始化一個新的 Firebase 專案或將現有的專案連接到 Firebase。在這個過程中，它會讓你選擇要使用的 Firebase 功能（例如 Firestore、Functions 等），並創建相應的設定檔。
> 就是一些設定黨，像git init

最後，firebase deploy 這行指令會將你的專案部署到 Firebase。這包括上傳你的網站資源、設定雲端函式、設定資料庫規則等等。


2. 運行
firebase serve --only hosting --project=default 

部屬實際網址
firebase deploy  --project=default 

new site 
firebase deploy --only hosting:jtown-vite

[1.1]
x npm install firebase-admin --save
firebase-admin 是 Firebase 提供的一個 Node.js 套件，它允許你在伺服器端訪問 Firebase 的所有功能，包括 Authentication、Firestore、Cloud Storage 等。
由於你正在使用 Vue.js，你可能會在你的 Vue.js 應用程式中使用這個套件來與 Firebase 進行互動。

npm install firebase
這個錯誤是因為 npm 快取資料夾中有一些檔案的擁有者是 root，這是 npm 之前版本的一個 bug。你可以透過以下的指令來修正這個問題：
"sudo chown -R 501:20 "/Users/william/.npm"
這個指令會將 "/Users/william/.npm" 資料夾及其所有子檔案的擁有者改為使用者 ID 501 和群組 ID 20。請確認這些 ID 是你的使用者 ID 和群組 ID。你可以透過 id -u 和 id -g 指令來查詢你的使用者 ID 和群組 ID。


### //// 資料庫 ///

### //// 驗證身分 / 會員系統 ///

### //// 發送信件 ///

### //// 儲存圖片資源 ///
