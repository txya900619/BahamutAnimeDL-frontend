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
        syncedIsSelected
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
        <AnimeDialog :Sns="dialogSns"></AnimeDialog>
      </v-dialog>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Emit,
  Watch,
  PropSync,
} from "vue-property-decorator";
import AnimeDialog from "./AnimeDialog.vue";
@Component({ components: { AnimeDialog } })
export default class AnimeCard extends Vue {
  @Prop(String) animeImg?: string;
  @Prop(String) animeTitle?: string;
  @Prop(String) animeSn?: string;
  @Prop(String) animeRef?: string;
  @Prop(Number) indexInPage?: number;
  @PropSync("isSelected", Boolean) syncedIsSelected?: boolean;
  src = this.animeImg;
  timer: number | null | undefined = null;
  firstSelected = false;
  dialog = false;
  dialogSns = [{ sn: "0", number: "1" }];
  get selectMode() {
    return this.$store.getters.selectMode;
  }
  @Watch("selectMode")
  onSelectModeChange() {
    if (!this.selectMode) {
      this.syncedIsSelected = false;
    }
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
        this.dialogSns = JSON.parse(await window.getAnimeAllSn(this.animeSn));
        console.log(this.dialogSns);
      }
      if (this.animeRef) {
        const realSn = await window.getRealSn(this.animeRef);
        this.dialogSns = JSON.parse(await window.getAnimeAllSn(realSn));
      }
      this.dialog = true;
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
    if (this.animeRef) {
      return new Promise((resolve) => {
        resolve({
          isSelected: this.syncedIsSelected,
          index: this.indexInPage,
          ref: this.animeRef,
        });
        this.syncedIsSelected = !this.syncedIsSelected;
      });
    } else {
      return new Promise((resolve) => {
        resolve({
          isSelected: this.syncedIsSelected,
          sn: this.animeSn,
        });
        this.syncedIsSelected = !this.syncedIsSelected;
      });
    }
  }
}
</script>
