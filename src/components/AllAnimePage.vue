<template>
  <v-row>
    <AnimeCard
      v-for="anime in animeData"
      :key="anime.ref"
      :animeImg="anime.img"
      :title="anime.title"
      :remoteImg="anime.remote_img"
    ></AnimeCard>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const AnimeCard = () => import("@/components/AnimeCard.vue");
@Component({
  components: { AnimeCard },
})
export default class AllAnimePage extends Vue {
  animeData: {
    ref: string;
    img: string;
    title: string;
    remote_img: string;
  }[] = [];
  get animeDataArr() {
    return this.$store.getters.allAnime;
  }
  get search() {
    return this.$store.getters.search;
  }
  mounted() {
    const animeArr = this.$store.getters.allAnime;
    for (let i = 0; i < animeArr.length; i++) {
      if ((i + 1) * 10 < animeArr.length) {
        setTimeout(() => {
          this.animeData.push(...animeArr.slice(i * 10, (i + 1) * 10));
        }, 200 * i);
      } else {
        setTimeout(() => {
          this.animeData.push(...animeArr.slice(i * 10, animeArr.length - 1));
        }, 200 * i);
        break;
      }
    }
  }
}
</script>
