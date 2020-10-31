<!-- @format -->

<template>
  <NavDrawer :value="isScrollLock" @close="isScrollLock = false" />
  <div id="navbar">
    <div class="navbar-item-container menu-toggle" @click="isScrollLock = true">
      <button class="navbar-item">
        <div>
          <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4,5V7H21V5M4,11H21V9H4M4,19H21V17H4M4,15H21V13H4V15Z"
            />
          </svg>
        </div>
      </button>
    </div>
    <SearchBar />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import NavDrawer from "./NavDrawer.vue";
import SearchBar from "./SearchBar.vue";
import Store from "../../store";
export default defineComponent({
  name: "NavBar",
  components: { NavDrawer, SearchBar },
  setup() {
    const isScrollLock = inject(Store.isScrollLock, ref(false));
    return {
      isScrollLock,
    };
  },
});
</script>
