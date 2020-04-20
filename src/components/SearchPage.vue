<template>
  <v-row>
    <v-col md="4" lg="2" cols="6" v-for="anime in animeData" :key="anime.ref">
      <AnimeCard
        :animeImg="anime.img"
        :animeTitle="anime.title"
        :animeRef="anime.ref"
        @clickOnSelectMode="clickOnSelectMode"
      ></AnimeCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AnimeCard from "@/components/AnimeCard.vue";
@Component({ components: { AnimeCard } })
export default class SearchPage extends Vue {
  animeData: {
    ref: string;
    img: string;
    title: string;
  }[] = [];
  searchUpdateTime = 0;
  selectedAnimes: string[] = [];
  get search() {
    return this.$store.getters.search;
  }
  get selectMode() {
    return this.$store.getters.selectMode;
  }
  async sleep(time: number) {
    return new Promise((r) => setTimeout(r, time));
  }
  @Watch("search")
  async OnSearchChange() {
    if (this.search != "") {
      this.searchUpdateTime = new Date().valueOf();
      await this.sleep(500);
      const nowTime = new Date().valueOf();
      if (nowTime - this.searchUpdateTime < 500) {
        return;
      }
      window.getAnimesByFilter(this.search).then((result) => {
        this.animeData = JSON.parse(result);
      });
    } else {
      this.searchUpdateTime = new Date().valueOf();
      this.animeData = [];
    }
  }
  @Watch("selectMode")
  onSelectModeChange() {
    if (!this.selectMode) {
      this.selectedAnimes = [];
    }
  }
  async clickOnSelectMode(info: {
    isSelect: boolean;
    index: number;
    ref: string;
  }) {
    const sn = await window.getRealSn(info.ref);
    if (info.isSelect) {
      this.selectedAnimes = this.selectedAnimes.filter((value) => value !== sn);
    } else {
      this.selectedAnimes.push(sn);
    }
  }
}
</script>
