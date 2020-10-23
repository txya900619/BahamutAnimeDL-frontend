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
import { defineComponent, provide, ref, watch } from "vue";
import NavBar from "./components/App/NavBar.vue";
import Store from "./store";
import "./assets/scss/app.scss";

export default defineComponent({
  name: "App",
  components: {
    NavBar
  },
  setup() {
    const isScrollLock = ref(false);
    const scrollY = ref(window.scrollY);
    provide(Store.isScrollLock, isScrollLock);

    watch(isScrollLock, v => {
      if (v) {
        scrollY.value = window.scrollY;
      }
    });
    return { isScrollLock, scrollY };
  }
});
</script>
