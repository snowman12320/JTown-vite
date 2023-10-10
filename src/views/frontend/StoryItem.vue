<script>
import productStore from '@/stores/productStore'
import { mapActions } from 'pinia'
export default {
  components: {},
  data() {
    return {
      isLoading_big: false,
      //
      story: {},
      productListId: '',
      //
      storyIndex: null,
      isNotPrev: null,
      isNotNext: null,
      storyList: [],
      //
      sentence: ''
    }
  },
  created() {
    // console.clear()
    this.productListId = this.$route.params.storyId
    this.getStory()
    //
  },
  watch: {
    storyIndex() {
      let id = null //*切換文章內頁的當前目標
      if (this.storyIndex > this.storyList.length - 1) {
        this.storyIndex = 0
        id = this.storyList[this.storyIndex].id
        this.$router.push(`/story/item/${id}`)
        this.getStory(id)
      } else {
        id = this.storyList[this.storyIndex].id
        this.$router.push(`/story/item/${id}`)
        this.getStory(id)
      }
    }
  },
  methods: {
    ...mapActions(productStore, ['setCacheSearch']),
    //
    getMerchandise() {
      const str = this.story.title.trim()
      const index = str.indexOf(' ')
      this.sentence = str.substring(0, index) // 输出：Kobe bryant
      this.$router.push(`/products-view/products-content/${this.sentence}`)
      this.setCacheSearch(this.sentence)
    },
    //
    getStory(id = this.productListId) {
      //! 只取一個
      this.isLoading_big = true
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/article/${id}`
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading_big = false
          if (res.data.success) {
            this.story = res.data.article
            this.getStoryList() //! 要在此接著非同步執行，不然會抓不到id
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    // 製作分頁切換使用
    getStoryList(page = 1) {
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/articles/?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.storyList = res.data.articles
          this.storyList = res.data.articles.filter((story) => story.isPublic)
          this.storyIndex = this.storyList.findIndex((obj) => obj.id === this.story.id)
          this.isNotPrev = !(this.storyIndex > 0)
          this.isNotNext = this.storyIndex == this.storyList.length - 1
        }
      })
    },
    //
    handleClick(event) {
      if (event.target.tagName === 'A') {
        this.$swal
          .fire({
            text: ' Do you agree to be directed to this link?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.open(event.target.href, '_blank').focus()
            }
          })
      }
    }
  }
}
</script>

<template>
  <div>
    <Loading :active="isLoading_big"></Loading>
    <div
      id="Ranking"
      class="d-flex justify-content-center align-items-center text-dark border-3 border-nbaBlue border-top pt-5 position-relative"
      style="margin-top: 104px !important"
    >
      <h2 class="d-md-block d-none">PLAYER</h2>
      <img
        src="@/assets/image/nbaWeb/Lovepik_com-401319703-basketball.png"
        height="80"
        alt="storylogo"
      />
      <h2 class="d-md-block d-none">STORY</h2>
      <!--  -->
      <nav
        class="w-100 position-md-fixed position-absolute start-0 end-0 px-7"
        style="top: 20%"
        aria-label="Page navigation example"
      >
        <ul class="pagination w-100 d-flex justify-content-between">
          <li class="page-item" :class="{ disabled: isNotPrev }">
            <a
              class="page-link"
              :class="{ disabled: isNotPrev }"
              :disabled="isNotPrev"
              @click.prevent="storyIndex--"
              href="#"
            >
              <i class="fa fa-caret-left" aria-hidden="true"></i> Prev
            </a>
          </li>
          <li class="page-item" :class="{ disabled: isNotNext }">
            <a
              class="page-link"
              :class="{ disabled: isNotNext }"
              :disabled="isNotNext"
              @click.prevent="storyIndex++"
              href="#"
            >
              Next <i class="fa fa-caret-right" aria-hidden="true"></i
            ></a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container-xxl my-3">
      <p class="fs-6 text-pickBlack text-center mb-5">how to become the NBA all star player?</p>
      <main
        class="row row-cols-1 row-cols-xl-2 mx-md-2 g-xl-5 position-relative flex-xl-row flex-column-reverse"
      >
        <article class="col col-xl-8 mx-auto mb-xl-5">
          <div class="card shadow">
            <div class="card-body">
              <h2 class="fs-4 lh-xl fw-bold text-center">{{ story.title }}</h2>
              <small class="text-secondary text-end d-block w-100">
                {{ story.author + ' , ' + $filters.dateAndTime(this.story.create_at) }}
              </small>
              <button @click.prevent="handleClick" v-html="story.description"></button>
              <!--  -->
              <div class="my-3 d-flex gap-3">
                <el-tag class="ml-2" type="info">#NBA</el-tag>
                <el-tag class="ml-2" type="info">#ALL STAR</el-tag>
                <el-tag class="ml-2" type="info">#TORONTO</el-tag>
              </div>
            </div>
          </div>
        </article>
        <aside class="col col-xl-4 sticky-xl-top align-self-start" style="z-index: 5; top: 100px">
          <div class="small_card">
            <div class="card mb-5 text-center text-xl-start">
              <img
                data-num="001"
                :src="story.imageUrl"
                height="424"
                class="of-cover w-100 op-top position-absolute pt-3"
                alt="..."
              />
              <img
                src="@/assets/image/nbaWeb/CYOKWOiUoAIJGu4.png"
                class="allstaritem_back img-fluid op-center of-cover"
                alt="CYOKWOiUoAIJGu4"
              />
              <button
                @click.prevent="handleClick"
                class="card-body fs-6"
                v-html="story.content"
              ></button>
              <a
                type="button"
                @click.prevent="getMerchandise()"
                class="btn btn-nbaBlue rounded-pill fs-4 btnRwd mx-auto mb-4"
                >Visit Merchandise</a
              >
            </div>
          </div>
        </aside>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  // background-color: #aaa;
  .page-link:focus {
    background: transparent !important;
  }
}

.disabled {
  cursor: not-allowed !important;
}

button {
  border: none;
  background: #fff;
}
</style>
