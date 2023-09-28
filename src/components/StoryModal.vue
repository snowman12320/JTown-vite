<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增文章</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempStory.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <i :class="{ 'd-none': !Loading_small }" class="fas fa-spinner fa-spin"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <img class="of-cover op-top w-100" style="300px" :src="tempStory.imageUrl" :alt="tempStory.name" />
            </div>
            <div class="col-sm-8">
              <div class="d-flex flex-column gap-3">
                <!-- <div class="mb-3">
                  <label for="create_at">新增日期</label>
                  <input type="date" class="form-control" id="create_at" v-model="create_at" />
                </div> -->
                <!-- 放在底下會失去功能 -->
                <div class="d-flex flex-column flex-md-row align-items-start gap-1">
                  <p>新增日期</p>
                  <el-date-picker
                    v-model="create_at"
                    type="datetime"
                    placeholder="Select date and time"
                    :shortcuts="shortcuts"
                  />
                </div>
                <div class="d-flex flex-column flex-md-row gap-1">
                  <p>新增標籤</p>
                  <el-tag
                    v-for="tag in dynamicTags"
                    :key="tag"
                    class="mx-1"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    v-if="inputVisible"
                    ref="InputRef"
                    v-model="inputValue"
                    class="ms-1"
                    style="width: 100px"
                    size="small"
                    @keyup.enter="handleInputConfirm"
                    @blur="handleInputConfirm"
                  />
                  <el-button
                    v-else
                    class="button-new-tag ml-1"
                    size="small"
                    @click.stop="showInput"
                  >
                    + New Tag
                  </el-button>
                </div>
                <!--  -->
                <div>
                  <label for="title" class="form-label">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempStory.title"
                    placeholder="請輸入標題"
                  />
                </div>
                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">作者</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempStory.author"
                      placeholder="請輸入分類"
                    />
                  </div>
                </div>
                <div>
                  <label for="editor1" class="form-label">文章描述</label>
                  <ckeditor
                    :editor="editor"
                    v-model="tempStory.description"
                    :config="editorConfig"
                  ></ckeditor>
                </div>
                <div>
                  <label for="content" class="form-label">球員內容</label>
                  <ckeditor
                    :editor="editor"
                    v-model="tempStory.content"
                    :config="editorConfig"
                  ></ckeditor>
                </div>
                <hr />
                <div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempStory.isPublic"
                      :true-value="true"
                      :false-value="false"
                      id="isPublic"
                    />
                    <label class="form-check-label" for="isPublic"> 是否啟用 </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <!-- 向外傳遞需觸發的函式和傳遞資料 -->
          <button type="button" class="btn btn-primary" @click="$emit('update-story', tempStory)">
            確認
          </button>
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic' //* 需從public中，換成有取得新增外掛的

export default {
  mixins: [modalMixin],
  data() {
    return {
      modal: {},
      tempStory: {},
      create_at: '', //! 限制數字存入資料
      // defaultTime: new Date(2000, 1, 1, 12, 0, 0),
      shortcuts: [
        {
          text: 'Today',
          value: new Date()
        },
        {
          text: 'Yesterday',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          }
        },
        {
          text: 'A week ago',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          }
        }
      ],
      //
      inputValue: '',
      dynamicTags: ['NBA', 'SPORT', 'NEWS'],
      inputVisible: false,
      InputRef: null,
      //
      editor: ClassicEditor,
      // editorData: '<p>Content of the editor.</p>', //* 預設內容
      editorConfig: {},
      Loading_small: false
    }
  },
  props: {
    story: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {},
  watch: {
    //* 監聽傳進來的story，並自動存到暫存區
    story() {
      this.tempStory = this.story
      // ! StoryModal 日期要轉成 yyyy-mm-dd 格式 (年月日)，才會在彈窗正確顯示
      // const date = new Date(this.tempStory.create_at * 1000);
      // this.create_at = date.toISOString().split('T')[0];
      //! 用元件的話會自動使用toLocaleString()，就會變成年月日時間，所以只要*1000即可(等於台北時間...之類的)，不能使用this.$filters.dateAndTime
      this.create_at = new Date(this.tempStory.create_at * 1000)
      //
      //! 結果api文件中的tag欄位m，根本沒有QQ，難怪undefine
      // this.dynamicTags = this.tempStory.tag;
      // 多張圖
      if (!this.tempStory.images) {
        this.tempStory.images = []
      }
      // this.formData.richeditor78915 = this.tempStory.description;//! 可以編輯，但再次編輯取不出來
    },
    create_at() {
      //! 限制數字存入資料
      // console.log('先是輸入日期', this.create_at);
      this.tempStory.create_at = Math.floor(new Date(this.create_at) / 1000)
      // console.log('後轉以秒为单位的时间戳', this.tempStory.create_at);
    }
  },
  methods: {
    // * new FormData() 是一個 JavaScript 內建的物件，用於創建一個空的 FormData 物件。
    // * 首先獲取一個 <form> 元素，FormData 物件可以用來構建一個包含鍵值對的表單數據，並且可以通過 AJAX 以 multipart/form-data 格式將這些數據發送到服務器。
    uploadFile() {
      this.Loading_small = true
      const uploadedFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/upload`
      this.$http.post(url, formData).then((response) => {
        console.log(response)
        if (response.data.success) {
          this.tempStory.imageUrl = response.data.imageUrl
          this.Loading_small = false
        }
      })
    },
    //* 標籤
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.InputRef.focus()
      })
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.dynamicTags.push(this.inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style lang="scss">
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-datetime-picker .block:last-child {
  border-right: none;
}

.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.el-form {
  .el-form-item__label {
    display: none !important;
  }
}

// 編輯器圖片設定
:root {
  --ck-image-style-spacing: 1.5em;
}

.image-style {
  .image-style-side,
  .image-style-align-left,
  .image-style-align-center,
  .image-style-align-right {
    max-width: 50%;
  }

  .image-style-side {
    float: right;
    margin-left: var(--ck-image-style-spacing);
  }

  .image-style-align-left {
    float: left;
    margin-right: var(--ck-image-style-spacing);
  }

  .image-style-align-center {
    margin-left: auto;
    margin-right: auto;
  }

  .image-style-align-right {
    float: right;
    margin-left: var(--ck-image-style-spacing);
  }
}

// 影片
.media > div {
  width: 100%;
}
</style>
