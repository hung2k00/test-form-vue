<template>
  <router-view name="header" class="header_component" />
  <div class="pt-4">
    <router-view name="menu" />
  </div>
  <router-view />
</template>
<style>
@media screen and (max-width: 1920px) and (max-height: 720px) {
  .header_component {
    display: none;
  }
}
</style>
