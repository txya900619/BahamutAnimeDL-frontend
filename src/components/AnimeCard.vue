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
          ? 'rgba(0,0,0,0) 1%,#42A5F5'
          : 'to bottom,rgba(0,0,0,0),rgba(0,0,0,.5)'
      "
      lazy-src="@/assets/empty.png"
    >
      <v-card-title
        v-text="animeTitle"
        style="font-size: 20px; max-width: 100%;"
        class="d-inline-block text-truncate"
      ></v-card-title>
      <v-dialog v-model="dialog">
        <AnimeDialog :sns="dialogSns" :title="animeTitle"></AnimeDialog>
      </v-dialog>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import AnimeDialog from "./AnimeDialog.vue";
@Component({ components: { AnimeDialog } })
export default class AnimeCard extends Vue {
  @Prop(String) animeImg?: string;
  @Prop(String) animeTitle?: string;
  @Prop(String) animeSn?: string;
  @Prop(String) animeRef?: string;
  @Prop(Number) indexInPage?: number;
  @Prop() readonly isSelected?: boolean;

  src = this.animeImg;
  timer: number | null | undefined = null;
  firstSelected = false;
  dialog = false;
  dialogSns = { "1": [{ sn: "0", number: "1" }] };

  get selectMode() {
    return this.$store.getters.selectMode;
  }

  cancelTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  async onClick() {
    this.cancelTimer();
    if (this.firstSelected) {
      this.firstSelected = false;
      return;
    }
    if (this.selectMode) {
      this.clickOnSelectMode();
    } else {
      if (this.animeSn) {
        this.dialogSns = await window.getAnimeAllSn(this.animeSn);
      }
      if (this.animeRef) {
        const realSn = await window.getRealSn(this.animeRef);
        this.dialogSns = await window.getAnimeAllSn(realSn);
      }
      this.dialog = true;
    }
  }

  onMouseDown() {
    if (!this.selectMode) this.timer = setTimeout(this.clickOnSelectMode, 500);
  }

  @Emit("click-on-select-mode")
  clickOnSelectMode() {
    if (!this.selectMode) {
      this.firstSelected = true;
      this.$store.commit("toSelectMode");
    }
    if (this.animeRef) return { index: this.indexInPage, ref: this.animeRef };
    else return { index: this.indexInPage, sn: this.animeSn };
  }
}
</script>
