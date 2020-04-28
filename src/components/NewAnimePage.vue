<template>
  <v-row>
    <v-col
      md="4"
      lg="3"
      cols="6"
      v-for="(anime, index) in animeData"
      :key="anime.sn"
    >
      <AnimeCard
        :animeImg="anime.img"
        :animeTitle="anime.title"
        :animeSn="anime.sn"
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
export default class NewAnimePage extends Vue {
  selectedAnimes: string[] = [];
  animeSelectStatus: boolean[] = [];
  get animeData() {
    return this.$store.getters.newAnime;
  }
  get selectMode() {
    return this.$store.getters.selectMode;
  }
  @Watch("animeData")
  onAnimeData() {
    const newSelectArr = [];
    for (let i = 0; i < this.animeData.length; i++) {
      newSelectArr.push(false);
    }
    this.animeSelectStatus = newSelectArr;
  }
  @Watch("selectMode")
  onSelectModeChange() {
    if (!this.selectMode) {
      this.selectedAnimes = [];
    }
  }
  clickOnSelectMode(info: { isSelect: boolean; sn: string }) {
    if (info.isSelect) {
      this.selectedAnimes = this.selectedAnimes.filter(
        (value) => value !== info.sn
      );
    } else {
      this.selectedAnimes.push(info.sn);
    }
  }
}
</script>
