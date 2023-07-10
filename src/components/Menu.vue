<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="float-left w-20 bg-blue-700 all_menu h-screen relative">
    <ul class="h-80 menu_items">
      <div class="h-1/4 items">
        <hr
          class="line"
          :class="{
            hidden:
              currentPage !== 'user' &&
              currentPage !== 'search' &&
              currentPage !== 'note_user',
          }"
        />
        <router-link :to="{ name: 'user' }" class="">
          <img src="../assets/img/Vector.png" alt="" class="ml-4 mt-4 item" />
        </router-link>
      </div>
      <div class="h-1/4 items">
        <hr class="line" :class="{ hidden: currentPage !== 'note' }" />
        <router-link :to="{ name: 'note' }">
          <img src="../assets/img/Untitled.png" alt="" class="ml-3 mt-1 item" />
        </router-link>
      </div>
      <div class="h-1/4 items">
        <hr class="line" :class="{ hidden: currentPage !== 'chat' }" />
        <router-link :to="{ name: 'chat' }"
          ><img
            src="../assets/img/Chat.png"
            alt=""
            class="ml-4 mt-1 item item_chat"
        /></router-link>
      </div>
      <div class="h-1/4 items">
        <hr class="line" :class="{ hidden: currentPage !== 'statistics' }" />
        <router-link :to="{ name: 'statistics' }"
          ><img src="../assets/img/sta.png" alt="" class="ml-3 mt-1 item"
        /></router-link>
      </div>
    </ul>
    <div class="bg-blue-500 signOut_button cursor-pointer">
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
    return {
      currentPage: "",
    };
  },
  watch: {
    $route(to) {
      this.currentPage = to.name; // Cập nhật trang hiện tại khi chuyển trang
    },
  },
  mounted() {
    this.currentPage = this.$route.name; // Gán trang hiện tại khi tải thành phần
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
.line {
  position: absolute;
  border: none;
  border-left: 12px solid #dd7a01;
  height: 80px;
  margin: 0;
  margin-top: -16px;
}
.all_menu {
  height: 91.8vh;
}
.signOut_button {
  height: 66%;
}
@media screen and (max-width: 1920px) and (max-height: 967px) {
  .all_menu {
    width: 3.5%;
    height: 90.7vh;
  }
  .item {
    height: 50%;
    width: 60%;
  }
  .item_chat {
    width: 50%;
  }
  .menu_signout {
    bottom: 1vh;
    height: 6%;
    width: 62%;
  }
  .signOut_button {
    height: 61.5%;
  }
}

@media screen and (max-width: 1910px) {
  .all_menu {
    width: 3.5%;
    height: 91vh;
  }
  .menu_signout {
    bottom: 2vh;
    height: 6%;
    width: 55%;
  }
  .item {
    height: 50%;
    width: 60%;
  }
  .item_chat {
    width: 50%;
  }
}
@media screen and (max-width: 1408px) {
  .all_menu {
    height: 15%;
    position: absolute;
    top: -15px;
    display: flex;
    width: 210%;
    z-index: 1;
  }
  .items {
    padding-top: 2vh;
    height: 90%;
    width: 70%;
  }
  .menu_items {
    display: flex;
    justify-content: space-between;
    gap: 40vw;
    justify-content: center;
    align-items: center;
    padding: 0vh 10vh;
    width: 80%;
    height: 100%;
  }
  .menu_signout {
    top: 20%;
    right: 5%;
    height: 50%;
    width: 3%;
  }
  .line {
    border: none;
    margin-top: -1%;
    border-left: 30vw solid #dd7a01;
    height: 2vh;
    margin-left: -4.5%;
  }
}
@media screen and (max-width: 1100px) {
  .menu_items {
    gap: 35vw;
  }
  .items {
    padding-top: 2vh;
    height: 85%;
    width: 70%;
  }
  .menu_signout {
    height: 50%;
    width: 4%;
  }
  .line {
    margin-top: -1.5%;
    margin-left: -5%;
    border-left: 40vw solid #dd7a01;
  }
}
@media screen and (max-width: 960px) and (min-width: 901px) {
  .items {
    padding-top: 2vh;
    height: 100%;
    width: 150%;
  }
  .line {
    margin-top: -1.1%;
    margin-left: -8%;
  }
}
@media screen and (max-width: 900px) {
  .menu_signout {
    height: 50%;
    width: 5%;
  }
  .line {
    margin-left: -7%;
  }
  .menu_items {
    gap: 33vw;
  }
}
@media screen and (max-width: 1907px) and (max-height: 967px) and (min-height: 721px) {
  .all_menu {
    height: 90.8vh;
  }
}
@media screen and (max-height: 720px) and (min-width: 551px) {
  .item {
    margin-top: -25%;

    height: 80%;
    width: 80%;
  }
  .menu_signout {
    height: 70%;
    top: 20%;
  }
  .line {
    margin-top: -1.9%;
  }
}
@media screen and (max-width: 768px) {
  .items {
    padding-top: 3%;
  }
  .menu_signout {
    top: 30%;
  }
  .line {
    margin-top: -3%;
  }
}
@media screen and (max-width: 640px) and (min-width: 415px) {
  .line {
    margin-top: -3%;
    margin-left: -10%;
    border-left: 45vw solid #dd7a01;
  }
  .menu_items {
    gap: 28vw;
  }
  .menu_items {
    height: 90%;
    width: 90%;
  }
  .item {
    margin-left: -20%;
  }
  .menu_signout {
    top: 31%;
    width: 5%;
    height: 30%;
  }
}
@media screen and (max-width: 414px) {
  .all_menu {
    width: 390%;
  }
  .menu_items {
    gap: 43vw;
  }
  .items {
    height: 90%;
    width: 90%;
  }
  .menu_signout {
    top: 22%;
    height: 50%;
    width: 5%;
  }
  .line {
    border-left: 80vw solid #dd7a01;
    margin-top: -2.5%;
  }
}
@media screen and (max-width: 395px) {
  .all_menu {
    width: 400%;
  }
}
@media screen and (max-width: 375px) {
  .all_menu {
    height: 20%;
  }
  .line {
    border: none;
    border-left: 45vh solid #dd7a01;
    height: 2vh;
    margin-top: -2.5%;
    margin-left: -120px;
  }
  .menu_signout {
    top: 30%;
    height: 50%;
    width: 5%;
  }
  .menu_items {
    gap: 50vw;
  }
  .items {
    height: 90%;
    width: 90%;
  }
}
@media screen and (max-width: 1408px) and (max-height: 968px) and (min-height: 721px) {
  .all_menu {
    height: 18%;
  }
}
@media screen and (max-height: 1074px) and (min-height: 1068px) and (min-width: 1049px) {
  .signOut_button {
    height: 65.5%;
  }
}
@media screen and (max-height: 1068px) and (min-height: 1059px) and (min-width: 1409px) {
  .all_menu {
    height: 91.6vh;
  }
  .signOut_button {
    height: 65.5%;
  }
}
@media screen and (max-height: 1058px) and (min-height: 1046px) and (min-width: 1409px) {
  .all_menu {
    height: 91.1vh;
  }
  .signOut_button {
    height: 65.3%;
  }
}
@media screen and (max-height: 1045px) and (min-height: 968px) and (min-width: 1409px) {
  .all_menu {
    height: 89.5vh;
  }
}
@media screen and (max-height: 1300px) and (min-height: 1181px) and (min-width: 1409px) {
  .all_menu {
    height: 88.3vh;
  }
}
@media screen and (max-height: 1015px) and (min-height: 968px) and (min-width: 1409px) {
  .all_menu {
    height: 88vh;
  }
}
@media screen and (max-height: 1010px) and (min-height: 968px) and (min-width: 1409px) {
  .all_menu {
    height: 87.7vh;
  }
}
@media screen and (max-width: 1408px) and (max-height: 976px) {
  .line {
    margin-top: -0.5%;
  }
}
@media screen and (max-width: 965px) and (max-height: 967px) {
  .items {
    padding-top: 3vh;
  }
  .line {
    margin-top: -1.5%;
  }
}
@media screen and (max-width: 965px) and (max-height: 967px) {
  .line {
    margin-top: -2vh;
  }
}
@media screen and (max-width: 1920px) and (max-height: 942px) and (min-width: 1409px) {
  .all_menu {
    height: 90.6vh;
  }
  .signOut_button {
    height: 60.3%;
  }
}
@media screen and (max-width: 1920px) and (max-height: 945px) and (min-width: 1409px) {
  .all_menu {
    height: 89.6vh;
  }
}
@media screen and (max-width: 1920px) and (max-height: 940px) and (min-width: 1409px) {
  .all_menu {
    height: 90.6vh;
  }
  .menu_signout {
    bottom: 3vh;
  }
}
@media screen and (max-width: 1920px) and (max-height: 933px) and (min-width: 1409px) {
  .all_menu {
    height: 90.4vh;
  }
  .signOut_button {
    height: 60%;
  }
}
@media screen and (max-width: 1920px) and (max-height: 925px) and (min-width: 1409px) {
  .all_menu {
    height: 90.5vh;
  }
  .signOut_button {
    height: 59.5%;
  }
}
@media screen and (max-width: 1920px) and (max-height: 921px) and (min-width: 1409px) {
  .all_menu {
    height: 90.3vh;
  }
  .signOut_button {
    height: 59.2%;
  }
}
@media screen and (max-width: 1920px) and (max-height: 909px) and (min-width: 1409px) {
  .all_menu {
    height: 90vh;
  }
  .signOut_button {
    height: 59%;
  }
}
@media screen and (max-width: 1920px) and (max-height: 900px) and (min-width: 1409px) {
  .all_menu {
    height: 90.2vh;
  }
  .signOut_button {
    height: 58%;
  }
}
@media screen and (max-height: 844px) and (max-width: 1920px) and (min-width: 1409px) {
  .all_menu {
    height: 85.5vh;
  }
}
</style>
