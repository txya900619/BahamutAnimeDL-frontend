<template>
  <NavDrawer :value="isScrollLock" @close="isScrollLock = false" />
  <div id="navbar">
    <NavBarButton class="menu-toggle" @click="isScrollLock = true">
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M4,5V7H21V5M4,11H21V9H4M4,19H21V17H4M4,15H21V13H4V15Z"
        />
      </svg>
    </NavBarButton>
    <SearchBar />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import NavDrawer from "./NavDrawer.vue";
import SearchBar from "./SearchBar.vue";
import NavBarButton from "./NavBarButton.vue";
import Store from "../../store";
export default defineComponent({
  name: "NavBar",
  components: { NavDrawer, SearchBar, NavBarButton },
  setup() {
    const isScrollLock = inject(Store.isScrollLock, ref(false));
    return {
      isScrollLock,
    };
  },
});
</script>
