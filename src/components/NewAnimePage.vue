<template>
  <v-row>
    <AnimeCard
      v-for="anime in animeData"
      :key="anime.title"
      :animeImg="anime.img"
      :title="anime.title"
    ></AnimeCard>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnimeCard from "@/components/AnimeCard.vue";
@Component({
  components: { AnimeCard }
})
export default class NewAnimePage extends Vue {
  animeData = {};
  mounted() {
    const vm = this;
    window.getAnimeList().then(result => {
      vm.animeData = JSON.parse(result);
    });
  }
}
</script>
