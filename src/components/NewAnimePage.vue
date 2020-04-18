<template>
  <v-row>
    <v-col md="4" lg="3" cols="6" v-for="anime in animeData" :key="anime.sn">
      <AnimeCard
        :animeImg="anime.img"
        :animeTitle="anime.title"
        :animeSn="anime.sn"
      ></AnimeCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnimeCard from "@/components/AnimeCard.vue";
@Component({ components: { AnimeCard } })
export default class NewAnimePage extends Vue {
  get animeData() {
    return this.$store.getters.newAnime;
  }
}
</script>
