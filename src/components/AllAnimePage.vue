<template>
  <div>
    <v-row>
      <v-col md="4" lg="2" cols="6" v-for="anime in animeData" :key="anime.ref">
        <AnimeCard
          :v-show="active ? false : true"
          :animeImg="anime.img"
          :animeTitle="anime.title"
          :animeRef="anime.ref"
          @click="toggle"
        ></AnimeCard>
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="maxPage"
      total-visible="10"
      v-show="showPagination"
    ></v-pagination>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AnimeCard from "@/components/AnimeCard.vue";
@Component({ components: { AnimeCard } })
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
    window.getAnimesByPage(1).then((result) => {
      this.animeData = JSON.parse(result);
    });
    window.getMaxPage().then((result) => {
      this.maxPage = result;
    });
  }
  @Watch("page")
  OnPageChange() {
    window.getAnimesByPage(this.page).then((result) => {
      this.animeData = JSON.parse(result);
      console.log(this.animeData);
    });
  }
}
</script>
