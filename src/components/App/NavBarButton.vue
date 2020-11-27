<template>
  <div class="navbar-item-container navbar-button">
    <button class="navbar-item">
      <div>
        <slot />
      </div>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NavBarButton",
});
</script>
