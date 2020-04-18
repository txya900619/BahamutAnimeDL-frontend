<template>
  <v-card
    height="100%"
    @mousedown="onMouseDown"
    @mouseout="cancelTimer"
    @click="onClick"
  >
    <v-img
      :src="src"
      height="100%"
      class="white--text align-end"
      :gradient="
        isSelected
          ? 'rgba(0,0,0,0) 1%,#42A5F5 '
          : 'to bottom,rgba(0,0,0,0),rgba(0,0,0,.5)'
      "
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
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
@Component
export default class AnimeCard extends Vue {
  @Prop(String) animeImg?: string;
  @Prop(String) animeTitle?: string;
  @Prop(String) animeSn?: string;
  @Prop(String) animeRef?: string;
  @Prop(Number) indexInPage?: number;
  @Prop(Boolean) isSelectedOnRender?: boolean;
  src = this.animeImg;
  timer: number | null | undefined = null;
  firstSelected = false;
  isSelected = this.isSelectedOnRender;

  get selectMode() {
    return this.$store.getters.selectMode;
  }
  @Watch("selectMode")
  onSelectModeChange() {
    if (!this.selectMode) {
      this.isSelected = false;
    }
  }
  cancelTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  onClick() {
    this.cancelTimer();
    if (this.firstSelected) {
      this.firstSelected = false;
      return;
    }
    if (this.selectMode) {
      this.clickOnSelectMode();
    }
  }

  onMouseDown() {
    if (!this.selectMode) {
      this.timer = setTimeout(this.clickOnSelectMode, 500);
    }
  }
  @Emit("clickOnSelectMode")
  clickOnSelectMode() {
    if (!this.selectMode) {
      this.firstSelected = true;
      this.$store.commit("toSelectMode");
    }
    return new Promise(resolve => {
      resolve({
        isSelected: this.isSelected,
        index: this.indexInPage,
        ref: this.animeRef
      });
      this.isSelected = !this.isSelected;
    });
  }
}
</script>
