<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/App/NavBar.vue";
import "./assets/scss/app.scss";

export default defineComponent({
  name: "App",
  components: {
    NavBar
  }
});
</script>
