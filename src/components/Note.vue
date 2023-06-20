<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header-components />
  <menu-components class="mt-4" />
  <div class="flex mt-4">
    <p class="text-center mx-auto text-2xl my-auto">This is Note Page...</p>
  </div>
</template>
<script>
import HeaderComponents from "./Header.vue";
import MenuComponents from "./Menu.vue";
export default {
  components: {
    HeaderComponents,
    MenuComponents,
  },
};
</script>
