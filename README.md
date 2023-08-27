# JTown | THE BIGGEST NBA STORE

## 簡介

JTown （Jersey Town） 是提供 NBA 球衣和商品的商店。
使用 Vue.js 生態系統，開發過程中提供高效的工具和擴增彈性。

## GitHub Pages

[JTown | THE BIGGEST NBA STORE](https://snowman12320.github.io/jtown-vite/#/).

## 網頁說明

- 響應式設計：能夠適應不同大小的屏幕和設備，提供良好的用戶體驗。

<img src="/src/assets/nbaWeb/1693139126056.jpg" alt="GitHub" title="GitHub,Social Coding" width="auto" height="300" />
<img src="/src/assets/nbaWeb/1693138968357.jpg" alt="GitHub" title="GitHub,Social Coding" width="70%" height="auto" />


---

- 商品展示：直觀和易於瀏覽的展示界面，通過分類、搜索和排序來找到所需商品。
  <img src="/src/assets/nbaWeb/1693139494129.jpg" alt="GitHub" title="GitHub,Social Coding" width="70%" height="auto" />

---

- 商品詳情：點擊商品列表中的商品，獲取更多商品信息，包括圖片、價格、庫存狀態等。
  <img src="/src/assets/nbaWeb/1693140431225.jpg" alt="GitHub" title="GitHub,Social Coding" width="70%" height="auto" />

---

- 購物車：將感興趣的商品添加到購物車中，結算時查看和編輯購物車內容。

  <img src="/src/assets/nbaWeb/1693139621982.jpg" alt="GitHub" title="GitHub,Social Coding" width="30%" height="auto" />

---

- 註冊和登錄：可註冊帳號，或使用現有的帳號登錄。登錄後，可以查看訂單歷史記錄、編輯個人信息等。
  <img src="/src/assets/nbaWeb/1693139526031.jpg" alt="GitHub" title="GitHub,Social Coding" width="70%" height="auto" />

---

- 訂單管理：在網站上下訂單，選擇支付方式並填寫送貨地址。用戶可以查看和管理自己的訂單。
  <img src="/src/assets/nbaWeb/1693139561360.jpg" alt="GitHub" title="GitHub,Social Coding" width="70%" height="auto" />

---

- 後台管理：提供後台管理界面，供商家管理商品、處理訂單等操作。
  <img src="/src/assets/nbaWeb/1693140809939.jpg" alt="GitHub" title="GitHub,Social Coding" width="70%" height="auto" />

</br>
</br>
</br>

## 安裝環境

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

## 程式說明

> 生態系應用：

- [x] "Vue Router" 實現單頁應用程序的路由功能，使用戶可以無需重新加載頁面，而是通過動態更改 URL 來切換不同的頁面，提供更流暢的瀏覽體驗。

- [x] "Pinia" 取代 "Mitt" 提供集中式狀態存儲，用於管理所有組件的狀態，具有類似於 Vuex 的 API，但使用 Vue 3 新功能 Composition API，使不同組件之間共享數據變得更加簡單和高效。

- ~~"Mitt" 是一個簡單的事件發布庫，在應用程序中進行組件之間的通信，提供簡單的 API，用於註冊事件監聽器、觸發事件。Mitt 適用較小的應用程序，組件之間的通信相對簡單。~~

- [x] "Vite" 是一個較新的開發工具，提供快速的開發環境，使用 ES 模塊作為開發時的原始碼格式，使熱重載和冷啟動非常快，支持 Vue 3 的新功能 Composition API 和片段模板。

- ~~"Vue CLI" 快速搭建和開發應用程序，提供的開發環境，包括熱重載、代碼打包和優化功能，使得開發能夠更輕鬆構建和部署網站。~~

> 框架應用：

- Options API：輕鬆管理全域狀態，簡單的語法來設置和讀取選項值。提供組織代碼的方式，使代碼更易於維護和測試。
<!-- - Composition API：提供新的方式來組織和重用組件。相較 Options API，更加靈活且易於維護。允許相關邏輯組織一起，並在不同的組件之間進行重用。 -->

- Directives：在 HTML 模板中使用，控制組件的行為和顯示，例如 v-if、v-for、v-bind、v-on 等。
  Expressions：雙大括號 {{}} 包裹表達式，在 HTML 模板中使用動態生成內容。
  Reactive：Vue 的響應式系統允許在組件中定義響應式數據屬性。當數據發生變化時，相應的 UI 部分將自動更新。

- computed：可以根據數據的變化來動態生成衍生數據。

- watch：在數據發生變化時執行自定義邏輯。可以通過監聽器來觸發特定的操作。

- Lifecycle：提供生命週期函數，可以在組件不同生命週期階段執行代碼。

- Props：向內層元件傳遞資料狀態，從父元件傳遞，子元件使用這些資料來顯示或執行相應的操作。
- prop 驗證機制：確保父元件傳遞的資料符合特定的型別和條件。

- Slot：可以在父元件中插入子元件的內容。讓父元件控制子元件的外觀和行為。
  Slot Props：資料從父元件傳遞給子元件中的 Slot，子元件可以使用這些資料來自定義 Slot 的內容。

- vee-validation：表單驗證套件，用於驗證和處理表單輸入的資料。

- localStorage：瀏覽器提供的 API，用於在瀏覽器中儲存和讀取資料，資料會一直保存在用戶的瀏覽器中，即使瀏覽器被關閉。

- refs：Vue 提供的特殊屬性，可以用於獲取和操作 DOM 元素。

- provide：Vue 提供的跨層級資料傳遞方式，父元件使用 provide 提供資料，子元件使用 inject 接收這些資料。

- mixin：mixin 是 Vue 提供的元件重用機制，將通用的方法和屬性提取出來，並混合到多個元件中使用。

- directive：Vue 的自訂義指令可以用於對 DOM 元素進行操作和監聽事件。

- Emit：事件觸發機制，在子元件中觸發事件並向外層元件傳遞資料。
- Emits：用於驗證向外層傳遞的事件的資料型別和參數。

- element plus：基於 Vue 的 UI 庫，提供一系列常用的 UI 元件和工具，可以用於快速構建漂亮的網頁界面。

- plugins：擴充插件用於擴展 Vue 的功能，通過 Vue.use()方法來安裝和使用這些插件。

## 相關技術

| JS   | CSS       | other        |
| ---- | --------- | ------------ |
| ES6+ | SCSS/SASS | Vue-devtools |
|      | RWD       | Webpack      |
|      | Bootstrap | npm          |
|      |           | Eslint       |

## 學習目標：

- Vitest
- Vue-Tsc
- Nuxt.js
