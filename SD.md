## 安裝vite

類CLI環境 但有VITE
npm create vue@latest
https://github.com/vuejs/create-vue
內含

- pinia
- prettier
- vitest (cypress版推薦)
- eslint
- hotload
- @ = src
  需
  npm dependencies 上述沒有的
  npm i -D sass

複製各種檔案
改.env import.meta.env.VITE_APP_API

npm run dev看缺什麼

## x 產品有灰底

## x 無法登入 有BUG

## com化

改寫成compositon API
改homeview中、producList、cartList

> 先改成pinia 再說

## pinia化

有用到eimtter，都要統一狀態：
登入（每個視圖層
購物車 （側邊、結帳頁、商品列表和內頁
收藏 （側邊、商品列表、商品內頁
搜尋商品（商品列表、搜尋欄
文章周邊商品（商品列表、搜尋欄

## 元件分類資料夾

## 修改router

用import
簡單路徑
