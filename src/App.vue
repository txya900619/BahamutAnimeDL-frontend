<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, provide, ref, watch } from "vue";
import NavBar from "./components/App/NavBar.vue";
import Store from "./store";
import "./assets/scss/app.scss";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
  setup() {
    const isScrollLock = ref(false);
    provide(Store.isScrollLock, isScrollLock);

    watch(isScrollLock, (v) => {
      if (v) {
        document.body.classList.add("scroll-lock");
      } else {
        document.body.classList.remove("scroll-lock");
      }
    });

    return {};
  },
});
</script>
