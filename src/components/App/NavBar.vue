<template>
  <NavDrawer :value="drawer" @close="drawer = false" />
  <div id="navbar">
    <NavBarButton @click="drawer = true">
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M4,5V7H21V5M4,11H21V9H4M4,19H21V17H4M4,15H21V13H4V15Z"
        />
      </svg>
    </NavBarButton>

    <SearchBar />
    <div class="spacer"></div>
    <NavBarButton @click="sortMenu = !sortMenu">
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M18 21L14 17H17V7H14L18 3L22 7H19V17H22M2 19V17H12V19M2 13V11H9V13M2 7V5H6V7H2Z"
        />
      </svg>
    </NavBarButton>
    <div class="sort-menu" :class="{ active: sortMenu }">
      <div
        :class="{ active: !homeSortByPopular }"
        @click="homeSortByPopular = sortMenu = false"
      >
        日期
      </div>
      <div
        :class="{ active: homeSortByPopular }"
        @click="
          homeSortByPopular = true;
          sortMenu = false;
        "
      >
        熱門
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref, watch } from "vue";
import NavDrawer from "./NavDrawer.vue";
import SearchBar from "./NavBar/SearchBar.vue";
import NavBarButton from "./NavBar/NavBarButton.vue";
import Store from "../../store";
export default defineComponent({
  name: "NavBar",
  components: { NavDrawer, SearchBar, NavBarButton },
  setup() {
    const drawer = ref(false);
    const isScrollLock = inject(Store.isScrollLock, ref(false));
    const homeSortByPopular = inject(Store.homeSortByPopular, ref(false));
    const sortMenu = ref(false);

    watch(drawer, () => {
      isScrollLock.value = drawer.value;
    });
    return {
      drawer,
      isScrollLock,
      sortMenu,
      homeSortByPopular,
    };
  },
});
</script>
