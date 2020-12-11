<template>
  <div
    class="virtual-anime-card-list"
    @scroll="
      (e) => {
        scrollTop = e.target.scrollTop;
      }
    "
  >
    <div
      class="virtual-anime-card-list-content"
      :style="{
        height:
          (Math.floor(props.animes.length / rowElementAmount) + 1) *
            props.rowHeight +
          'px',
      }"
    >
      <div class="visible-nodes" :style="{ 'margin-top': marginTop + 'px' }">
        <AnimeCard
          v-for="anime in realList"
          :key="'search-list-' + anime.anime_sn"
          :info="anime"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { animeInfo } from "../../types/AnimeCard";
import AnimeCard from "./AnimeCard.vue";
export default defineComponent({
  name: "VirtualAnimeCardList",
  components: { AnimeCard },
  props: {
    childWidth: { type: Number, required: true },
    rowHeight: { type: Number, required: true },
    animes: { type: Object as () => animeInfo[], required: true },
    viewportHeightMutiple: { type: Number, required: true },
    viewportWidthMutiple: { type: Number, required: true },
  },
  setup(props) {
    const scrollTop = ref(0);
    const windowHeight = ref(window.innerHeight);
    const windowWidth = ref(window.innerWidth);

    onMounted(() => {
      window.addEventListener("resize", () => {
        windowHeight.value = window.innerHeight;
        windowWidth.value = window.innerWidth;
      });
    });

    const topRowIndex = computed(() => {
      const index = Math.floor(scrollTop.value / props.rowHeight) - 1;
      if (index < 0) {
        return 0;
      }
      return index;
    });

    const marginTop = computed(() => topRowIndex.value * props.rowHeight);
    const rowElementAmount = computed(() =>
      Math.floor(
        (windowWidth.value * props.viewportWidthMutiple) /
          (props.childWidth + 32)
      )
    );
    const realList = computed(() => {
      const rowAmount = Math.ceil(
        (windowHeight.value * props.viewportHeightMutiple) / props.rowHeight
      );
      return props.animes.slice(
        topRowIndex.value * rowElementAmount.value,
        (Math.floor(scrollTop.value / props.rowHeight) + 1 + rowAmount) *
          rowElementAmount.value
      );
    });

    return {
      props,
      topRowIndex,
      scrollTop,
      marginTop,
      realList,
      windowHeight,
      windowWidth,
      rowElementAmount,
    };
  },
});
</script>
