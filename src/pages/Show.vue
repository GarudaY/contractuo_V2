<template>
  <div class="p-4 w-1/2 flex flex-col">
    <h1 class="text-2xl font-bold mb-4">{{ article?.title }}</h1>

    <div v-show="article?.image_url" class="mb-4">
      <img
        :src="article.image_url"
        :alt="article.title"
        class="w-full max-w-2xl rounded shadow-lg"
      />
    </div>

    <p class="mb-4 text-gray-700">{{ article?.summary }}</p>

    <a
      v-show="article?.url"
      :href="article.url"
      target="_blank"
      class="text-blue-500 underline"
    >
      Read original article
    </a>
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
          console.error("Error loading articles:", error);
        }
      }
    },
  },
  created() {
    this.loadArticle();
  },
};
</script>
