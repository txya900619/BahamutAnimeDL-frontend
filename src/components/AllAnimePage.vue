<template>
  <v-item-group>
    <AnimeList size="big" :animeData="animeData" />
    <v-pagination
      v-model="page"
      :length="maxPage"
      total-visible="10"
      v-show="showPagination"
    ></v-pagination>
  </v-item-group>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AnimeList from "@/components/AnimeList.vue";
@Component({
  components: { AnimeList }
})
export default class AllAnimePage extends Vue {
  animeData: {
    ref: string;
    img: string;
    title: string;
  }[] = [];
  page = 1;
  maxPage = 0;
  showPagination = true;
  get search() {
    return this.$store.getters.search;
  }
  mounted() {
    window.getAnimesByPage(1).then(result => {
      this.animeData = JSON.parse(result);
    });
    window.getMaxPage().then(result => {
      this.maxPage = result;
    });
  }
  @Watch("page")
  OnPageChange() {
    window.getAnimesByPage(this.page).then(result => {
      this.animeData = JSON.parse(result);
      console.log(this.animeData);
    });
  }
}
</script>
