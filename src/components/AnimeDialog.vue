<template>
  <v-card class="py-12">
    <v-container fluid>
      <v-row justify="start">
        <v-col v-for="oneSn in Sns" :key="oneSn.sn" md="1">
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
  @Prop(Array) Sns?: {
    sn: string;
    number: string;
  }[];
}
</script>
