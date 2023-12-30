<script>
import { VueCropper } from "vue-cropper";
import "vue-cropper/dist/index.css";

export default {
  components: { VueCropper },
  data() {
    return {
      model: false,
      modelSrc: "",
      crap: false,
      previews: {},
      lists: [
        {
          img: "https://avatars2.githubusercontent.com/u/15681693?s=460&v=4",
        },
      ],
      option: {
        img: "", // 套件示範的格式
        // img: 'https://storage.googleapis.com/vue-course-api.appspot.com/william-api/1690362062055.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=DuRa%2FaTvXVYlqq5DlHjjAzhQ95PcMs3IuJA0iqm0Ma1%2BcEMeyFvmsh3%2FwxGSpe8Z11D32ZlQbr8i8czcj3HRgeWpCxkuNzBYQJhJAJZ40X%2FLm81ddIkktUtRWf7Dqz1UQtZnyItnklxeKqM4%2Bzj2Bc5kujHowfPz%2BZeo95i6fH46ZYv1L6FHVXVm5AsxP4UBYUQagPCNemrsCTA9md9Aj21r%2BKUtIlvE9GnqhNp2U8QPZLV%2BWzuZnC9DTgfI%2B%2Fv9wQipEf0fhMVWb%2FYs%2BWc5PQOKfenkNPTDOOb3cVg8ALRxo27QADbfkfpZhIwDoKHrWH3BkxDFeclL4B1OYVWXlw%3D%3D',
        // img: this.tempImg,
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效 / 不要超過 .cut 的大小
        autoCropWidth: 200,
        autoCropHeight: 200,
        centerBox: true,
        high: true,
        max: 99999,
      },
      show: true,
      fixed: false,
      fixedNumber: [75, 34],
      //
      isLoading: false,
    };
  },
  props: {
    tempImg: {
      //! 需用物件接收，用陣列會空的，若傳tempProduct.imageUrl可能要用字串 > 錯誤 > 需保留才能傳進來覆蓋的圖片位置資料
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    // tempImg () { //! props傳進來需監聽，才能取到值
    // console.log('tempImg', this.tempImg.url);
    // this.option.img = this.tempImg.url;
    //
    // const imageUrl = this.tempImg.url;
    // 嘗試一 嘗試方向：將雲端的圖片轉成，裁切套件可以使用的圖類型（下方的 uploadImg() 的方法），然後裁切完接著，finish()方法將base64轉檔再上傳
    // const imageUrl = 'https://storage.googleapis.com/vue-course-api.appspot.com/william-api/1690362062055.jpg';
    // const imageUrl = this.tempImg.url;
    // fetch(imageUrl)// Failed to fetch
    //   .then(response => response.blob())
    //   .then(blob => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       const base64data = reader.result;
    //       this.option.img = base64data;
    //       console.log('base64 data', base64data);
    //     // Use the base64 data here
    //     };
    //     reader.readAsDataURL(blob);
    //   });
    // 嘗試二
    // this.convertImgLinkToBlob(imageUrl).then((blob) => {
    //   // 處理轉換後的blob數據格式
    //   // 在這裡你可以將blob數據傳遞給其他函數或進行其他操作
    //   console.log(blob);// null
    // });
    // 嘗試三 下載下來再上傳 > 好像需要在後端設置CORS頭，並確保API正確配置等等的設置 > vue.config.js 也有做一些嘗試
    // this.downloadAndUploadImage(imageUrl); //Network Error
    // }
  },
  methods: {
    // ? 嘗試轉檔
    convertImgLinkToBlob(imageUrl) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", imageUrl, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            resolve(null);
          }
        };
        xhr.send();
      });
    },
    downloadAndUploadImage(url) {
      this.axios({
        url,
        responseType: "arraybuffer",
      })
        .then((response) => {
          const imageBuffer = Buffer.from(response.data, "binary");
          // 在此处进行上传到Vue Cropper套件支持的位置的代码，例如上传到云存储服务
          console.log(imageBuffer);
          // 上传成功后，获取图片的URL
          // const uploadedImageUrl = 'https://example.com/uploaded-image.jpg';
          // 将uploadedImageUrl赋值给img2
          // this.img2 = uploadedImageUrl;
          // 现在可以在Vue Cropper套件中使用img2进行图像编辑
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    changeImg() {
      this.option.img = this.lists[~~(Math.random() * this.lists.length)].img;
    },
    startCrop() {
      // start
      this.crap = true;
      this.$refs.cropper.startCrop();
    },
    stopCrop() {
      //  stop
      this.crap = false;
      this.$refs.cropper.stopCrop();
    },
    clearCrop() {
      // clear
      this.$refs.cropper.clearCrop();
    },
    refreshCrop() {
      // clear
      this.$refs.cropper.refresh();
    },
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // ?輸出後，帶出base64並上傳
    finish(type) {
      this.isLoading = true;
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === "blob") {
        // console.log(this.$refs.cropper);
        this.$refs.cropper.getCropBlob((data) => {
          // console.log(data);// blob
          const newImg = new File([data], "croppered.jpg");
          // console.log(newImg);// file
          //  參考上傳圖片做法
          // 要轉formdata
          const formData = new FormData(); //! 放迴圈中才會每次獨立出來
          formData.append("file-to-upload", newImg);
          const url = `${import.meta.env.VITE_APP_API}api/${
            import.meta.env.VITE_APP_PATH
          }/admin/upload`;
          this.$http.post(url, formData).then((res) => {
            if (res.data.success) {
              const finishCropper = this.tempImg;
              finishCropper.url = res.data.imageUrl;
              this.$emit("confirm-cropper", finishCropper);
              this.isLoading = false;
            }
          });
          //
          // const img = window.URL.createObjectURL(data);
          // this.model = true;
          // this.modelSrc = img;
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
      // console.log(data);
    },
    finish2(type) {
      this.$refs.cropper2.getCropData((data) => {
        this.model = true;
        this.modelSrc = data;
      });
    },
    finish3(type) {
      this.$refs.cropper3.getCropData((data) => {
        this.model = true;
        this.modelSrc = data;
      });
    },
    down(type) {
      // event.preventDefault()
      const aLink = document.createElement("a");
      aLink.download = "demo";
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data);
          aLink.href = window.URL.createObjectURL(data);
          aLink.click();
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data;
          aLink.href = data;
          aLink.click();
        });
      }
    },
    // ? 需轉成這種檔案 > 這邊只是上船並讀取在裁切框 > 確認紐會再去抓裁切後的去覆蓋舊的
    uploadImg(e, num) {
      // 上传图片
      // this.option.img
      const file = e.target.files[0];
      // console.log('file', typeof (file), file);
      //
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {
      // console.log(msg);
    },
    cropMoving(data) {
      // console.log(data, '截图框当前坐标');
    },
  },
  mounted: function () {
    // console.log(window['vue-cropper']);
  },
};
</script>

