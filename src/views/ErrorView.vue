<template>
  <main class="main">
    <div class="container">
      <div class="relative">
        <div class="absolute-center">
          <div class="heading">施工中</div>
          <a class="btn-link" href="index.html">回首頁</a>
        </div>
        <div class="img">
          <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="Image" />
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="Image" />
      </div>
      <div class="brightness-overlay"></div>
      <router-link to="/" class="fullscreen-link"></router-link>
    </div>
    <!-- Cursor element -->
    <div id="cursor" :style="cursorStyle" class="absolute hidden"></div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      cursorStyle: {
        top: '0px',
        left: '0px'
      }
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.handleMouseMove)
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
  },
  methods: {
    handleMouseMove(e) {
      this.cursorStyle.top = `${e.clientY}px`
      this.cursorStyle.left = `${e.clientX}px`
      const cursor = document.querySelector('#cursor')
      cursor.classList.remove('hidden')
    }
  }
}
</script>

<style scoped>
#cursor {
  transition: all 0.1s ease;
  transform: scale(0);
  box-shadow: 0px 0px 50px 5px #fff;
}

#cursor:not(.hidden) {
  transform: scale(1);
  box-shadow: 0px 0px 40px 50px rgba(255, 255, 255, 0.3);
}

/* Main Container */
.main {
  position: absolute;
  inset: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
}

/* Container */
.container {
  margin: auto;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 2px 20px;
}

/* Relative */
.relative {
  position: relative;
  padding-bottom: 12px;
}

/* Absolute Centered Element */
.absolute-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* Heading */
.heading {
  margin-top: 12px;
  text-align: center;
  font-size: 70px;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #4f46e5; /* Replace with your desired color */
}

/* Link Button */
.btn-link {
  margin-top: 2px;
  padding: 4px 8px;
  width: 100%;
  text-align: center;
  background-color: #4f46e5; /* Replace with your desired color */
  color: white;
  border-radius: 4px;
  display: inline-block;
  text-decoration: none;
  font-size: 50px;
}

.btn-link:hover {
  background-color: #574ce6; /* Replace with your desired hover color */
}

/* Image */
.img {
  display: block;
  text-align: center;
}

/* Brightness Overlay */
.brightness-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6); /* Adjust brightness as needed */
}

/* Full-Screen Link */
.fullscreen-link {
  position: absolute;
  inset: 0;
}

/* Cursor */
#cursor {
  position: absolute;
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background-color: white;
}

.hidden {
  display: none;
}

/* Responsive Container */
@media (min-width: 768px) {
  .container {
    padding: 20px 44px;
    flex-direction: row;
    gap: 28px;
  }
}

/* Large Screen Container */
@media (min-width: 1024px) {
  .container {
    padding: 24px;
  }
}

@media (max-width: 768px) {
  .heading {
    font-size: 30px;
  }
  .btn-link {
    font-size: 30px;
  }

  img {
    height: 100px;
    width: auto;
  }
}
</style>
