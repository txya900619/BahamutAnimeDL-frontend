<template>
  <v-card class="py-12">
    <v-card-text>
      <v-row justify="center" align="center">
        <v-btn-toggle>
          <v-btn>1</v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class AnimeDialog extends Vue {}
</script>
