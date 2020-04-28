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
          :isSelected="selectedIndexInPages[page - 1][index]"
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
  get selectMode() {
    return this.$store.getters.selectMode;
  }
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
  @Watch("selectMode")
  onSelectModeChange() {
    if (!this.selectMode) {
      const newselectedIndexInPages = [];
      for (let i = 0; i < this.maxPage; i++) {
        const newPages = [];
        for (let j = 0; j < 18; j++) {
          newPages.push(false);
        }
        newselectedIndexInPages.push(newPages);
        this.selectedIndexInPages = newselectedIndexInPages;
      }
      this.selectedAnimes = [];
    }
  }
  async clickOnSelectMode(info: { index: number; ref: string }) {
    this.selectedIndexInPages[this.page - 1][info.index] = !this
      .selectedIndexInPages[this.page - 1][info.index];
    this.$set(
      this.selectedIndexInPages,
      this.page - 1,
      this.selectedIndexInPages[this.page - 1]
    );
    const sn = await window.getRealSn(info.ref);
    if (!this.selectedIndexInPages[this.page - 1][info.index]) {
      this.selectedAnimes = this.selectedAnimes.filter((value) => value !== sn);

      if (this.selectedAnimes.length <= 0) {
        this.$store.commit("unSelectMode");
      }
    } else {
      this.selectedAnimes.push(sn);
    }
    console.log(this.selectedAnimes);
  }
}
</script>
