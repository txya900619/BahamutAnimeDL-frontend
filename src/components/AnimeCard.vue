<template>
  <v-card height="100%">
    <v-img
      :src="src"
      height="100%"
      class="white--text align-end"
      gradient="to bottom,rgba(0,0,0,0),rgba(0,0,0,.5)"
      lazy-src="@/assets/empty.png"
    >
      <v-card-title
        v-text="title"
        style="font-size: 20px; max-width: 100%;"
        class="d-inline-block text-truncate"
      ></v-card-title>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component
export default class AnimeCard extends Vue {
  @Prop(String) animeImg?: string;
  @Prop(String) title?: string;
  src = this.animeImg;
}
</script>
