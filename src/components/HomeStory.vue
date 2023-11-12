<script>
export default {
  name: ["HomeStory"],
  data() {
    return {
      storyList: [],
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
        }
      });
    },
    getStory(id) {
      this.$router.push(`/story/item/${id}`);
    },
  },
};
</script>

<template>
  <div>
    <div class="my-8 py-5">
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
    <section class="row row-cols-1 row-cols-lg-3 rank_card mx-2">
      <div
        class="col mb-5 mt-7 mb-lg-0"
        v-for="item in storyList.splice(0, 3)"
        :key="item.id"
        @click="getStory(item.id)"
      >
        <div class="card" style="height: 424px">
          <img
            data-num="001"
            :src="item.imageUrl"
            data-aos="flip-left"
            :data-aos-duration="3000"
            height="300"
            class="card-img-top of-none op-top position-absolute mt-n5"
            :alt="item.title"
          />
          <div data-num="001" class="img_back img_back_kobe"></div>
          <div class="card-body">
            <h3 class="card-title fw-bold fs-6">{{ item.title }}</h3>
            <p
              class="card-text fs-6 multiline-ellipsis text-secondary"
              v-html="item.description"
            ></p>
            <hr />
            <button
            type="button"
              class="text-decoration-none stretched-link text-dark rank_a d-flex justify-content-center bg-transparent"
            >
              MORE
            </button>
          </div>
        </div>
      </div>
    </section>
    <div class="text-center my-7">
      <RouterLink
        to="/story/list"
        class="btn btn-outline-dark rounded-pill btn_pill my-5 fs-5 sellbtn_Rwd"
      >
        MORE LISTS
      </RouterLink>
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
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
    a {
      color: #6c757d !important;
      font-weight: 400 !important;
    }
  }
  :deep(strong) {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
    font-weight: 400;
  }
}

.btn_pill {
  width: 50%;
  transition: all;
  transition-duration: 500ms;
  box-shadow: 0 5px 1px black;
  transform: translateY(-5px);
  background-color: #0253a5;
  color: white;

  &:hover {
    box-shadow: 0 6px 1px black;
    transform: translateY(-8px);
    background-color: #0253a5;
  }

  &:focus {
    box-shadow: 0 3px 1px black;
    transform: translateY(0px);
  }
}

.text-secondary {
  p {
  }
}
</style>
