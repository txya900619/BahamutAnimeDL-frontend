<template>
  <NavDrawer :value="isScrollLock" @close="unlock" />
  <div id="navbar">
    <div class="navbar-item-container" @click="lock">
      <button class="navbar-item">
        <div>
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4,5V7H21V5M4,11H21V9H4M4,19H21V17H4M4,15H21V13H4V15Z"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NavDrawer from "./NavDrawer.vue";
import Store from "../../store";
export default defineComponent({
  name: "NavBar",
  components: { NavDrawer },
  setup() {
    const { isScrollLock } = Store.useIsScrollLock();
    return {
      isScrollLock: isScrollLock.value,
      lock: isScrollLock.lock,
      unlock: isScrollLock.unlock
    };
  }
});
</script>
