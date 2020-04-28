<template>
  <v-app id="inspire">
    <Bar></Bar>
    <v-content>
      <v-container>
        <router-view v-show="showPage" />
        <SearchPage v-show="!showPage">> </SearchPage>
      </v-container>
      <FloatButton></FloatButton>
      <v-progress-circular
        style="position:fixed; right:17px; bottom:25px;"
        size="62"
        value="90"
        color=""
      >
      </v-progress-circular>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Bar from "../components/Bar.vue";
import SearchPage from "../components/SearchPage.vue";
import FloatButton from "../components/FloatButton.vue";
import ProgressCircle from "../components/ProgressCircle.vue";
import store from "../store";
@Component({ components: { Bar, SearchPage, FloatButton, ProgressCircle } })
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
