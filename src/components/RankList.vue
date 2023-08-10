<template >
    <section class="d-flex flex-column justify-content-around align-items-start rankList gap-5">
        <div @click="toStory('-NZGctSZ8Ky-ZDGfYJpf')"
            class="d-flex rank flex-column  flex-md-row  align-items-center justify-content-md-center w-100 gap-md-5 justify-content-around"
            data-aos="zoom-in">
            <div class="allstar_wrap">
                <div class="allstar_bg d-flex justify-content-center align-items-center me-xl-0">
                    <img class="of-contain" src="@/assets/nbaWeb/PNG-images-NBA-Players-36png.png" height="200" width="200"
                        alt="" />
                </div>
                <div class="text-center allstartext_rwd ">
                    <p class="text-nbaBlue mt-3">NO.1</p>
                    <h3 class="">
                        KOBE <span class="br"><br /></span>
                        BRYANT
                    </h3>
                    <p>BLACK MAMBA</p>
                </div>
            </div>
            <div class="">
                <el-rate class="text-center fs-1 mb-5" v-model="value" disabled show-score text-color="#ffa"
                    score-template="{value} points" />
                <div class="demo-progress">
                    <el-progress :percentage="90" />
                    <el-progress :percentage="10" :format="format" />
                    <el-progress :percentage="10" :format="format" />
                    <el-progress :percentage="0" :format="format" />
                    <el-progress :percentage="0" :format="format" />
                </div>
            </div>
        </div>
        <div class="rank d-flex flex-column  flex-md-row  align-items-center justify-content-md-center w-100 gap-md-5 justify-content-around"
            data-aos="zoom-in">
            <div class="allstar_wrap">
                <div class="allstar_bg d-flex justify-content-center align-items-center me-xl-0">
                    <img class="of-cover op-top" src="@/assets/nbaWeb/PNG-images-NBA-Players-28png.png" height="200"
                        width="200" alt="" />
                </div>
                <div class="text-center allstartext_rwd">
                    <p class="text-nbaBlue mt-3">NO.2</p>
                    <h3>LEBRON JAMES</h3>
                    <p>KING JAMES</p>
                </div>
            </div>
            <div class="">
                <el-rate class="text-center fs-1 mb-5" v-model="value" disabled show-score text-color="#ff9900"
                    score-template="{value} points" />
                <div class="demo-progress">
                    <el-progress :percentage="90" />
                    <el-progress :percentage="10" :format="format" />
                    <el-progress :percentage="10" :format="format" />
                    <el-progress :percentage="0" :format="format" />
                    <el-progress :percentage="0" :format="format" />
                </div>
            </div>
        </div>
        <div class="rank d-flex flex-column  flex-md-row  align-items-center justify-content-md-center w-100 gap-md-5 justify-content-around"
            data-aos="zoom-in">
            <div class="allstar_wrap">
                <div class="allstar_bg d-flex justify-content-center align-items-center me-xl-0">
                    <img class="of-cover op-top" src="@/assets/nbaWeb/PNG-images-NBA-Players-1png-removebg-preview.png"
                        height="200" width="200" alt="" />
                </div>
                <div class="text-center allstartext_rwd">
                    <p class="text-nbaBlue mt-3">NO.3</p>
                    <h3>STEPHEN CURRY</h3>
                    <p>LOGOSHOOT GOD</p>
                </div>
            </div>
            <div class="">
                <el-rate class="text-center fs-1 mb-5" v-model="value" disabled show-score text-color="#ff9900"
                    score-template="{value} points" />
                <div class="demo-progress">
                    <el-progress :percentage="90" />
                    <el-progress :percentage="10" :format="format" />
                    <el-progress :percentage="10" :format="format" />
                    <el-progress :percentage="0" :format="format" />
                    <el-progress :percentage="0" :format="format" />
                </div>
            </div>
        </div>
        <div class="rank d-flex flex-column  flex-md-row  align-items-center justify-content-md-center w-100 gap-md-5 justify-content-around"
            data-aos="zoom-in">
            <div class="allstar_wrap">
                <div class="allstar_bg d-flex justify-content-center align-items-center me-xl-0">
                    <img class="of-cover op-top" src="@/assets/nbaWeb/images-NBA-Players-58png-removebg-preview.png"
                        height="200" width="200" alt="" />
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
            <div class="">
                <el-rate class="text-center fs-1 mb-5" v-model="value" disabled show-score text-color="#ff9900"
                    score-template="{value} points" />
                <div class="demo-progress">
                    <el-progress :percentage="90" />
                    <el-progress :percentage="10" :format="format" />
                    <el-progress :percentage="10" :format="format" />
                    <el-progress :percentage="0" :format="format" />
                    <el-progress :percentage="0" :format="format" />
                </div>
            </div>
        </div>
        <div class="rank d-flex flex-column  flex-md-row  align-items-center justify-content-md-center w-100 gap-md-5 justify-content-around"
            data-aos="zoom-in">
            <div class="allstar_wrap">
                <div class="allstar_bg d-flex justify-content-center align-items-center me-xl-0">
                    <img class="of-cover op-top" src="@/assets/nbaWeb/PNG-images-NBA-Players-60png.png" height="200"
                        width="200" alt="" />
                </div>
                <div class="text-center allstartext_rwd">
                    <p class="text-nbaBlue mt-3">NO.5</p>
                    <h3>
                        KRIE <span class="br"><br /></span> IRVING
                    </h3>
                    <p>DRIBBLE GOD</p>
                </div>
            </div>
            <div class="">
                <el-rate class="text-center fs-1 mb-5" v-model="value" disabled show-score text-color="#ff9900"
                    score-template="{value} points" />
                <div class="demo-progress">
                    <el-progress :percentage="90" />
                    <el-progress :percentage="10" :format="format" />
                    <el-progress :percentage="10" :format="format" />
                    <el-progress :percentage="0" :format="format" />
                    <el-progress :percentage="0" :format="format" />
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  data () {
    return {
      value: 4.7,
      format: (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
    };
  },
  created () {
    window.scrollTo(0, 0);
  },
  methods: {
    toStory (id) {
      this.$router.push(`/story/item/${id}`);
    }
  }

};
</script>
<style lang="scss">
.el-rate__text {
    color: blue;
}

.rankList {
    .allstartext_rwd {

        h3,
        p {
            color: white;
        }

    }

    .rank {
        cursor: pointer;

        &:hover h3 {
            color: blueviolet;
            transition: all;
            animation-duration: 300ms;
        }
    }
}

.demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 350px;
}
</style>
