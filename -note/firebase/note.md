
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
