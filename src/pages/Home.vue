<template>
  <div id="home">
    <!-- <h1>本季新番</h1> -->
    <AnimeCard
      :key="animeInfo.video_sn"
      v-for="animeInfo in animeInfos"
      :info="animeInfo"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, Ref, ref } from "vue";
import AnimeCard from "../components/shared/AnimeCard.vue";
import Axios from "axios";
import { animeIndexResponseBody } from "@/types/AnimeCard";
import "@/assets/scss/pages/home.scss";
import Store from "@/store";
export default defineComponent({
  name: "Home",
  components: {
    AnimeCard,
  },
  setup() {
    const sortByPopular = inject(Store.homeSortByPopular, ref(false));
    let anime: Ref<animeIndexResponseBody> = ref(new animeIndexResponseBody());
    onMounted(async () => {
      anime.value = (await Axios.get("/api/anime/v1/index.php")).data;
    });
    const animeInfos = computed(() => {
      if (sortByPopular.value) {
        return anime.value.new_anime.popular;
      } else {
        return anime.value.new_anime.date;
      }
    });
    return { anime, animeInfos };
  },
});
</script>
