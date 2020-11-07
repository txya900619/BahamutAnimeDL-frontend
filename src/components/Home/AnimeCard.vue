<template>
  <div class="anime-card">
    <div class="title">{{ info.title }}</div>

    <img :src="info.cover" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { animeInfo } from "../../types/AnimeCard";
export default defineComponent({
  props: {
    info: { type: Object as PropType<animeInfo>, required: true },
  },
});
</script>