<template>
  <div>
    <div class="d-flex gap-1 justify-content-center align-items-center">
      <LoadingMask :active="isLoading" />
      <div class="cut">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :output-size="option.size"
          :output-type="option.outputType"
          :info="true"
          :full="option.full"
          :fixed="fixed"
          :fixed-number="fixedNumber"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :fixed-box="option.fixedBox"
          :original="option.original"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :center-box="option.centerBox"
          @real-time="realTime"
          :high="option.high"
          @img-load="imgLoad"
          mode="contain"
          :max-img-size="option.max"
          @crop-moving="cropMoving"
        ></vue-cropper>
      </div>
      <div
        class="show-preview"
        :style="{
          width: previews.w + 'px',
          height: previews.h + 'px',
          overflow: 'hidden',
          margin: '5px',
        }"
      >
        <div :style="previews.div">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="test-button">
      <!-- <button @click="changeImg" class="btn_2">changeImg</button> -->
      <label class="btn_2" for="uploads">upload</label>
      <input
        type="file"
        id="uploads"
        style="position: absolute; clip: rect(0 0 0 0)"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)"
      />
      <!-- <button @click="startCrop" v-if="!crap" class="btn_2">start</button> -->
      <!-- <button @click="stopCrop" v-else class="btn_2">stop</button> -->
      <button @click="clearCrop" class="btn_2">clear</button>
      <!-- <button @click="refreshCrop" class="btn_2">refresh</button> -->
      <button @click="changeScale(1)" class="btn_2">+</button>
      <button @click="changeScale(-1)" class="btn_2">-</button>
      <button @click="rotateLeft" class="btn_2">rotateLeft</button>
      <button @click="rotateRight" class="btn_2">rotateRight</button>
      <!-- <button @click="finish('base64')" class="btn_2">preview(base64)</button> -->
      <!-- <button @click="finish('blob')" class="btn_2">preview(blob)</button> -->
      <!-- <a @click="down('base64')" class="btn_2">download(base64)</a> -->
      <!-- <a @click="down('blob')" class="btn_2">download(blob)</a> -->
      <!-- <a @click="() => option.img = ''" class="btn_2">清除图片</a> -->
      <div style="display: block; width: 100%">
        <div class="m-5 d-grid gap-3">
          <button type="button" class="btn btn-danger w-100" @click="finish('blob')">
            confirm
          </button>
          <button
            type="button"
            class="btn btn-secondary w-100"
            @click.stop="$emit('close', openModal)"
          >
            close
          </button>
        </div>
        <!--  -->
        <div v-if="false">
          <label class="c-item">
            <span>上传图片是否显示原始宽高 (针对大图 可以铺满)</span>
            <input type="checkbox" v-model="option.original" />
            <span>original: {{ option.original }}</span>
          </label>
          <label class="c-item">
            <span>能否拖动图片</span>
            <input type="checkbox" v-model="option.canMove" />
          </label>
          <label class="c-item">
            <span>能否拖动截图框</span>
            <input type="checkbox" v-model="option.canMoveBox" />
            <span>canMoveBox: {{ option.canMoveBox }}</span>
          </label>
          <label class="c-item">
            <span>截图框固定大小</span>
            <input type="checkbox" v-model="option.fixedBox" />
            <span>fixedBox: {{ option.fixedBox }}</span>
          </label>
          <label class="c-item">
            <span>是否输出原图比例的截图</span>
            <input type="checkbox" v-model="option.full" />
            <span>full: {{ option.full }}</span>
          </label>
          <label class="c-item">
            <span>是否自动生成截图框</span>
            <input type="checkbox" v-model="option.autoCrop" />
            <span>autoCrop: {{ option.autoCrop }}</span>
          </label>
          <label class="c-item">
            <span>是否根据dpr生成适合屏幕的高清图片</span>
            <input type="checkbox" v-model="option.high" />
            <span>high: {{ option.high }}</span>
          </label>
          <label class="c-item">
            <span>截图框是否限制在图片里(只有在自动生成截图框时才能生效)</span>
            <input type="checkbox" v-model="option.centerBox" />
            <span>centerBox: {{ option.centerBox }}</span>
          </label>
          <label class="c-item">
            <p>输出图片格式</p>
            <label
              >jpg
              <input type="radio" name="type" value="jpeg" v-model="option.outputType" />
            </label>
            <label
              >png
              <input type="radio" name="type" value="png" v-model="option.outputType" />
            </label>
            <label
              >webp
              <input type="radio" name="type" value="webp" v-model="option.outputType" />
            </label>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
}

