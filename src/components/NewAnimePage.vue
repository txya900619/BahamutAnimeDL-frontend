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
        :indexInPage="index"
        :isSelected="animeSelectStatus[index]"
        @click-on-select-mode="clickOnSelectMode"
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
      const newSelectArr = [];
      for (let i = 0; i < this.animeData.length; i++) {
        newSelectArr.push(false);
      }
      this.animeSelectStatus = newSelectArr;
      this.selectedAnimes = [];
    }
  }

  clickOnSelectMode(info: { index: number; sn: string }) {
    this.$set(
      this.animeSelectStatus,
      info.index,
      !this.animeSelectStatus[info.index]
    );
    if (!this.animeSelectStatus[info.index]) {
      this.selectedAnimes = this.selectedAnimes.filter(
        (value) => value !== info.sn
      );
      if (this.selectedAnimes.length <= 0) {
        this.$store.commit("unSelectMode");
      }
    } else {
      this.selectedAnimes.push(info.sn);
    }
  }
}
</script>
