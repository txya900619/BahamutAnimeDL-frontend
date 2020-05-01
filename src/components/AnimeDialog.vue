<template>
  <v-card>
    <v-container fluid>
      <v-card-title>{{ title }} </v-card-title>
      <v-row justify="start">
        <v-col v-for="oneSn in sns" :key="oneSn.sn" md="1">
          <v-row justify="center">
            <v-btn>{{ oneSn.number }}</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class AnimeDialog extends Vue {
  @Prop(Array) sns?: {
    sn: string;
    number: string;
  }[];
  @Prop(String) title?: string;
}
</script>