.cut {
  width: 300px;
  height: 300px;
  margin: 30px;
}

.c-item {
  max-width: 800px;
  margin: 10px auto;
  margin-top: 20px;
}

.content {
  margin: auto;
  max-width: 1200px;
  margin-bottom: 100px;
}

.test-button {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}

.btn_2 {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 20px 10px 0px 0px;
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #50bfff;
  border-color: #50bfff;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
}

.des {
  line-height: 30px;
}

code.language-html {
  padding: 10px 20px;
  margin: 10px 0px;
  display: block;
  background-color: #333;
  color: #fff;
  overflow-x: auto;
  font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans,
    Type, Writer, Ubuntu, Mono;
  border-radius: 5px;
  white-space: pre;
}

.show-info {
  margin-bottom: 50px;
}

.show-info h2 {
  line-height: 50px;
}

/*.title, .title:hover, .title-focus, .title:visited {
        color: black;
      }*/

.title {
  display: block;
  text-decoration: none;
  text-align: center;
  line-height: 1.5;
  margin: 20px 0px;
  background-image: -webkit-linear-gradient(
    left,
    #3498db,
    #f47920 10%,
    #d71345 20%,
    #f7acbc 30%,
    #ffd400 40%,
    #3498db 50%,
    #f47920 60%,
    #d71345 70%,
    #f7acbc 80%,
    #ffd400 90%,
    #3498db
  );
  color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  animation: slide 5s infinite linear;
  font-size: 40px;
}

.test {
  height: 300px;
}

.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  max-height: 50vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
}

.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
    ),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}

.c-item {
  display: block;
  user-select: none;
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: -100% 0;
  }
}
</style>
