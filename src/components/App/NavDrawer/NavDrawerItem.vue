<template>
  <div class="item-container">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavDrawerItem",
});
</script>
