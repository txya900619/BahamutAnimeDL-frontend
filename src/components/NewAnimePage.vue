<template>
  <v-row>
    <AnimeCard
      v-for="anime in animeData"
      :key="anime.sn"
      :animeImg="anime.img"
      :title="anime.title"
    ></AnimeCard>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnimeCard from "@/components/AnimeCard.vue";
@Component({
  components: { AnimeCard },
})
export default class NewAnimePage extends Vue {
  get animeData() {
    return this.$store.getters.newAnime;
  }
}
</script>
