<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="float-left w-20 bg-blue-700 all_menu h-screen relative">
    <ul class="h-80 menu_items">
      <div class="h-1/4">
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
      <div class="h-1/4">
        <hr class="line" :class="{ hidden: currentPage !== 'note' }" />
        <router-link :to="{ name: 'note' }">
          <img src="../assets/img/Untitled.png" alt="" class="ml-3 mt-1 item" />
        </router-link>
      </div>
      <div class="h-1/4">
        <hr class="line" :class="{ hidden: currentPage !== 'chat' }" />
        <router-link :to="{ name: 'chat' }"
          ><img src="../assets/img/Chat.png" alt="" class="ml-4 mt-1 item"
        /></router-link>
      </div>
      <div class="h-1/4">
        <hr class="line" :class="{ hidden: currentPage !== 'statistics' }" />
        <router-link :to="{ name: 'statistics' }"
          ><img src="../assets/img/sta.png" alt="" class="ml-3 mt-1 item"
        /></router-link>
      </div>
    </ul>
    <div class="bg-blue-500 h-4/6 signOut_button">
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
  height: 91vh;
}
@media screen and (max-width: 1910px) {
  .all_menu {
    width: 3.5%;
    height: 84vh;
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
  .menu_items {
    margin-top: -10vh;
    display: flex;
    justify-content: space-between;
    gap: 40vw;
    justify-content: center;
    align-items: center;
    padding: 0vh 10vh;
  }
  .menu_signout {
    top: 20%;
    right: 5%;
    height: 50%;
    width: 3%;
  }
  .line {
    border: none;
    border-left: 30vw solid #dd7a01;
    height: 2vh;
    margin-top: -0.5%;
    margin-left: -4.5%;
  }
  .item {
    margin-top: 20%;
    height: 100%;
    width: 100%;
  }
}
@media screen and (max-width: 1100px) {
  .menu_items {
    gap: 35vw;
  }
  .item {
    margin-top: 20%;
    height: 100%;
    width: 100%;
  }
  .menu_signout {
    height: 50%;
    width: 4%;
  }
  .line {
    margin-top: -0.5%;
    margin-left: -5%;
    border-left: 40vw solid #dd7a01;
  }
}

@media only screen and (max-width: 960px) and (min-width: 901px) {
  .line {
    margin-top: -3.4%;
    border-left: 35vw solid #dd7a01;
  }
  .menu_items {
    gap: 41vw;
  }
  .item {
    margin-top: -80%;
    height: 60%;
    width: 80%;
  }
  .menu_signout {
    top: 31%;
    width: 3%;
  }
}
@media screen and (max-width: 900px) {
  .item {
    margin-top: 35%;
  }
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
@media screen and (max-height: 720px) {
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
  .item {
    margin-top: 30%;
    height: 80%;
  }
  .menu_signout {
    top: 30%;
  }
  .line {
    margin-top: -1%;
  }
}
@media screen and (max-width: 640px) and (min-width: 415px) {
  .line {
    margin-top: -6%;
    border-left: 35vw solid #dd7a01;
  }
  .menu_items {
    gap: 41vw;
  }
  .item {
    margin-top: -155%;
    height: 40%;
    width: 80%;
  }
  .menu_signout {
    top: 31%;
    width: 3%;
  }
}
@media screen and (max-width: 414px) {
  .all_menu {
    width: 390%;
  }
  .menu_items {
    margin-top: -7%;
    gap: 62vw;
  }
  .menu_signout {
    top: 20%;
    height: 60%;
    width: 5%;
  }
  .line {
    border-left: 80vw solid #dd7a01;
    margin-top: -0.7%;
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
    margin-top: -1%;
    margin-left: -120px;
  }
  .menu_signout {
    top: 30%;
    height: 50%;
    width: 5%;
  }
  .menu_items {
    gap: 69vw;
  }
}
</style>
