<template>
  <v-progress-circular
    style="position:fixed; right:17px; bottom:25px;"
    size="62"
    value="90"
    color=""
  >
  </v-progress-circular>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class ProgressCircle extends Vue {}
</script>
