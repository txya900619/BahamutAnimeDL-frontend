<template>
  <AnimeList :animeData="animeData" size="small"></AnimeList>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnimeList from "@/components/AnimeList.vue";
@Component({
  components: { AnimeList }
})
export default class NewAnimePage extends Vue {
  get animeData() {
    return this.$store.getters.newAnime;
  }
}
</script>
