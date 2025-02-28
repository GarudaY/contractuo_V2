import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
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
  },
  getters: {
    getArticles: (state) => state.articles,
  },
});
