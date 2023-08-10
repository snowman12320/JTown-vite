import loginMixin from './loginMixin';
export default {
  inject: ['emitter'],
  mixins: [loginMixin],
  data () {
    return {
      isFavorite: false,
      favoriteData: [],
      checkFavorite: false
    };
  },
  created () {
    this.getFavoriteData(); //! 用其他電腦，先新增本地陣列
  },
  methods: {
    updateFavo (id) {
      this.isLoading = true;
      this.checkFavorite = Boolean(
        localStorage.getItem('favorite').indexOf(id) !== -1
      ); //* 搜尋目標
      if (this.checkFavorite) {
        //* 存在就刪除
        this.isFavorite = false; //* 改成無收藏按鈕
        // this.emitter.emit('push-message', {
        //   style: 'danger',
        //   title: '移除我的收藏'
        // });
        this.$toast('success', 'delete favorite.');
        // 刪除
        this.favoriteData = JSON.parse(localStorage.getItem('favorite'));
        // console.log(this.favoriteData);
        const index = this.favoriteData.indexOf(id);
        // console.log(index);
        if (index > -1) {
          this.favoriteData.splice(index, 1);
          localStorage.setItem('favorite', JSON.stringify(this.favoriteData));
        }
        this.isLoading = false;
      } else {
        //* 不存在就儲存
        this.isFavorite = true; //* 改成收藏按鈕
        // this.emitter.emit('push-message', {
        //   style: 'success',
        //   title: '加入我的收藏'
        // });
        this.$toast('success', 'add to favorite.');
        // 新增
        this.favoriteData.push(id);
        localStorage.setItem('favorite', JSON.stringify(this.favoriteData));
      }
      this.emitter.emit('customEvent_updateFavorite'); //! 觸發收藏表更新
      this.isLoading = false;
    },
    getFavoriteData () {
      // localStorage.clear();
      if (localStorage.getItem('favorite')) {
        this.favoriteData = JSON.parse(localStorage.getItem('favorite'));
        const checkFavorite = Boolean(
          JSON.parse(localStorage.getItem('favorite')).indexOf(this.id) !== -1
        ); //* 搜尋目標
        if (checkFavorite) {
          this.isFavorite = true;
        } else {
          this.isFavorite = false;
        }
      } else {
        localStorage.setItem('favorite', JSON.stringify(this.favoriteData));
      }
    }
  }
};
