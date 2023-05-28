<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="float-left w-20 h-102 bg-blue-700">
    <ul class="h-2/6">
      <router-link :to="{ name: 'user' }">
        <img src="../assets/img/Vector.png" alt="" class="ml-4 mt-4" />
      </router-link>
      <router-link :to="{ name: 'note' }">
        <img src="../assets/img/Untitled.png" alt="" class="ml-3 mt-6" />
      </router-link>
      <router-link :to="{ name: 'chat' }"
        ><img src="../assets/img/Chat.png" alt="" class="ml-4 mt-6"
      /></router-link>
      <router-link :to="{ name: 'stafication' }"
        ><img src="../assets/img/sta.png" alt="" class="ml-3 mt-6"
      /></router-link>
    </ul>
    <div class="bg-blue-500 h-4/6">
      <img
        src="../assets/img/logout.png"
        alt=""
        class="absolute bottom-10 ml-3"
        @click="signOut"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    signOut() {
      // Xóa thông tin đăng nhập từ local storage
      localStorage.removeItem("loggedInUser");
      // Cập nhật các giá trị trong form về giá trị mặc định
      this.$router.push("/");
    },
  },
};
</script>
