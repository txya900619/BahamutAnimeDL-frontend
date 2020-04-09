<template>
  <v-app id="inspire">
    <Bar></Bar>
    <v-content>
      <v-container>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Bar from "../components/Bar.vue";
import store from "../store";
@Component({ components: { Bar } })
export default class Main extends Vue {}
</script>
