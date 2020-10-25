<template>
  <div id="nav-drawer" :class="{ open: value }">
    <div class="mask" @click="emit('close')" />
    <aside class="container">
      <NavDrawerItem />
    </aside>
  </div>
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
  },
  setup(_props, { emit }) {
    return { emit };
  }
});
</script>
