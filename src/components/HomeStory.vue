<template>
  <div class="">
    <!-- 銷售排行 -->
    <div id="Ranking" class="d-flex justify-content-center align-items-center mt-5">
      <h2>PLAYER</h2>
      <img src="../assets/nbaWeb/Lovepik_com-401319703-basketball.png" height="80" alt="sellLogo" class="" />
      <h2>STORY</h2>
    </div>
    <p class="fs-6 text-dark text-center mb-5">
      who is your favorite NBA player?
    </p>
    <!-- 目前的排版會感覺上下都沒有對齊，可先避免過多的水平間距調整 -->
    <section class="row row-cols-1 row-cols-lg-3 rank_card mx-2">
      <div class="col mb-5 mt-7 mb-lg-0" v-for="(item, index) in storyList.splice(0, 3)" :key="index"
        @click="getStory(item.id)">
        <div class="card" style="height: 424px">
          <img data-num="001" :src="item.imageUrl" data-aos="flip-left" :data-aos-duration="3000 + (index + 1 * 1000)"
            height="300" class="card-img-top of-none op-top position-absolute mt-n5" alt="..." />
          <div data-num="001" class="img_back img_back_kobe"></div>
          <div class="card-body">
            <h3 class="card-title fw-bold fs-6">{{ item.title }}</h3>
            <p class="card-text fs-6 multiline-ellipsis" v-html="item.description">
            </p>
            <button
              class="text-decoration-none stretched-link text-dark rank_a d-flex justify-content-center bg-transparent">MORE</button>
          </div>
        </div>
      </div>
    </section>
    <div class="text-center">
      <router-link to="/story/list" class="btn btn-outline-dark rounded-pill my-5 fs-5 sellbtn_Rwd">
        MORE LISTS
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      storyList: []

    };
  },
  created () {
    this.getStoryList();
  },
  methods: {
    getStoryList (page = 1) {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/articles/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.storyList = res.data.articles.filter(story => story.isPublic);
        }
      });
    },
    getStory (id) { //! 只取一個
      this.$router.push(`/story/item/${id}`);
    }
  }

};
</script>
<style>
.single-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 50%;
}

.multiline-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  /*  有寬度才能多行  */
  width: 100%;
}
</style>
