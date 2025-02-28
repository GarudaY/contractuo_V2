<template>
  <div class="flex items-center justify-center pt-3">
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Spaceflight Articles</h1>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">Published</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="cursor-pointer hover:bg-gray-200"
            v-for="article in paginatedArticles"
            :key="article.id"
            @click="openArticle(article.id)"
          >
            <td class="border px-4 py-2">{{ article.title }}</td>
            <td class="border px-4 py-2">
              {{ formatDate(article.published_at) }}
            </td>
          </tr>
        </tbody>
      </table>
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
  },
  methods: {
    ...mapActions(["fetchArticles"]),
    openArticle(id) {
      this.$router.push(`/article/${id}`);
    },
    formatDate(date) {
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(date).toLocaleString(undefined, options);
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  created() {
    this.fetchArticles();
  },
};
</script>
