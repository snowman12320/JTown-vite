# //////////////////提問//////////////////////////

https://codesandbox.io/s/converting-options-api-to-composition-api-forked-q5ows?file=/src/App.vue
https://ithelp.ithome.com.tw/users/20125854/ironman/4112?page=1
> option API 重構成 composiition API
## 選項式改成組合式的建議路徑
如題去修改專案，有點不知道從何下手
有從storyView簡單的部分開始

元件如何引用
有類似範本專案可以參考嗎
或很明顯的坑，比較容易忽略的
因為是寫法的問題 我通常都直接參考先人的寫法
這是我自己實測學習最快的方式 透過修改實際了解邏輯

從最底層邏輯開始改 不要從view曾 因為包太多東西


## Q:關於loginMixin
為何取不到這兩個變數
    const isLoading = ref(false) 
    const isLogin = ref(null)
在首頁開啟都說not define，我有return
test

## 差別

Q：VUE CLI和VITE有哪些寫法比較大的差別
比如：
引入路經少了@的寫法，變成直接寫最外層資料夾名稱的樣子 ?

> 感覺用create vue 安裝後就沒有了，沒有噴@引入元件的錯誤
>  @ is an alias to /src
>
> 套件冷門的都會噴錯
> prductModal 兩個套件引入內部檔案都有問題
https://github.com/SortableJS/vue.draggable.next

# //////////////////解決///////////////////////

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

2. SFC (Single File Component): SFC是指单文件组件，它是Vue.js框架中的一种组件化开发方式。在SFC中，一个组件的所有代码（包括HTML模板、CSS样式和JavaScript代码）都被封装在一个单独的文件中。这种方式使得组件的开发更加模块化和可维护，同时也提高了开发效率。

总结：

- SPA是一种Web应用程序的架构模式，它通过JavaScript动态加载和更新页面内容，实现无刷新切换页面的效果。
- SFC是Vue.js框架中的一种组件化开发方式，它将一个组件的所有代码封装在一个单独的文件中，提高了组件的开发效率和可维护性。

  3.SSR (Server-Side Rendering): SSR是指服务器端渲染，它是一种将页面的渲染工作从客户端转移到服务器端的技术。在传统的SPA中，页面的渲染是由客户端的JavaScript完成的，而在SSR中，服务器在接收到请求后，会先进行页面的渲染，然后将渲染好的页面发送给客户端。这样做的好处是可以提供更好的首次加载性能和SEO优化，但也增加了服务器的负载。

SSR是一种将页面的渲染工作从客户端转移到服务器端的技术，通过在服务器端进行页面的渲染，可以提供更好的首次加载性能和SEO优化。

4.另一种与SPA相对的应用程序类型是MPA（Multi-Page Application），也称为多页应用程序。以下是对MPA的解释和特点的條列说明：
MPA (Multi-Page Application): MPA是指多页应用程序，它是一种传统的Web应用程序架构模式。在MPA中，每个页面都是一个独立的HTML文件，每次用户与应用程序交互时，都会通过服务器加载一个新的HTML页面。这意味着每次页面切换都会导致整个页面的刷新，因此会有较长的加载时间和页面闪烁的问题。

特点：

- 多页应用程序由多个独立的HTML页面组成，每个页面对应一个特定的功能或页面。
- 每次用户与应用程序交互时，都会通过服务器加载一个新的HTML页面，导致整个页面的刷新。
- 页面切换会有较长的加载时间和页面闪烁的问题。
- MPA通常需要更多的服务器请求和网络传输，因为每个页面都需要单独加载。

与SPA相比，MPA的主要区别在于页面的加载方式和用户体验。SPA通过动态加载和更新页面内容，实现了无刷新切换页面的效果，提供了更流畅的用户体验。而MPA每次页面切换都需要重新加载整个页面，用户体验相对较差。然而，MPA在某些情况下仍然有其优势，特别是在SEO和初始加载性能方面。

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
