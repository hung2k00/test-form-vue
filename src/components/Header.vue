<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="ml-20 pt-12 all_header">
    <ul class="flex gap-4">
      <li class="cursor-pointer">
        <router-link :to="{ name: 'user' }" class="flex"
          ><img src="../assets/img/home.png" alt="" class="h-4 w-4 mt-1" />
          <span class="ml-2">Home</span></router-link
        >
      </li>
      <li class="text-gray-400">&nbsp;> Application Center</li>
      <li class="text-gray-400">&nbsp;> ... >&nbsp;</li>
      <li class="text-gray-400">Application List &nbsp; ></li>
      <li>An Application</li>
    </ul>
  </div>
</template>
<style scoped>
@media screen and (max-width: 1400px) {
  .all_header {
    display: none;
  }
}
</style>
