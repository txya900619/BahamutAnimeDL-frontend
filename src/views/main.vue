<template>
  <v-app id="inspire">
    <Bar></Bar>
    <v-content>
      <v-container>
        <div v-show="showPage">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
        <div v-show="!showPage">
          <keep-alive>
            <SearchPage> </SearchPage>
          </keep-alive>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Bar from "../components/Bar.vue";
import SearchPage from "../components/SearchPage.vue";
import store from "../store";
@Component({ components: { Bar, SearchPage } })
export default class Main extends Vue {
  showPage = true;
  get search() {
    return store.getters.search;
  }
  @Watch("search")
  OnSearchChange() {
    if (this.search === "") {
      this.showPage = true;
    } else {
      this.showPage = false;
    }
  }
}
</script>
