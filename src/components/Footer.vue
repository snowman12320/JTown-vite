<template>
  <div class="">
    <!-- 小圖示 -->
    <a target="_blank" href="https://www.facebook.com/100002537945640" class="position-fixed  end-0 me-5"
      style="bottom: 100px;z-index:999" @mouseenter="updateHover()" @mouseleave="updateHover()">
      <img v-show="isHover" src="@\assets\nbaWeb\silhouette-basket-05.svg" alt="" height="100" width="100" />
      <img v-show="!isHover" src="@/assets/nbaWeb/1652102106slam-dunk-silhouette-basketball.svg" alt="" height="100"
        width="100" />
      <i class="bi bi-messenger position-absolute top-0 end-0 fs-3 text-primary"
        style="transform: translateY(-30px);"></i>
    </a>
    <!--  -->
    <footer class="footer bg-dark text-center text-white py-2 pt-4">
      <div class="d-md-flex justify-content-around px-md-5 ">
        <p>Copyright © {{ new Date().getFullYear() }} JerseyTown.All rights reserved.</p>
        <p> ( 教學用，非商業用途 / Educational use, non-commercial use ) </p>
        <p class=" d-flex align-items-center justify-content-md-end justify-content-center gap-md-5 gap-3">
          <a href="tel:0976103738"
            class="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center">
            <i class="bi bi-telephone-fill " style="width:26px; height: 26px;padding-top:2px"></i>
          </a>
          <a href="mailto:snowman12320@gmail.com"
            class=" text-white d-inline-flex align-items-center justify-content-center">
            <i class="bi bi-envelope-at-fill  text-white" style="font-size: 23px;"></i>
          </a>
          <a href="https://drive.google.com/file/d/1TGvceo-thlafmKdnMducqczBb6rBRy6j/view"
            class=" text-white d-inline-flex align-items-center justify-content-center">
            <i class="bi bi-file-earmark-word-fill  text-primary" style="font-size: 23px;"></i>
          </a>
          <a href="#" class="position-relative d-inline-flex align-items-center justify-content-center"
            style=" background-color: transparent;">
            <img src="../assets/nbaWeb/instagram_icon.png" alt="" style="width: 30px; height: 30px;">
          </a>
          <a href="#" class="position-relative d-flex align-items-center justify-content-center" style="height:10px">
            <i class="bi bi-youtube pt-1 text-danger" style="font-size: 25px; "></i>
          </a>
          <a href="#" class="position-relative d-inline-flex align-items-center justify-content-center"
            style="height:10px">
            <i class="bi bi-line relative z-[1]  pt-1 text-success" style="font-size: 25px; "></i>
          </a>
          <a href="#" class="position-relative d-inline-flex align-items-center justify-content-center"
            style="height:10px">
            <i class="bi bi-facebook pt-1 text-primary " style="font-size:25px; "></i>
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isHover: false
    };
  },
  methods: {
    updateHover () {
      this.isHover = !this.isHover;
    }
  }
};
</script>
