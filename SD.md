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
x登入（每個視圖層

x購物車 （側邊、結帳頁、商品列表和內頁、數量

x收藏 （側邊、商品列表、商品內頁、數量

搜尋商品（統一商品列表、搜尋欄統一操作 ，看是否修正 搜尋完商品後第一次按分類篩選會失敗

文章周邊商品（ 透過人物名稱 改變商品列表狀態

x 留言板由上新增 側邊預先展開

isloading 分大小

> store 固定 small和big，
> vue內就用 獨立變數去操作 獨立動畫html

## x 元件分類資料夾

如vite官方安裝時的範本

> 之後專案分 後台和前台 或 細分種類(產品/故事等)

## x 修改router

統一上方import 避免攏長影響閱讀
改名成 簡單路徑名稱 為了引用方便

> 刪掉無用的即可

##

為何不能放影片和圖片
是因為文章api的限制嗎
＊影片沒顯示
＊圖片報䥘原因
https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html#error-filerepository-no-upload-adapter

教學
https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html

https://stackoverflow.com/questions/39290712/ckeditor-is-not-uploading-images-and-files-even-i-have-no-option-to-upload-imag
https://www.wfublog.com/2017/11/web-wysiwyg-text-editor-ckeditor.html
https://ithelp.ithome.com.tw/articles/10198816

測試用影片https://www.youtube.com/watch?v=_vFuDQ_6Xt8
