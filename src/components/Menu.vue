<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="float-left w-20 h-102 bg-blue-700 all_menu">
    <ul class="h-2/6 menu_items">
      <router-link :to="{ name: 'user' }" class="">
        <img src="../assets/img/Vector.png" alt="" class="ml-4 mt-4 item_1" />
      </router-link>
      <router-link :to="{ name: 'note' }">
        <img src="../assets/img/Untitled.png" alt="" class="ml-3 mt-6 item_2" />
      </router-link>
      <router-link :to="{ name: 'chat' }"
        ><img src="../assets/img/Chat.png" alt="" class="ml-4 mt-6 item_3"
      /></router-link>
      <router-link :to="{ name: 'stafication' }"
        ><img src="../assets/img/sta.png" alt="" class="ml-3 mt-6 item_4"
      /></router-link>
    </ul>
    <div class="bg-blue-500 h-4/6">
      <img
        src="../assets/img/logout.png"
        alt=""
        class="absolute bottom-10 ml-3 menu_signout"
        @click="signOut"
      />
    </div>
  </div>
</template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  data() {
    return {};
  },
  methods: {
    signOut() {
      // Xóa thông tin đăng nhập từ local storage
      localStorage.removeItem("user");
      toast.warning("Bạn đã đăng xuất!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        this.$router.push("/"); // Chuyển trang sau một khoảng thời gian
      }, 1500);
      // Cập nhật các giá trị trong form về giá trị mặc định
    },
  },
};
</script>
<style scoped>
@media only screen and (max-width: 1920px) and (max-height: 1080px) {
  .all_menu {
    height: 976px;
  }
}
@media only screen and (max-width: 1280px) and (max-height: 720px) {
  .all_form {
    margin: 55px 30px;
  }
}
@media only screen and (max-width: 1280px) and (max-height: 1080px) {
  .all_form {
    margin: 215px 40px;
  }
  .login_form {
    width: 680px;
  }
}

@media only screen and (max-width: 960px) and (max-height: 540px) {
  .all_form {
    margin-top: 0;
    margin-left: 140px;
  }
  .login_p {
    margin-top: 50px;
  }
}
@media only screen and (max-width: 640px) and (max-height: 360px) {
}
@media only screen and (max-width: 768px) and (max-height: 1024px) {
  .all_menu {
    height: 150px;
    position: absolute;
    top: -15px;
    display: flex;
  }
  .menu_items {
    display: flex;
    gap: 200px;
    padding: 10px 60px;
  }
  .item_1 {
    height: 80px;
    width: 80px;
  }
  .item_2 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .item_3 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .item_4 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .menu_signout {
    height: 80px;
    width: 80px;
  }
}
@media only screen and (max-width: 820px) and (max-height: 1180px) {
  .all_menu {
    height: 150px;
    width: 1607px;
    position: absolute;
    top: -15px;
    display: flex;
  }
  .menu_items {
    display: flex;
    gap: 200px;
    padding: 10px 60px;
  }
  .item_1 {
    height: 80px;
    width: 80px;
  }
  .item_2 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .item_3 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .item_4 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .menu_signout {
    height: 80px;
    width: 80px;
  }
}
@media only screen and (max-width: 412px) and (max-height: 915px) {
  .all_menu {
    height: 150px;
    width: 1605px;
    position: absolute;
    top: -15px;
    display: flex;
  }
  .menu_items {
    display: flex;
    gap: 200px;
    padding: 10px 60px;
  }
  .item_1 {
    height: 80px;
    width: 80px;
  }
  .item_2 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .item_3 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .item_4 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .menu_signout {
    height: 80px;
    width: 80px;
  }
}
@media only screen and (max-width: 414px) and (max-height: 896px) {
  .all_menu {
    height: 150px;
    width: 1700px;
    position: absolute;
    top: -15px;
    display: flex;
  }
  .menu_items {
    display: flex;
    gap: 200px;
    padding: 10px 40px;
    padding-left: 60px;
  }
  .item_1 {
    height: 80px;
    width: 80px;
  }
  .item_2 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .item_3 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .item_4 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .menu_signout {
    height: 80px;
    width: 80px;
  }
}
@media only screen and (max-width: 390px) and (max-height: 844px) {
  .all_menu {
    height: 150px;
    width: 1255px;
    position: absolute;
    top: -15px;
    display: flex;
  }
  .menu_items {
    display: flex;
    gap: 100px;
    padding: 10px 40px;
  }
  .item_1 {
    height: 80px;
    width: 80px;
  }
  .item_2 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .item_3 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .item_4 {
    margin-top: 10px;
    height: 80px;
    width: 80px;
  }
  .menu_signout {
    height: 80px;
    width: 80px;
  }
}
@media only screen and (max-width: 960px) and (max-height: 640px) {
  .all_menu {
    height: 150px;
    width: 1608px;
    position: absolute;
    top: -15px;
    display: flex;
  }
  .menu_items {
    display: flex;
    gap: 240px;
    padding: 10px 60px;
  }
  .item_1 {
    height: 60px;
    width: 60px;
  }
  .item_2 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .item_3 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .item_4 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .menu_signout {
    height: 60px;
    width: 60px;
  }
}
@media only screen and (max-width: 1600px) and (max-height: 900px) {
  .all_menu {
    height: 150px;
    width: 1608px;
    position: absolute;
    top: -15px;
    display: flex;
  }
  .menu_items {
    display: flex;
    gap: 240px;
    padding: 10px 60px;
  }
  .item_1 {
    height: 60px;
    width: 60px;
  }
  .item_2 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .item_3 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .item_4 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .menu_signout {
    height: 60px;
    width: 60px;
  }
}
@media only screen and (max-width: 1280px) and (max-height: 1080px) {
  .all_menu {
    height: 150px;
    width: 1608px;
    position: absolute;
    top: -15px;
    display: flex;
  }
  .menu_items {
    display: flex;
    gap: 240px;
    padding: 10px 60px;
  }
  .item_1 {
    height: 60px;
    width: 60px;
  }
  .item_2 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .item_3 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .item_4 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .menu_signout {
    height: 60px;
    width: 60px;
  }
}
@media only screen and (max-width: 375px) and (max-height: 667px) {
  .all_menu {
    height: 150px;
    width: 1500px;
    position: absolute;
    top: -15px;
    display: flex;
  }
  .menu_items {
    display: flex;
    gap: 200px;
    padding: 10px 60px;
  }
  .item_1 {
    height: 60px;
    width: 60px;
  }
  .item_2 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .item_3 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .item_4 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .menu_signout {
    height: 60px;
    width: 60px;
  }
}
@media only screen and (max-width: 360px) and (max-height: 740px) {
  .all_menu {
    height: 150px;
    width: 1455px;
    position: absolute;
    top: -15px;
    display: flex;
  }
  .menu_items {
    display: flex;
    gap: 200px;
    padding: 10px 60px;
  }
  .item_1 {
    height: 60px;
    width: 60px;
  }
  .item_2 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .item_3 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .item_4 {
    margin-top: 20px;
    height: 60px;
    width: 60px;
  }
  .menu_signout {
    height: 60px;
    width: 60px;
  }
}
</style>
