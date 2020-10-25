<template>
  <NavBar />
  <div
    :class="{ 'scroll-lock': isScrollLock }"
    :style="{ '--current-scroll-y': scrollY + 'px' }"
    style="height: 200vh"
  >
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/App/NavBar.vue";
import Store from "./store";
import "./assets/scss/app.scss";

export default defineComponent({
  name: "App",
  components: {
    NavBar
  },
  setup() {
    Store.provideIsScrollLock();
    const { isScrollLock } = Store.useIsScrollLock();
    return { isScrollLock: isScrollLock.value, scrollY: isScrollLock.scrollY };
  }
});
</script>
