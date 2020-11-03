<template>
  <div>
    <AnimeCard
      :key="animeInfo.video_sn"
      v-for="animeInfo in anime.new_anime.date"
      :info="animeInfo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import AnimeCard from "../components/Home/AnimeCard.vue";
import Axios from "axios";
import { animeIndexResponseBody, animeInfo } from "@/types/AnimeCard";
export default defineComponent({
  name: "Home",
  components: {
    AnimeCard,
  },
  setup() {
    let anime: Ref<animeIndexResponseBody> = ref(new animeIndexResponseBody());
    onMounted(async () => {
      anime.value = (await Axios.get("/api/anime/v1/index.php")).data;
    });
    return { anime };
  },
});
</script>
