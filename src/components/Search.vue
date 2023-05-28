<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <header-components />
    <menu-components class="mt-4" />
    <div class="all_search">
      <div class="flex h-20 user_st mt-4">
        <div class="user_tt w-1/2 border-r-slate-400">
          <p class="text-center mt-7 font-semibold user_st_p">
            Thông tin khách hàng
          </p>
        </div>
        <div class="user_s w-1/2">
          <p class="mt-6 font-semibold ml-4">Tìm kiếm</p>
        </div>
      </div>
      <div class="relative">
        <img
          src="../assets/img/search.png"
          class="img_search absolute mt-8 ml-36"
        />
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Tìm kiếm số điện thoại"
        />
      </div>
      <ul>
        <li
          v-for="contact in filteredContacts"
          :key="contact.id"
          @click="showContactInfo(contact)"
        >
          {{ contact.phone }}
        </li>
      </ul>
    </div>
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
<style scoped>
.all_search {
  border-right: 2px solid #cfcfcf;
  width: 570px;
  height: 830px;
}
.user_tt {
  color: #cfcfcf;
}
.user_s {
  border-top: 4px solid #df6106;
  border-right: 1px solid #cfcfcf;
  border-left: 1px solid #cfcfcf;
  color: #df6106;
}
.user_st {
  border-bottom: 4px solid #df6106;
}
input {
  margin-left: 55px;
  margin-top: 22px;
  height: 40px;
  width: 360px;
  border: 1px solid #7e7975;
  border-radius: 10px;
  padding: 0px 40px;
}
.img_search {
  height: 20px;
  width: 20px;
}
</style>
