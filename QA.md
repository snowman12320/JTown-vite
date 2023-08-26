# //////////////////提問//////////////////////////

---

https://github.com/snowman12320/jtown-vite/tree/pinia
助教好，我遇到問題~

## 這是什麼？

client.ts:115 ReferenceError: Cannot access 'CartOffcanvas' before initialization
at Header.vue:8:5

[hmr] Failed to reload /src/components/CartOffcanvas.vue. This could be due to syntax errors or importing non-existent modules. (see errors above)

出现了一个关于热模块重载（HMR）的错误，可能是由于语法错误或导入不存在的模块引起的。这通常是在开发Vue.js应用程序时遇到的问题。以下是您可以尝试的一些解决方法：
检查语法错误：首先，确保您的Vue文件（如CartOffcanvas.vue和FavoriteOffcanvas.vue）中没有语法错误。您可以检查控制台输出或开发者工具中的错误消息，以获取有关具体错误的更多信息。
检查模块路径：确保您在导入模块时使用正确的路径。检查导入语句是否正确，路径是否正确。
清除缓存：有时候，开发服务器可能会因为缓存问题而导致错误。尝试清除浏览器缓存，或者重启开发服务器，看看是否有所改善。

## Q： 關於 useFavoriteStore.js

無法使用this.$refs.delModal 這段語法，去操作dom元素，只好改到FavoriteOffcanvas.vue中

```
    delFavorite(id) {
      //* 搜尋目標
      if (this.favoriteIds.indexOf(id) !== -1) {
        //* 存在就刪除
        this.favoriteIds.splice(this.favoriteIds.indexOf(id), 1)
        localStorage.setItem('favorite', JSON.stringify(this.favoriteIds))
        this.getFavorite()
      }
      const delCp = this.$refs.delModal
      delCp.hideModal()
    },
```

> A：pinia 是一個狀態管理的工具
> 意指它本身是用來解決原先跨元件狀態存取的問題
> 按照這個思路去想的話
> 會發現 store 需要存的是"需要共用的狀態"
> 而 actions 則是改變這個狀態的 method
> 因此你不需要在 store 使用 $refs
> 更像是在 FavoriteOffcanvas.vue 有一個 delFavorite 的 method
> 當它需要改變 store 狀態的時候呼叫 action

## Q:回覆 在 store 的 js，如何使用 $refs

依照建議"不需要在 store 使用 $refs"
我將刪除的邏輯拆出來，就是delFavorite_store 放在store中，其餘用this.$refs操作彈窗開關，留在vue中
請問我這樣的理解沒錯嗎?

```
    delFavorite(id) {
      this.delFavorite_store(id)
      //
      const delCp = this.$refs.delModal
      // 通过属性选择器获取具有 data-ref="delModal" 属性的 DOM 元素 > 只能取到dom但沒有方法 (不是proxy)
      // let delCp = document.querySelector('[data-ref="delModal"]')
      delCp.hideModal()
    },
```

## Q：回覆addToCart 的 $swal 和 $toast 失效

1.這樣若邏輯有很多if，要觸發多次$swal(如addToCart這個函式)，這樣都要拆分出來嗎???
會不會變更複雜，邏輯都被拆開了呢?

我這邊另一個理解是，addToCart方法，不是整個丟進store，而是把關鍵的API那段，就是觸發購物車資料更新的放進去即可，
應該是這樣沒錯吧 ? 2. "toast 跟 swal 都是掛在 Vue 的 app 上，與 store 沒有任何關聯"
但axios和router都有掛載到app上，可是我在store，是直接引入套件本身，是正常使用的
所以在store不能使用那些套件囉?
就只能放在vue使用，像第一點一樣，只有改變狀態的方法，才能放store

## Q : 關於 useCartStores.js

