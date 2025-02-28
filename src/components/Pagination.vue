<template>
  <div class="flex justify-center space-x-2 mt-4">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      Back
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      :class="[
        `px-4 py-2 rounded`,
        page === currentPage ? `bg-blue-500 text-white` : `bg-gray-200`,
      ]"
    >
      {{ page }}
    </button>
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: Number,
    itemsPerPage: Number,
    currentPage: Number,
    onPageChange: Function,
  },

  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.onPageChange(page);
      }
    },
  },
};
</script>
