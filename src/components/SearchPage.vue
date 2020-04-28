<template>
  <v-row>
    <v-col
      md="4"
      lg="2"
      cols="6"
      v-for="(anime, index) in animeData"
      :key="anime.ref"
    >
      <AnimeCard
        :animeImg="anime.img"
        :animeTitle="anime.title"
        :animeRef="anime.ref"
        :isSelected.sync="animeSelectStatus[index]"
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
  animeSelectStatus: boolean[] = [];
  get search() {
    return this.$store.getters.search;
  }
  get selectMode() {
    return this.$store.getters.selectMode;
  }
  async sleep(time: number) {
    return new Promise((r) => setTimeout(r, time));
  }
  @Watch("animeData")
  onAnimeData() {
    const newSelectArr = [];
    for (let i = 0; i < this.animeData.length; i++) {
      newSelectArr.push(false);
    }
    this.animeSelectStatus = newSelectArr;
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