將addTocart.js轉成pinia統一管理"加入購物車方法" ( 取代emitter跨元件溝通 )
在productList測試，觸發useCartStores中addToCart，$swal和$toast會失效，
猜測是不支援較新的vite? 還是寫法哪邊要調整呢?
// ? 兩種方式都無法
// this.$swal.fire('Please', ' Sign in or Sign up first.', 'warning')
// VueSweetalert2.fire('Please', 'Sign in or Sign up first.', 'warning')
// this.$toast('success', 'delete favorite.')

## Q：VUE CLI和VITE有哪些寫法比較大的差別

比如：
引入路經少了@的寫法，變成直接寫最外層資料夾名稱的樣子 ?

> 感覺用create vue 安裝後就沒有了，沒有噴@引入元件的錯誤
>
> 套件冷門的都會噴錯
> prductModal 兩個套件引入內部檔案都有問題
> https://github.com/SortableJS/vue.draggable.next

## 選項式改成組合式的建議路徑

如題去修改專案，有點不知道從何下手
有從storyView簡單的部分開始

元件如何引用
有類似範本專案可以參考嗎
或很明顯的坑，比較容易忽略的
因為是寫法的問題 我通常都直接參考先人的寫法
這是我自己實測學習最快的方式 透過修改實際了解邏輯

從最底層邏輯開始改 不要從view曾 因為包太多東西

option API 重構成 composiition API
https://codesandbox.io/s/converting-options-api-to-composition-api-forked-q5ows?file=/src/App.vue
https://ithelp.ithome.com.tw/users/20125854/ironman/4112?page=1

# //////////////////解決///////////////////////

## x Q : 關於 useLoginStore.js

