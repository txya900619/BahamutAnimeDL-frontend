<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      temporary
      style="z-index:5;padding-top:64px;"
    >
      <v-list nav>
        <v-list-item-group
          v-model="vGroup"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>本季新番</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>yee</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <v-text-field
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="search"
        clearable
        v-model="search"
      ></v-text-field>
      <v-spacer />
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class Bar extends Vue {
  drawer = false;
  vGroup = 0;
  search = "";
  @Watch("vGroup")
  onVlistGroupSelect() {
    this.drawer = false;
  }

  @Watch("search")
  onSearchChange() {
    console.log(this.search);
  }
}
</script>
