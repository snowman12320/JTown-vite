<template class="">
  <div class="position-relative">
    <!-- video banner -->
    <div id="carouselExampleIndicators" class="carousel slide carousel-fade " data-bs-ride="carousel" style="z-index:1">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item " data-bs-interval="10000">
          <iframe height="" class="w-100" style="height: 100vh" src="https://www.youtube.com/embed/XWXWTZEY_6c?start=431"
            title="YouTube video player" frameborder="0"
            allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture "
            allowfullscreen></iframe>
        </div>
        <div class="carousel-item " data-bs-interval="100000">
          <!-- 加寬度100%不錯位跑版 -->
          <img src="../assets/nbaWeb/john-villablanca-_7EXgSQ98ew-unsplash.jpg" class="of-cover op-top w-100" alt="..."
            style="height: 100vh" />
        </div>
        <div class="carousel-item active" data-bs-interval="100000">
          <img src="../assets/nbaWeb/dean-bennett-nFjLHE4vmn4-unsplash.jpg" class="d-block w-100 op-center of-cover"
            alt="..." style="height: 100vh" />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" style="width: 100px; height: 100px" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" style="width: 100px; height: 100px" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- scroll down arrow -->
    <div class="banner_arrow" style="z-index:2">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
        class="bi bi-chevron-double-down " viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        <path fill-rule="evenodd"
          d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
      </svg>
    </div>
  </div>
</template>
