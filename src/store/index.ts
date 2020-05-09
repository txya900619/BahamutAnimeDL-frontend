import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newAnime: [],
    search: "",
    selectMode: false
  },
  mutations: {
    getNewAnime(state) {
      window.getNewAnimeList().then(result => {
        state.newAnime = result;
      });
    },
    changeSearch(state, searchText) {
      state.search = searchText;
    },
    toSelectMode(state) {
      state.selectMode = true;
    },
    unSelectMode(state) {
      state.selectMode = false;
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
    },
    selectMode: state => {
      return state.selectMode;
    }
  }
});
