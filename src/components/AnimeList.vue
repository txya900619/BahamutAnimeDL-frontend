<template>
  <v-row>
    <v-col
      md="4"
      :lg="lgSize"
      cols="6"
      v-for="(anime, index) in animeData"
      :key="anime.sn ? anime.sn : anime.ref"
    >
      <AnimeCard
        :animeImg="anime.img"
        :animeTitle="anime.title"
        :animeSn="anime.sn"
        :animeRef="anime.ref"
        @longPress="select(index)"
      ></AnimeCard>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnimeCard from "./AnimeCard.vue";
@Component({ components: { AnimeCard } })
export default class AnimeList extends Vue {
  @Prop(Array) animeData?: {
    ref: string | undefined;
    sn: string | undefined;
    img: string;
    title: string;
  }[];
  @Prop(String) size?: string;
  get lgSize() {
    if (this.size === "big") {
      return 2;
    } else {
      return 3;
    }
  }
  select(index: number) {
    console.log(index);
  }
}
</script>
