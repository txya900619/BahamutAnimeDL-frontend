<template>
  <div id="nav-drawer" :class="{ open: value }">
    <div class="drawer-mask" @click="emit('close')" />
    <aside class="drawer-container">
      <NavDrawerItem
        v-for="route in routes"
        :key="'nav-' + route.path"
        :class="{ active: currentRouteName == route.name }"
      >
        <router-link class="router-link item" :to="route.path">
          <div class="icon-container"></div>
          <div class="text-container">
            {{ route.name }}
          </div>
        </router-link>
      </NavDrawerItem>
    </aside>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import NavDrawerItem from "./NavDrawer/NavDrawerItem.vue";
import { routes } from "../../router";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "NavDrawer",
  components: {
    NavDrawerItem,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props, { emit }) {
    const currentRouteName = computed(
      () => useRouter().currentRoute.value.name
    );
    return { emit, routes, currentRouteName };
  },
});
</script>
