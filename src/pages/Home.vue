<template>
  <div class="flex items-center justify-center pt-3">
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Spaceflight Articles</h1>
      <div class="overflow-hidden">
        <table ref="tableContainer" class="bg-white border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2 cursor-pointer" @click="sortByTitle">
                Title
                <span class="sort-icon" :class="{ rotated: titleSortAsc }"
                  >▲</span
                >
              </th>
              <th class="px-4 py-2 cursor-pointer" @click="sortByPublished">
                Published
                <span class="sort-icon" :class="{ rotated: publishedSortAsc }"
                  >▲</span
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(article, index) in paginatedArticles"
              :key="article.id"
              @click="openArticle(article.id)"
              class="cursor-pointer hover:bg-gray-200"
              :class="{
                'bg-white': index % 2 === 0,
                'bg-gray-100': index % 2 !== 0,
              }"
            >
              <td class="border px-4 py-2">{{ article.title }}</td>
              <td class="border px-4 py-2 nowrap-cell">
                {{ formatDate(article.published_at) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        :totalItems="articles.length"
        :itemsPerPage="itemsPerPage"
        :currentPage="currentPage"
        :onPageChange="changePage"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Pagination from "@/components/Pagination.vue";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      itemsPerPage: 20,
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters(["getArticles"]),
    articles() {
      return this.getArticles || [];
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.articles.slice(start, end);
    },
    titleSortAsc() {
      return this.$store.state.sortOrder.title === "asc";
    },
    publishedSortAsc() {
      return this.$store.state.sortOrder.published === "asc";
    },
  },
  watch: {
    paginatedArticles() {
      this.updateTableWidth();
    },
  },
  methods: {
    ...mapActions([
      "fetchArticles",
      "sortArticlesByTitle",
      "sortArticlesByPublished",
    ]),
    openArticle(id) {
      this.$router.push(`/article/${id}`);
    },
    formatDate(date) {
      return new Date(date).toLocaleString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    changePage(page) {
      this.currentPage = page;
    },
    sortByTitle() {
      this.sortArticlesByTitle();
    },
    sortByPublished() {
      this.sortArticlesByPublished();
    },
  },
  created() {
    this.fetchArticles();
  },
};
</script>

<style>
.nowrap-cell {
  white-space: nowrap;
  min-width: 140px;
  text-align: center;
}

.sort-icon {
  display: inline-block;
  margin-left: 5px;
  transition: transform 0.3s ease-in-out;
}

.rotated {
  transform: rotate(180deg);
}
</style>
