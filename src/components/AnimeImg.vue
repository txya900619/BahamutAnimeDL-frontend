<template>
  <v-img
    :src="src"
    height="100%"
    class="white--text align-end"
    gradient="to bottom,rgba(0,0,0,0),rgba(0,0,0,.5)"
    @error="whenImgLoadError"
  >
    <v-card-title
      v-text="title"
      style="font-size: 20px; max-width: 100%;"
      class="d-inline-block text-truncate"
    ></v-card-title>
  </v-img>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class AnimeImg extends Vue {
  @Prop(String) srcURL?: string;
  @Prop(String) title?: string;
  @Prop(String) remoteImg?: string;
  src = this.srcURL;
  whenImgLoadError() {
    console.log(this.remoteImg);
    this.src = this.remoteImg;
  }
}
</script>
