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
    <v-app-bar clipped-left app :color="selectMode ? 'indigo ' : undefined">
      <v-app-bar-nav-icon
        v-if="!selectMode"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer />
      <v-text-field
        v-if="!selectMode"
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="search"
        v-model="search"
      />
      <v-spacer />
      <v-btn v-if="selectMode" icon>
        <v-icon color="white">mdi-arrow-collapse-down</v-icon>
      </v-btn>
      <v-btn v-if="selectMode" icon @click="cancelSelectMode">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class Bar extends Vue {
  drawer = false;
  search = "";
  get selectMode() {
    return this.$store.getters.selectMode;
  }
  mounted() {
    this.$store.commit("getNewAnime");
  }
  cancelSelectMode() {
    this.$store.commit("unSelectMode");
  }
  @Watch("search")
  whenSearchChange() {
    this.$store.commit("changeSearch", this.search);
  }

  @Watch("drawer")
  whenDrawerChange() {
    if (this.search) {
      this.drawer = false;
    }
  }
}
</script>