我嘗試將loginMixin改成pinia統一管理"登入狀態" ( 取代mixin混用方法 )
在homeView測試，會出現 isLoading 和 inLogin ，was accessed during render but is not defined on instance.
猜測是created(）時，同步載入和使用導致錯誤，使用非同步還是無法
也有試過此寫法...mapActions(useLoginStore, ['checkLoginStatus']),

> 要 mapState

## x storysModal 報錯

Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.
依照指令下載後還是噴錯
https://stackoverflow.com/questions/74731469/laravel-vuejs-vite-failed-to-parse-source-for-import-analysis-because-the-conte

## x 部屬vite

沒有原始檔控制的功能，我記得是vscode內建的，但我之前洩載vscode的git套件就無法使用該功能，只能使用其他git 套件管理
我是用git pull下來的，已經有git儲存酷
還是說需要重複創建儲存酷git init > git add ...

> 爬過幾篇文章都是說git pull下來有git init就可以出現原始控制功能
> 或輸入git init 產生儲存庫
> 都沒用 直接用儲存庫和sh方式

## x abs()函式

Q：在App.vue中
@import '@/assets/main.scss';
Scss引入會產生錯誤，關於使用abs()函式，但找不到此函式位置

嘗試用VSCODE套件直接編譯scss檔案，並引入main.css即可使用

> 改用SFC元件中的SCSS > 若是pages 或 function 中的就直接引入該元件中，去使用

參考：
SASS官方錯誤訊息
https://sass-lang.com/documentation/breaking-changes/abs-percent/
vite引入scss教學
https://www.jianshu.com/p/eb210e72b898
https://ithelp.ithome.com.tw/articles/10301528

> 用套件編譯 > 重開別的scss去編譯分頁和新增

# //////////////////文件說明///////////////////////

## 1. SPA (Single Page Application):

SPA是指单页应用程序，它是一种Web应用程序的架构模式。在SPA中，整个应用程序只有一个HTML页面，页面的内容通过JavaScript动态加载和更新，实现页面的无刷新切换。SPA的好处是能够提供更流畅的用户体验，减少了页面的刷新，同时也提高了应用程序的性能。

## 2. SFC (Single File Component): SFC是指单文件组件，它是Vue.js框架中的一种组件化开发方式。在SFC中，一个组件的所有代码（包括HTML模板、CSS样式和JavaScript代码）都被封装在一个单独的文件中。这种方式使得组件的开发更加模块化和可维护，同时也提高了开发效率。

总结：

- SPA是一种Web应用程序的架构模式，它通过JavaScript动态加载和更新页面内容，实现无刷新切换页面的效果。
- SFC是Vue.js框架中的一种组件化开发方式，它将一个组件的所有代码封装在一个单独的文件中，提高了组件的开发效率和可维护性。

## 3.SSR (Server-Side Rendering):

SSR是指服务器端渲染，它是一种将页面的渲染工作从客户端转移到服务器端的技术。在传统的SPA中，页面的渲染是由客户端的JavaScript完成的，而在SSR中，服务器在接收到请求后，会先进行页面的渲染，然后将渲染好的页面发送给客户端。这样做的好处是可以提供更好的首次加载性能和SEO优化，但也增加了服务器的负载。

SSR是一种将页面的渲染工作从客户端转移到服务器端的技术，通过在服务器端进行页面的渲染，可以提供更好的首次加载性能和SEO优化。

## 4.另一种与SPA相对的应用程序类型是MPA（Multi-Page Application），也称为多页应用程序。以下是对MPA的解释和特点的條列说明：

MPA (Multi-Page Application): MPA是指多页应用程序，它是一种传统的Web应用程序架构模式。在MPA中，每个页面都是一个独立的HTML文件，每次用户与应用程序交互时，都会通过服务器加载一个新的HTML页面。这意味着每次页面切换都会导致整个页面的刷新，因此会有较长的加载时间和页面闪烁的问题。

特点：

- 多页应用程序由多个独立的HTML页面组成，每个页面对应一个特定的功能或页面。
- 每次用户与应用程序交互时，都会通过服务器加载一个新的HTML页面，导致整个页面的刷新。
- 页面切换会有较长的加载时间和页面闪烁的问题。
- MPA通常需要更多的服务器请求和网络传输，因为每个页面都需要单独加载。

与SPA相比，MPA的主要区别在于页面的加载方式和用户体验。SPA通过动态加载和更新页面内容，实现了无刷新切换页面的效果，提供了更流畅的用户体验。而MPA每次页面切换都需要重新加载整个页面，用户体验相对较差。然而，MPA在某些情况下仍然有其优势，特别是在SEO和初始加载性能方面。

---

## gitpages vite (可checkout -b main)

<!-- #!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd - -->

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

---

## try 和 async 是 JavaScript 中的兩個不同概念，它們不是相互依賴的

- try / catch：
  try 和 catch 是 JavaScript 中的錯誤處理機制。您可以使用 try 區塊來執行可能會拋出錯誤的程式碼，並使用 catch 區塊來捕捉和處理這些錯誤。如果在 try 區塊中的程式碼拋出了錯誤，執行將立即跳轉到相應的 catch 區塊。這樣可以避免整個應用程序因為錯誤而崩潰。

- async / await：
  async 函式是一種特殊類型的函式，它允許在函式內部使用 await 關鍵字來暫停執行，等待一個 Promise 解析為值。這樣可以實現更易讀和更具同步風格的異步程式碼。await 關鍵字僅在 async 函式內部有效。

* then 和 async 和 try都是異步處理
then是舊寫法
async是新的，避免回調地獄
都可以使用try>catch>finally

## .then 格式是使用 Promise 的傳統異步語法

使用了 .then 和 .catch，以及 .finally 方法來處理異步操作。請注意，使用 async/await 通常更容易讀寫和理解，因為它提供了一個更接近同步的程式碼結構，可以避免回調地獄和錯綜複雜的 Promise 鏈。
<!-- 
    async checkLoginStatus() {
    this.isLoading = true
    const token = document.cookie.replace(/(?:(?:^|._;\s_)hexToken\s*=\s*([^;]_)._$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
      const api = `${import.meta.env.VITE_APP_API}api/user/check`

      try {
        const response = await axios.post(api, this.user)
        if (!response.data.success) {
          this.isLogin = false
          if (localStorage.getItem('VIP')) this.isLogin = true
        } else {
          this.isLogin = true
        }
      } catch (error) {
        console.error('Error checking login status:', error)
        this.isLogin = false
      } finally {
        this.isLoading = false
      }
    } -->
