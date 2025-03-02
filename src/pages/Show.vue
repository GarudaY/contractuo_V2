<template>
  <div class="flex justify-center items-center min-h-screen px-4">
    <div
      class="w-full max-w-2xl bg-white rounded-lg p-6 text-center custom-shadow"
    >
      <button
        @click="$router.push('/')"
        class="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back to articles
      </button>

      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        {{ article?.title || "Loading..." }}
      </h1>

      <div v-if="article?.image_url" class="mb-4">
        <img
          :src="article.image_url"
          :alt="article.title"
          class="w-full max-h-80 object-cover rounded-lg shadow-2xl"
        />
      </div>

      <p class="text-gray-700 text-lg leading-relaxed mb-6">
        {{ article?.summary || "No summary available." }}
      </p>

      <a
        v-if="article?.url"
        :href="article.url"
        target="_blank"
        class="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-2xl hover:bg-blue-600 transition-all"
      >
        Read Full Article
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      article: null,
    };
  },
  computed: {
    ...mapGetters(["getArticles"]),
  },
  methods: {
    async loadArticle() {
      const id = this.$route.params.id;
      const storedArticle = this.getArticles.find((a) => a.id == id);

      if (storedArticle) {
        this.article = storedArticle;
      } else {
        try {
          const response = await fetch(
            `https://api.spaceflightnewsapi.net/v4/articles/${id}`
          );
          const data = await response.json();
          this.article = data;
        } catch (error) {
          console.error("Error loading article:", error);
        }
      }
    },
  },
  created() {
    this.loadArticle();
  },
};
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0px 0px 30px 0px gray;
}
</style>
