<template>
  <v-row>
    <AnimeCard
      v-for="anime in animeData"
      :key="anime.ref"
      :animeImg="anime.img"
      :title="anime.title"
      :remoteImg="anime.remote_img"
    ></AnimeCard>
    <v-pagination
      v-model="page"
      :length="maxPage"
      total-visible="10"
      v-show="showPagination"
    ></v-pagination>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AnimeCard from "@/components/AnimeCard.vue";
@Component({
  components: { AnimeCard }
})
export default class AllAnimePage extends Vue {
  animeData: {
    ref: string;
    img: string;
    title: string;
    remote_img: string;
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
    });
  }
  @Watch("search")
  OnSearchChange() {
    if (this.search != "") {
      this.showPagination = false;
      window.getAnimesByFilter(this.search).then(result => {
        this.animeData = JSON.parse(result);
      });
    } else {
      this.showPagination = true;
      window.getAnimesByPage(this.page).then(result => {
        this.animeData = JSON.parse(result);
      });
    }
  }
}
</script>
