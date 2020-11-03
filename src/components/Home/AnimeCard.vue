<template>
  <div>{{ info }}</div>
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
