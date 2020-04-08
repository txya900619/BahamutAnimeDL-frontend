<template>
  <v-col md="4" lg="3" cols="6">
    <v-card height="100%">
      <AnimeImg :srcURL="animeImg" :title="title"> </AnimeImg>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
const AnimeImg = () => import("./AnimeImg.vue");
@Component({ components: { AnimeImg } })
export default class AnimeCard extends Vue {
  @Prop(String) animeImg?: string;
  @Prop(String) title?: string;
  @Prop(String) remoteImg?: string;
}
</script>
