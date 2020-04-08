import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newAnime: [],
    allAnime: [{ title: "qwe", img: "123" }],
    search: "",
  },
  mutations: {
    getNewAnime(state) {
      window.getNewAnimeList().then((result) => {
        state.newAnime = JSON.parse(result);
      });
    },
    getAllAnime(state) {
      window.getAllAnimeList().then((result) => {
        state.allAnime = JSON.parse(result);
      });
    },
    changeSearch(state, searchText) {
      state.search = searchText;
    },
  },
  actions: {},
  modules: {},
  getters: {
    newAnime: (state) => {
      return state.newAnime;
    },
    allAnime: (state) => {
      return state.allAnime;
    },
    search: (state) => {
      return state.search;
    },
    filteredAnime: (state) => {
      return state.allAnime.filter(
        (anime) => anime.title.indexOf(state.search) >= 0
      );
    },
  },
});
