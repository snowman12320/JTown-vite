<template>
  <div class="w-100">
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-3">
      <button class="btn btn-primary" type="button" @click="openModal(true, null)">
        新增文章
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th class="d-md-table-cell d-none" width="120">日期</th>
          <th class="" width="120">標題</th>
          <th class="d-md-table-cell d-none" width="120">作者</th>
          <th class="d-md-table-cell d-none" width="120">內容</th>
          <th class="d-md-table-cell d-none" width="100">是否啟用</th>
          <th class="" width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in storyList" :key="item.id">
          <td class="d-md-table-cell d-none">{{ $filters.dateAndTime(item.create_at) }}</td>
          <td class="">{{ item.title }}</td>
          <td class="d-md-table-cell d-none">{{ item.author }}</td>
          <td class="d-md-inline-block d-none multiline-ellipsis" v-html="item.description"></td>
          <td class="d-md-table-cell d-none">
            <span class="text-success" v-if="item.isPublic">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item.id)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelStoryModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- props傳遞總頁數 emit傳出目前頁數 -->
    <Pagination :pages="pagination" @emit-pages="getStoryList"></Pagination>
    <!-- 更新資料，先帶原始資料進去元件，元件內修改後，再透過emit傳遞觸發函式和資料出來 -->
    <StoryModal ref="storyModal" :story="tempStory" @update-story="updateStory"></StoryModal>
    <!--  -->
    <DelModal :item="tempStory" ref="delModal" @del-item="delStory" />
  </div>
</template>
<script>
import StoryModal from '@/components/StoryModal.vue';
import Pagination from '@/components/Pagination.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  components: {
    StoryModal,
    DelModal,
    Pagination
  },
  inject: ['emitter'],
  data () {
    return {
      storyList: [], //* 原始資料
      pagination: {}, //* 頁數資料
      tempStory: {}, //* 暫存區
      isNew: false, //* 判斷有無資料
      isLoading: false //* 載入效果開關
    };
  },
  created () {
    this.getStoryList();
  },
  methods: {
    // 產品後台 取得遠端資料
    // !透過頁數取得資料
    getStoryList (page = 1) {
      const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/articles/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.storyList = res.data.articles;
          this.pagination = res.data.pagination;
        }
      });
    },
    //! 新增時會帶一個true，編輯時會帶false和資料
    openModal (isNew, id) {
      if (isNew) {
        this.tempStory = {};
      } else {
        this.isLoading = true;
        // !story 的 content 沒有在彈窗正確顯示是因為取得文章列表並沒有 content 這筆資料
        const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/article/${id}`;
        this.$http.get(api).then((res) => {
          if (res.data.success) {
            this.tempStory = res.data.article;
            this.isLoading = false;
          }
        });
      }
      this.isNew = isNew;
      const storyCp = this.$refs.storyModal;
      storyCp.showModal();
    },
    //* 以下進行新增或編輯，使用不同ＡＰＩ
    updateStory (item) {
      this.tempStory = item;
      // 新增
      let api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/article/${item.id}`;
        httpMethod = 'put';
      }
      const storyCp = this.$refs.storyModal;
      this.$http[httpMethod](api, { data: this.tempStory }).then((response) => {
        storyCp.hideModal();
        if (response.data.success) {
          this.getStoryList();
          // ! mitt 跨元件互相溝通，且全域打包
          // this.emitter.emit('push-message', {
          //   style: 'success',
          //   title: '更新成功'
          // });
          this.$httpMessageState(response, '更新');
        } else {
          this.$httpMessageState(response, '更新');
        }
      });
    },
    // 開啟刪除 Modal
    openDelStoryModal (item) {
      this.tempStory = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    delStory () {
      // !塞入要刪除的ＩＤ
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/article/${this.tempStory.id}`;
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, response.data.message);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getStoryList();
      });
    }
  }

};
</script>
<style lang="scss">
tr:nth-child(even) {
  background-color: #eee;
}

tr:hover {
  background-color: rgba(0, 81, 255, 0.227)
}

.single-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 50%;
}

.multiline-ellipsis {
  height: 100px !important;
  /* 太矮會跑版 */

  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    /*  有寬度才能多行  */
    width: 100%;
    height: 70px;
  }

  * {
    color: rgba(0, 0, 0, 0.692) !important;
    font-size: 16px !important;
  }
}
</style>
