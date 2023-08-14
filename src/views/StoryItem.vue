<template>
  <div class="">
    <Loading :active="isLoading_big"></Loading>
    <div
      id="Ranking"
      class="d-flex justify-content-center align-items-center text-dark border-3 border-nbaBlue border-top pt-5 position-relative"
      style="margin-top: 104px !important"
    >
      <h2 class="d-md-block d-none">PLAYER</h2>
      <img
        src="@/assets/nbaWeb/Lovepik_com-401319703-basketball.png"
        height="80"
        alt="storylogo"
        class=""
      />
      <h2 class="d-md-block d-none">STORY</h2>
      <!--  -->
      <nav
        class="w-100 position-md-fixed position-absolute start-0 end-0 px-7"
        style="top: 20%"
        aria-label="Page navigation example"
      >
        <ul class="pagination w-100 d-flex justify-content-between">
          <li class="page-item">
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
          <li class="page-item">
            <a class="page-link" @click.prevent="storyIndex++" href="#">
              Next <i class="fa fa-caret-right" aria-hidden="true"></i
            ></a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container-xxl my-3">
      <p class="fs-6 text-pickBlack text-center mb-5">how to become the NBA all star player?</p>
      <!-- 球星個人列表 -->
      <main
        class="row row-cols-1 row-cols-xl-2 mx-md-2 g-xl-5 position-relative flex-xl-row flex-column-reverse"
      >
        <!-- 必填 -->
        <article class="col col-xl-8 mx-auto mb-xl-5">
          <div class="card shadow">
            <div class="card-body">
              <h2 class="fs-4 lh-xl fw-bold text-center">{{ story.title }}</h2>
              <small class="text-secondary text-end d-block w-100">
                {{ story.author + ' , ' + $filters.dateAndTime(this.story.create_at) }}
              </small>
              <p @click.prevent="handleClick" class="" v-html="story.description"></p>
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
                src="@/assets/nbaWeb/CYOKWOiUoAIJGu4.png"
                class="allstaritem_back img-fluid op-center of-cover"
                alt=""
              />
              <div @click.prevent="handleClick" class="card-body fs-6" v-html="story.content"></div>
              <a
                type="button"
                @click.prevent="getMerchandise()"
                class="btn btn-nbaBlue rounded-pill fs-4 btnRwd mx-auto mb-4 stretched-link"
                >Visit Merchandise</a
              >
            </div>
          </div>
        </aside>
      </main>
    </div>
  </div>
</template>
<script>
// import loginMixin from '../mixins/loginMixin';


export default {
  // mixins: [loginMixin],
  inject: ['emitter'],
  components: {},
  data() {
    return {
      story: {},
      isLoading_big: false,
      id: '',
      sentence: '',
      //
      storyIndex: null,
      isNotPrev: null,
      storyList: []
    }
  },
  created() {
    this.id = this.$route.params.storyId
    this.getStory()
  },
  mounted() {},
  watch: {
    storyIndex() {
      let id = null
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
    getStory(id = this.id) {
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
    getMerchandise() {
      const str = this.story.title.trim()
      const index = str.indexOf(' ')
      this.sentence = str.substring(0, index)
      // console.log(this.sentence); // 输出：Kobe bryant
      // this.emitter.emit('customEvent_search', this.sentence); //! 無法跳轉頁面傳遞值
      this.$router.push(`/products-view/products-content/${this.sentence}`)
    },
    getStoryList(page = 1) {
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/admin/articles/?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.storyList = res.data.articles
          // This code will create a new array  this.storyList  that contains only the items from  res.data.articles  where  isPublic  is  true .
          this.storyList = res.data.articles.filter((story) => story.isPublic)
          this.storyIndex = this.storyList.findIndex((obj) => obj.id === this.story.id)
          this.isNotPrev = !(this.storyIndex > 0)
        }
      })
    },
    handleClick(event) {
      if (event.target.tagName === 'A') {
        this.$swal
          .fire({
            // title: 'Are you sure remember it?',
            text: ' Do you agree to be directed to this link?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
          })
          .then((result) => {
            if (result.isConfirmed) {
              // window.location.href = event.target.href; // 转向链接
              window.open(event.target.href, '_blank').focus()
            }
          })
      }
    }
  }
}
</script>
<style scoped lang="scss">
* {
  // background-color: #aaa;
  .page-link:focus {
    background: transparent !important;
  }
}
</style>
