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



