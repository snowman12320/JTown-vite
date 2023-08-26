<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import HomeCarousel from '@/components/HomeCarousel.vue'
import HomeProduct from '@/components/HomeProduct.vue'
import HomeStory from '@/components/HomeStory.vue'
import Footer from '@/components/Footer.vue'
// import loginMixin from '../mixins/loginMixin'
import emitter from '@/methods/emitter'

import loginStore from '@/stores/loginStore.js'
import { mapActions, mapState } from 'pinia'

export default {
  // name: 'HomeView', //*过设置name属性，可以为组件指定一个唯一的名称。这对于在组件之间进行通信
  // mixins: [loginMixin],

  components: {
    Header,
    HomeCarousel,
    HomeProduct,
    HomeStory,
    Footer
  },
  data() {
    return {
      isCouponAlert: true,
      duration: 0,
      timerElement: '00 D 00 H 00 M 00.0 S',
      value: Date.now() + 1000 * 60 * 60 * 7, //* 實際開發時用API取到期日
      centerDialogVisible: true
    }
  },
  mounted() {
    this.countdownTimer()
    // 監聽scroll事件 > 可能要改watch 比較前後值
    window.addEventListener('scroll', () => {
      // 如果畫面捲軸停止捲動，將centerDialogVisible設置為true
      if (window.scrollY === 0) {
        // 在畫面停留3秒後將centerDialogVisible設置為true
        setTimeout(() => {
          this.centerDialogVisible = !this.centerDialogVisible
        }, 10000)
      }
    }),
      this.checkLoginStatus() // 在组件挂载时调用检查登录状态的方法
  },
  computed: {
    ...mapState(loginStore, ['isLoading', 'isLogin'])
  },
  methods: {
    ...mapActions(loginStore, ['checkLoginStatus']),
    pad(n, s) {
      s = s || 2
      return ('00000' + n).slice(-s)
    },
    setTimerElement() {
      const now = new Date()
      //* 實際開發可用優惠券到期日
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 0, 0, 0)
      this.duration = midnight.getTime() - now.getTime()

      if (this.duration > 0) {
        const e = this.duration
        const ms = e % 1000
        const s = Math.floor((e / 1000) % 60)
        const m = Math.floor((e / (1000 * 60)) % 60)
        const h = Math.floor((e / (1000 * 60 * 60)) % 24)
        const d = Math.floor(e / (1000 * 60 * 60 * 24))

        this.timerElement = `Last chance to get 10% UP OFF  - \n EXTENDED UNTIL： ${this.pad(
          d
        )} Day ${this.pad(h)} h ${this.pad(m)} m ${this.pad(s)}.${Math.floor(ms / 100)} s`
      } else {
        this.timerElement = 'SORRY TIME UP!NEXT TIME BE QUICKLY' + '00 Day 00 h 00 m 00.0 s'
      }
    },
    countdownTimer() {
      this.setTimerElement() // 初始化倒计时

      setInterval(() => {
        this.setTimerElement()
      }, 100) // 每0.1秒更新一次倒计时
    }
  }
}
</script>

<template>
  <div class="position-relative">
    <Loading :active="isLoading"></Loading>
    <Header :is-login="isLogin"></Header>
    <HomeCarousel></HomeCarousel>
    <div class="container-xxl">
      <HomeStory></HomeStory>
      <HomeProduct></HomeProduct>
    </div>
    <div></div>
    <Footer></Footer>
    <!-- alert -->
    <transition name="fade" class="">
      <el-alert
        class="el-alert_home"
        title="SIGN UP ! Get the Coupon ！"
        type="info"
        center
        :description="timerElement"
        show-icon
        v-show="isCouponAlert"
      />
    </transition>
    <!-- advertise modal -->
    <el-dialog v-model="centerDialogVisible" title="" width="30%" center>
      <!-- v-slot:default来指定el-countdown组件中的默认插槽位置 -->
      <template v-slot:default>
        <p class="text-center fs-4">
          " GOOAYE COUPON 20% OFF "<br />
          ON ALL DEPARTMENTS
        </p>
        <img
          src="@\assets\nbaWeb\andre-hunter-RPKdvPcYAUo-unsplash.jpg"
          class="w-100 h-100 img-fluid"
          alt=""
        />
        <el-row>
          <el-col :span="24">
            <el-countdown title="Last chance" :value="value" class="countdown-title" />
          </el-col>
        </el-row>
      </template>
      <template #footer>
        <span
          class="dialog-footer d-flex flex-md-row flex-column justify-content-center mx-auto align-items-center p-0"
        >
          <el-button class="without" @click="centerDialogVisible = false"
            >shop without offer</el-button
          >
          <router-link class="el-button--primary" to="/products-view/products-content/search">
            <el-button type="primary" @click="centerDialogVisible = false">
              ENJOY 20% OFF
            </el-button>
          </router-link>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

// ! scoped 會讓子元件吃不到
<style lang="scss">
@import '../assets/helpers/function.scss';

.el-alert_home {
  position: absolute !important;
  top: 100px;
  max-width: 700px !important;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: linear-gradient(to right, #0047ab, #e13a3e);
  height: 75px;

  i {
    color: #fff !important;
    margin-right: 30px;
  }

  .el-alert__content {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .el-alert__title {
      font-size: 25px;
    }

    .el-alert__description {
      width: 470px;
      color: white !important;
      font-weight: 200 !important;
    }
  }
}

// alert過度
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s !important;
}

.fade-enter,
.fade-leave-to {
  opacity: 0 !important;
}

// 彈窗
.el-dialog__footer {
  padding: 0px !important;
  height: 90px !important;
}

.el-col {
  text-align: center;
}

.el-dialog__title {
  font-size: 50px !important;
}

/* ! 使用类名：可以为el-button元素添加一个自定义的类名，并在CSS文件中定义该类名的样式规则 */
.countdown-title {
  .el-statistic__head {
    font-size: 20px !important;
    color: red !important;
    margin-top: 20px;
  }

  /* 不能設定scoped 無法改樣式 */
  .el-statistic__number {
    font-size: 30px !important;
  }
}

.el-button {
  border: none !important;
}

.el-button--primary {
  // display: inline-block;
  padding: 25px 20px !important;
  display: flex;
  align-items: center;
  text-decoration: none;

  .el-button {
    font-size: 20px !important;
  }
}

.without {
  background-color: transparent !important;

  &:hover span {
    text-decoration: underline !important;
    color: #000;
  }
}

@include maxpad() {
  .el-dialog {
    width: 90% !important;
  }

  .el-alert_home {
    display: none !important;
  }

  .el-button--primary {
    padding: 10px !important;
  }
}
</style>
