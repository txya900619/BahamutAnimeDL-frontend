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
      <v-card>
        <v-card-title>下載序列</v-card-title>
        <v-list>
          <v-list-item v-for="item in queue" :key="item.name + item.ep">
            <v-list-item-content>
              <v-list-item-title>{{
                item.name + " [" + item.ep + "]"
              }}</v-list-item-title>
              <v-progress-linear
                v-if="item.downloading == 1"
                :buffer-value="100"
                :value="
                  (downloadingStatus[item.sequence - 1] /
                    (item.numberOfChunk + 1)) *
                    100
                "
              ></v-progress-linear>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class FloatButton extends Vue {
  dialog = false;
  queue = [
    {
      downloading: 0,
      ep: "0",
      name: "",
      numberOfChunk: 1,
      sequence: 1,
      sn: 1,
      spacial: 1,
      stop: 0,
    },
  ];
  downloadingStatus = [1];
  async mounted() {
    setInterval(() => {
      this.updateQueue();
    }, 500);
  }
  async updateQueue() {
    const result = await window.getDownloadQueue();
    console.log(result);
    this.queue = result.queue;
    this.downloadingStatus = result.downloading_status;
  }
}
</script>
