import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
    sortOrder: {
      title: "asc",
      published: "asc",
    },
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
    sortArticlesByTitle(state) {
      state.articles.sort((a, b) => {
        if (state.sortOrder.title === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
      state.sortOrder.title = state.sortOrder.title === "asc" ? "desc" : "asc";
    },
    sortArticlesByPublished(state) {
      state.articles.sort((a, b) => {
        if (state.sortOrder.published === "asc") {
          return new Date(a.published_at) - new Date(b.published_at);
        } else {
          return new Date(b.published_at) - new Date(a.published_at);
        }
      });
      state.sortOrder.published =
        state.sortOrder.published === "asc" ? "desc" : "asc";
    },
  },
  actions: {
    async fetchArticles({ commit }) {
      try {
        const response = await axios.get(
          "https://api.spaceflightnewsapi.net/v4/articles/",
          {
            params: {
              limit: 100,
            },
          }
        );
        commit("setArticles", response.data.results);
      } catch (error) {
        console.error("Error loading articles:", error);
      }
    },
    sortArticlesByTitle({ commit }) {
      commit("sortArticlesByTitle");
    },
    sortArticlesByPublished({ commit }) {
      commit("sortArticlesByPublished");
    },
  },
  getters: {
    getArticles: (state) => state.articles,
  },
});
