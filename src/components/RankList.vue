<script>
export default {
  data() {
    return {
      rankData: [
        {
          value: 4.7,
        },
        {
          value: 4.5,
        },
        {
          value: 4.4,
        },
        {
          value: 4.2,
        },
        {
          value: 4.1,
        },
      ],
      format: (percentage) => (percentage === 100 ? "Full" : `${percentage}%`),
    };
  },
  created() {
    window.scrollTo(0, 0);
  },
  methods: {
    toStory(id) {
      this.$router.push(`/story/item/${id}`);
    },
  },
};
</script>

<template>
  <div>
    <div class="my-8 pt-6">
      <div id="Ranking" class="d-flex justify-content-center align-items-center">
        <h2 class="text-pickBlack">PLAYER</h2>
        <img
          src="@/assets/image/nbaWeb/Lovepik_com-401319703-basketball.png"
          height="50"
          alt="sellLogo"
        />
        <h2 class="text-pickBlack">RANK</h2>
      </div>
      <p class="fs-6 text-secondary text-center mb-5 pb-5">
        Did you agree with this ranking? Move your favorite to the top
      </p>
    </div>
    <section
      class="d-flex flex-column justify-content-around align-items-start rankList gap-10"
    >
      <div
        @click="toStory('-NZGctSZ8Ky-ZDGfYJpf')"
        class="d-flex rank flex-column flex-md-row align-items-center justify-content-md-center w-100 gap-md-5 justify-content-around"
        data-aos="zoom-in"
      >
        <div class="allstar_wrap">
          <div
            class="allstar_bg d-flex justify-content-center align-items-center me-xl-0"
          >
            <img
              class="of-contain"
              src="@/assets/image/nbaWeb/PNG-images-NBA-Players-36png.png"
              height="200"
              width="200"
              alt="NBA-Players-36png"
            />
          </div>
          <div class="text-center allstartext_rwd">
            <p class="text-nbaBlue mt-3">NO.1</p>
            <h3>
              KOBE <span class="br"><br /></span>
              BRYANT
            </h3>
            <p>BLACK MAMBA</p>
          </div>
        </div>
        <div>
          <el-rate
            class="text-center fs-1 mb-5"
            v-model="rankData[0].value"
            disabled
            show-score
            text-color="#ffa"
            score-template="{value} points"
          />
          <div class="demo-progress">
            <el-progress :percentage="90" color="#0253a5" />
            <el-progress :percentage="10" :format="format" color="#0253a5" />
            <el-progress :percentage="0" :format="format" color="#0253a5" />
            <el-progress :percentage="0" :format="format" color="#0253a5" />
            <el-progress :percentage="0" :format="format" color="#0253a5" />
          </div>
        </div>
      </div>
      <div
        class="rank d-flex flex-column flex-md-row align-items-center justify-content-md-center w-100 gap-md-5 justify-content-around"
        data-aos="zoom-in"
      >
        <div class="allstar_wrap">
          <div
            class="allstar_bg d-flex justify-content-center align-items-center me-xl-0"
          >
            <img
              class="of-cover op-top"
              src="@/assets/image/nbaWeb/PNG-images-NBA-Players-28png.png"
              height="200"
              width="200"
              alt="NBA-Players-36png"
            />
          </div>
          <div class="text-center allstartext_rwd">
            <p class="text-nbaBlue mt-3">NO.2</p>
            <h3>LEBRON JAMES</h3>
            <p>KING JAMES</p>
          </div>
        </div>
        <div>
          <el-rate
            class="text-center fs-1 mb-5"
            v-model="rankData[1].value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
          />
          <div class="demo-progress">
            <el-progress color="#0253a5" :percentage="90" />
            <el-progress color="#0253a5" :percentage="10" :format="format" />
            <el-progress color="#0253a5" :percentage="0" :format="format" />
            <el-progress color="#0253a5" :percentage="0" :format="format" />
            <el-progress color="#0253a5" :percentage="0" :format="format" />
          </div>
        </div>
      </div>
      <div
        class="rank d-flex flex-column flex-md-row align-items-center justify-content-md-center w-100 gap-md-5 justify-content-around"
        data-aos="zoom-in"
      >
        <div class="allstar_wrap">
          <div
            class="allstar_bg d-flex justify-content-center align-items-center me-xl-0"
          >
            <img
              class="of-cover op-top"
              src="@/assets/image/nbaWeb/PNG-images-NBA-Players-1png-removebg-preview.png"
              height="200"
              width="200"
              alt="NBA-Players-1png-removebg"
            />
          </div>
          <div class="text-center allstartext_rwd">
            <p class="text-nbaBlue mt-3">NO.3</p>
            <h3>STEPHEN CURRY</h3>
            <p>LOGO-SHOOT GOD</p>
          </div>
        </div>
        <div>
          <el-rate
            class="text-center fs-1 mb-5"
            v-model="rankData[2].value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
          />
          <div class="demo-progress">
            <el-progress color="#0253a5" :percentage="90" />
            <el-progress color="#0253a5" :percentage="20" :format="format" />
            <el-progress color="#0253a5" :percentage="0" :format="format" />
            <el-progress color="#0253a5" :percentage="0" :format="format" />
            <el-progress color="#0253a5" :percentage="0" :format="format" />
          </div>
        </div>
      </div>
      <div
        class="rank d-flex flex-column flex-md-row align-items-center justify-content-md-center w-100 gap-md-5 justify-content-around"
        data-aos="zoom-in"
      >
        <div class="allstar_wrap">
          <div
            class="allstar_bg d-flex justify-content-center align-items-center me-xl-0"
          >
            <img
              class="of-cover op-top"
              src="@/assets/image/nbaWeb/images-NBA-Players-58png-removebg-preview.png"
              height="200"
              width="200"
              alt="NBA-Players-58png-removebg"
            />
          </div>
          <div class="text-center allstartext_rwd">
            <p class="text-nbaBlue mt-3">NO.4</p>
            <h3 class="text-center">
              RUSSELL <br />
              WESTBROOK
            </h3>
            <p>TRIPLE-DOUBLES GOD</p>
          </div>
        </div>
        <div>
          <el-rate
            class="text-center fs-1 mb-5"
            v-model="rankData[3].value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
          />
          <div class="demo-progress">
            <el-progress color="#0253a5" :percentage="80" />
            <el-progress color="#0253a5" :percentage="40" :format="format" />
            <el-progress color="#0253a5" :percentage="10" :format="format" />
            <el-progress color="#0253a5" :percentage="0" :format="format" />
            <el-progress color="#0253a5" :percentage="0" :format="format" />
          </div>
        </div>
      </div>
      <div
        class="rank d-flex flex-column flex-md-row align-items-center justify-content-md-center w-100 gap-md-5 justify-content-around"
        data-aos="zoom-in"
      >
        <div class="allstar_wrap">
          <div
            class="allstar_bg d-flex justify-content-center align-items-center me-xl-0"
          >
            <img
              class="of-cover op-top"
              src="@/assets/image/nbaWeb/PNG-images-NBA-Players-60png.png"
              height="200"
              width="200"
              alt="NBA-Players"
            />
          </div>
          <div class="text-center allstartext_rwd">
            <p class="text-nbaBlue mt-3">NO.5</p>
            <h3>
              KRIE <span class="br"><br /></span> IRVING
            </h3>
            <p>DRIBBLE GOD</p>
          </div>
        </div>
        <div class="text-center">
          <el-rate
            class="text-center fs-1 mb-5"
            v-model="rankData[4].value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
          />
          <div class="demo-progress">
            <el-progress color="#0253a5" :percentage="80" />
            <el-progress color="#0253a5" :percentage="0" :format="format" />
            <el-progress color="#0253a5" :percentage="30" :format="format" />
            <el-progress color="#0253a5" :percentage="0" :format="format" />
            <el-progress color="#0253a5" :percentage="0" :format="format" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-rate) {
  --el-rate-icon-size: 40px !important;
}
.el-rate__text {
  color: #0253a5;
  padding-top: 0.5em;
  font-size: 1em;
}

.rankList {
  .allstartext_rwd {
    h3,
    p {
      color: #0253a5;
    }
  }

  .rank {
    cursor: pointer;

    &:hover h3 {
      color: rgb(204 43 49);
      transition: all;
      animation-duration: 300ms;
    }
  }
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.text-secondary {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
