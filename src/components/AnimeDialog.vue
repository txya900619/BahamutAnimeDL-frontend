<template>
  <v-card class="py-12">
    <v-card-text>
      <v-row justify="center" align="center">
        <v-btn-toggle>
          <v-btn v-for="oneSn in Sns" :key="oneSn.sn">{{ oneSn.number }}</v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class AnimeDialog extends Vue {
  @Prop(Array) Sns?: {
    sn: string;
    number: string;
  }[];
}
</script>
