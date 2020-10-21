<template>
  <aside id="nav-drawer" :class="{ open: value }">
    <NavDrawerItem />
  </aside>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NavDrawerItem from "./NavDrawerItem.vue";
export default defineComponent({
  name: "NavDrawer",
  components: {
    NavDrawerItem
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
});
</script>
