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
        <v-list-item active-class="deep-purple--text text--accent-4" to="/">
          <v-list-item-title>本季新番</v-list-item-title>
        </v-list-item>
        <v-list-item
          active-class="deep-purple--text text--accent-4"
          to="/Animations"
        >
          <v-list-item-title>所有動畫</v-list-item-title>
        </v-list-item>
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
  search = "";
  mounted() {
    this.$store.commit("getNewAnime");
    this.$store.commit("getAllAnime");
  }
  @Watch("search")
  whenSearchChange() {
    this.$store.commit("changeSearch", this.search);
  }
}
</script>
