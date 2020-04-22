<template>
  <v-fab-transition>
    <v-btn fab right bottom fixed class="mr-1 mb-3" color="blue darken-3">
      <v-icon x-large color="grey lighten-3">
        mdi-arrow-down-bold
      </v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class FloatButton extends Vue {}
</script>
