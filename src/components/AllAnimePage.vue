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
  get animeData() {
    if (this.search == "") {
      return this.$store.getters.allAnime;
    }
    return this.$store.getters.filteredAnime;
  }
  get search() {
    return this.$store.getters.search;
  }
}
</script>
