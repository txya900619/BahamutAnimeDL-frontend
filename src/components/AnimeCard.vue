<template>
  <v-card
    height="100%"
    @mousedown="onMouseDown"
    @mouseout="cancelTimer"
    @click="cancelTimer"
  >
    <v-img
      :src="src"
      height="100%"
      class="white--text align-end"
      gradient="to bottom,rgba(0,0,0,0),rgba(0,0,0,.5)"
      lazy-src="@/assets/empty.png"
    >
      <v-card-title
        v-text="animeTitle"
        style="font-size: 20px; max-width: 100%;"
        class="d-inline-block text-truncate"
      ></v-card-title>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component
export default class AnimeCard extends Vue {
  @Prop(String) animeImg?: string;
  @Prop(String) animeTitle?: string;
  @Prop(String) animeSn?: string;
  @Prop(String) animeRef?: string;
  src = this.animeImg;
  timer: number | null | undefined = null;
  cancelTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  @Emit("longPress")
  checkLongPress() {
    this.timer = null;
  }
  onMouseDown() {
    this.timer = setTimeout(this.checkLongPress, 500);
  }
}
</script>
