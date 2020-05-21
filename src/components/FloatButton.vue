<template>
  <div>
    <v-fab-transition>
      <v-btn
        fab
        right
        bottom
        fixed
        class="mr-1 mb-3"
        color="blue darken-3"
        @click="dialog = true"
      >
        <v-icon x-large color="grey lighten-3">
          mdi-arrow-down-bold
        </v-icon>
      </v-btn>
    </v-fab-transition>
    <v-dialog v-model="dialog" max-width="40%">
      <v-card> </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class FloatButton extends Vue {
  dialog = false;
  queue = [];
  async mounted() {
    setInterval(() => {
      this.updateQueue();
    }, 2000);
  }
  async updateQueue() {
    this.queue = await window.getDownloadQueue();
    console.log(this.queue);
  }
}
</script>
