import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newAnime: [],
    search: ""
  },
  mutations: {
    getNewAnime(state) {
      window.getNewAnimeList().then(result => {
        state.newAnime = JSON.parse(result);
      });
    },
    changeSearch(state, searchText) {
      state.search = searchText;
    }
  },
  actions: {},
  modules: {},
  getters: {
    newAnime: state => {
      return state.newAnime;
    },
    search: state => {
      return state.search;
    }
  }
});
