<template>
  <div>
    <v-row>
      <v-col
        md="4"
        lg="2"
        cols="6"
        v-for="(anime, index) in animeData"
        :key="anime.ref"
      >
        <AnimeCard
          :indexInPage="index"
          :animeImg="anime.img"
          :animeTitle="anime.title"
          :animeRef="anime.ref"
          :isSelectedOnRender="selectedIndexInPages[page - 1][index]"
          @clickOnSelectMode="clickOnSelectMode"
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
  selectedAnimes: string[] = [];
  selectedIndexInPages: boolean[][] = [];

  async mounted() {
    this.maxPage = await window.getMaxPage();
    for (let i = 0; i < this.maxPage; i++) {
      const defaultSet: boolean[] = [];
      for (let j = 0; j < 18; j++) {
        defaultSet.push(false);
      }
      this.selectedIndexInPages.push(defaultSet);
    }
    this.animeData = JSON.parse(await window.getAnimesByPage(1));
  }
  @Watch("page")
  OnPageChange() {
    window.getAnimesByPage(this.page).then((result) => {
      this.animeData = JSON.parse(result);
    });
  }
  async clickOnSelectMode(info: {
    isSelect: boolean;
    index: number;
    ref: string;
  }) {
    this.selectedIndexInPages[this.page - 1][info.index] = !info.isSelect;
    const sn = await window.getRealSn(info.ref);
    if (info.isSelect) {
      this.selectedAnimes = this.selectedAnimes.filter((value) => value !== sn);
    } else {
      this.selectedAnimes.push(sn);
    }
  }
}
</script>
