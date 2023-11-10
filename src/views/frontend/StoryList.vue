<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: ['StoryList'],
  components: {
    Pagination
  },
  data() {
    return {
      storyList: [],
      pagination: {}
    };
  },
  created() {
    this.getStoryList();
  },
  methods: {
    getStoryList(page = 1) {
      const api = `${import.meta.env.VITE_APP_API}api/${
        import.meta.env.VITE_APP_PATH
      }/articles/?page=${page}`;

      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.storyList = res.data.articles.filter((story) => story.isPublic);
          this.pagination = res.data.pagination;
        }
      });
    },
    getStory(id) {
      this.$router.push(`/story/item/${id}`);
    }
  }
};
</script>

<template>
  <div>
    <LoadingMask :active="isLoading" />
    <div class="my-8 pt-6">
      <div id="Ranking" class="d-flex justify-content-center align-items-center">
        <h2 class="text-pickBlack">PLAYER</h2>
        <img
          src="@/assets/image/nbaWeb/Lovepik_com-401319703-basketball.png"
          height="50"
          alt="sellLogo"
        />
        <h2 class="text-pickBlack">STORY</h2>
      </div>
      <p class="fs-6 text-secondary text-center mb-5">Who is your favorite NBA player?</p>
    </div>
    <div class="container-xxl">
      <section class="row row-cols-1 row-cols-lg-3 rank_card mx-2">
        <div
          class="col mb-5 mt-7 mb-lg-0"
          v-for="(item, index) in storyList"
          :key="index"
          @click="getStory(item.id)"
        >
          <div class="card" style="height: 424px">
            <img
              data-num="001"
              :src="item.imageUrl"
              height="300"
              class="card-img-top of-none op-top position-absolute mt-n5"
              alt="..."
            />
            <div data-num="001" class="img_back img_back_kobe"></div>
            <div class="card-body">
              <h3 class="card-title fw-bold fs-6">{{ item.title }}</h3>
              <p class="card-text fs-6 multiline-ellipsis" v-html="item.description"></p>
              <hr />
              <button
                class="text-decoration-none stretched-link text-dark rank_a d-flex justify-content-center bg-transparent"
              >
                MORE
              </button>
            </div>
          </div>
        </div>
      </section>
      <Pagination :pages="pagination" @emit-pages="getStoryList"></Pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.single-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 50%;
}

.multiline-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  width: 100%;

  :deep(p) {
    a {
      color: #000 !important;
    }
  }
}

.text-secondary {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
