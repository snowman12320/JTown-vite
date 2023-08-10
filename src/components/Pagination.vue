<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item ">
        <!-- 透過傳入的props去判斷 -->
        <a @click.prevent="prevPage(pages.current_page)" :class="{ 'text-secondary disabled': !pages.has_pre }"
          class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" :key="page"
        :class="{ active: page === pages.current_page }">
        <!-- 透過emit傳出選擇頁數 -->
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item">
        <a @click.prevent="nextPage(pages.current_page)" :class="{ 'text-secondary disabled': !pages.has_next }" href="#"
          aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('emit-pages', page);
    },
    prevPage (page) {
      if (this.pages.has_pre) {
        this.$emit('emit-pages', page -= 1);
      }
    },
    nextPage (page) {
      if (this.pages.has_next) {
        this.$emit('emit-pages', page += 1);
      }
    }
  }
};
</script>
<style>
.disabled {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
