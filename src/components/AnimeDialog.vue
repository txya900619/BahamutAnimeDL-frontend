<template>
  <v-card>
    <v-container fluid>
      <v-card-title>{{ title }} </v-card-title>
      <v-row justify="start" v-if="Object.keys(sns).length < 2">
        <v-col v-for="oneSn in sns['']" :key="oneSn.sn" md="1">
          <v-row justify="center">
            <v-btn>{{ oneSn.number }}</v-btn>
          </v-row>
        </v-col>
      </v-row>
      <div v-else>
        <div style="font-size: 18px;font-weight: bold">本篇</div>
        <v-row justify="start">
          <v-col v-for="oneSn in sns['本篇']" :key="oneSn.sn" md="1">
            <v-row justify="center">
              <v-btn>{{ oneSn.number }}</v-btn>
            </v-row>
          </v-col>
        </v-row>
        <div style="font-size: 18px;font-weight: bold">特別篇</div>
        <v-row justify="start">
          <v-col v-for="oneSn in sns['特別篇']" :key="oneSn.sn" md="1">
            <v-row justify="center">
              <v-btn>{{ oneSn.number }}</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class AnimeDialog extends Vue {
  @Prop() sns?: {
    obj: {
      sn: string;
      number: string;
    }[];
  };
  @Prop(String) title?: string;
}
</script>
