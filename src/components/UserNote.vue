<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex mt-4 user_all relative">
    <div class="w-100 all_user">
      <div class="flex h-20 user_st">
        <div class="user_tt w-1/2 border-r-slate-400">
          <router-link :to="{ name: 'user' }">
            <p class="text-center mt-7 font-semibold user_st_p">
              Thông tin khách hàng
            </p>
          </router-link>
        </div>
        <div
          id="search_text"
          class="w-1/2 user_s font-semibold pl-3"
          @click="onSearch"
        >
          <p class="py-6 mt-1 user_s_p">Tìm kiếm</p>
        </div>
      </div>
      <div class="detail_user">
        <div class="flex gap-20 mt-6 ml-12 icon_user">
          <router-link :to="{ name: 'note_user' }">
            <img src="../assets/img/i.png" alt="" class="h-12 w-12" />
          </router-link>
          <router-link :to="{ name: 'note_user' }">
            <img src="../assets/img/chat_user.png" alt="" class="h-12 w-12" />
          </router-link>
          <router-link :to="{ name: 'note_user' }">
            <img src="../assets/img/mail_user.png" alt="" class="h-12 w-12" />
          </router-link>
          <router-link :to="{ name: 'note_user' }">
            <img src="../assets/img/ab.png" alt="" class="h-12 w-10" />
          </router-link>
        </div>
        <div>
          <popup-detail :user="user" />
        </div>
      </div>
    </div>
    <div class="ds_regis">
      <div
        class="register_icon flex mt-28 cursor-pointer hover:bg-green-400 hover:text-blue-600"
        @click="createUser"
      >
        <p>Tạo Người Dùng</p>
        <img src="../assets/img/Icon.png" />
      </div>
      <div class="relative">
        <div class="full_list mt-8 mx-auto">
          <div class="all_list flex">
            <router-link :to="{ name: 'user' }" class="user_list">
              <p class="font-normal text-xl pt-2 hover:text-black">
                Danh sách người dùng
              </p>
            </router-link>
            <router-link :to="{ name: 'note_user' }" class="user_note">
              <p class="font-normal text-xl pt-2">Ghi chú</p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- <div class="relative -mt-100"></div> -->
    </div>
  </div>

  <div>
    <register-components
      :createUser="createUser"
      v-if="showComponentRegister"
      @close="resetComponent"
      @userCreated="getUsers"
      class="modal register-modal"
    />
    <div
      class="modal-overlay"
      v-if="showComponentRegister"
      @click="resetComponent"
    ></div>
  </div>
</template>
<script>
import PopupDetail from "../components/PopupDetails.vue";
import RegisterComponents from "../components/RegisterUser.vue";
export default {
  components: {
    PopupDetail,
    RegisterComponents,
  },
  data() {
    return {
      users: [],
      selectedRegister: null,
      showComponentRegister: false,
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    resetComponent() {
      this.showComponentRegister = false;
    },
    onSearch() {
      this.$router.push("/search");
    },
    createUser() {
      this.showComponentRegister = true;
    },

    fetchUserData() {
      // Nếu không có dữ liệu người dùng từ query parameter, bạn có thể lấy từ localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    },
  },
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Màu nền đen */
  z-index: 999; /* Đặt z-index để modal hiển thị trên phần còn lại */
}

.register-modal {
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Màu nền của modal */

  z-index: 1000; /* Đặt z-index để modal hiển thị trên overlay */
  /* Thêm các kiểu CSS khác cho modal */
}
.perPage {
  border: 3px solid rgb(163, 230, 241);
  height: 32px;
}
.change_page {
  border: 3px solid rgb(163, 230, 241);
  margin-right: 4px;
  margin-left: 4px;
  height: 32px;
  width: 32px;
}
.pagination_items {
  border: 3px solid rgb(163, 230, 241);
}
.active {
  background-color: blue;
  color: white;
}
.all_table_user {
  height: 650px;
}
.fixed-row {
  position: sticky;
  top: -1px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
table {
  width: 960px;
}
.table_user {
  font-family: "IBM Plex Mono";
  max-height: 500px;
  overflow: auto;
}
th,
td {
  text-align: center;
  border: 1px solid rgba(151, 145, 145, 0.76);
}
.user_list {
  font-family: "Roboto";
  border-top: 4px solid rgba(151, 145, 145, 0.76);
  border-left: 1px solid rgba(151, 145, 145, 0.76);
  width: 300px;
  height: 50px;
  text-align: center;
  color: rgba(151, 145, 145, 0.76);
}
.user_note {
  color: #dd7a01;
  font-family: "Roboto";
  border: 1px solid rgba(151, 145, 145, 0.76);
  border-top: 4px solid #dd7a01;
  border-bottom: none;
  width: 300px;
  height: 50px;
  text-align: center;
}
.full_list {
  width: 1206px;
}
.all_list {
  border-bottom: 4px solid #dd7a01;
}
.all_user {
  font-family: "Roboto";
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.ds_regis {
  width: 1255px;
  height: 867px;
  border: 1px solid #cfcfcf;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.register_icon {
  background: #0070d2;
  border-radius: 6px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1px 16px;
  gap: 8px;
  color: white;
  width: 199px;
  height: 46px;
  margin-left: 1020px;
}
.user_tt {
  background: linear-gradient(
    180deg,
    rgba(250, 200, 164, 0.296) 0%,
    rgba(255, 182, 33, 0) 100%
  );
  color: #dd7a01;
}
.user_s {
  border-top: 1px solid #cfcfcf;
  border-right: 1px solid #cfcfcf;
  border-left: 1px solid #cfcfcf;
}
.user_st {
  font-family: "Poppins";
  border-bottom: 2px solid #df6106;
}
#search_text {
  color: #a4a4a4;
}
.name_p {
  font-family: "Roboto";
}
@media screen and (max-width: 1920px) and (max-height: 967px) {
  .all_user {
    height: 87vh;
  }
  .pagination {
    bottom: 2vh;
    right: 3vh;
  }
  .ds_regis {
    height: 87vh;
  }
  .full_getUser {
    height: 78%;
  }
  .full_list {
    height: 88%;
  }
  .all_table_user {
    height: 50%;
  }
  .pagination {
    margin-bottom: 2vh;
  }
}
@media screen and (max-width: 1910px) and (min-width: 1409px) {
  .icon_user {
    padding: 0 2vw;
    margin-left: -1vw;
  }
  .icon_user_img {
    height: 80%;
    width: 80%;
  }
}
@media screen and (max-width: 1910px) {
  .all_user {
    height: 87vh;
  }
  .pagination {
    bottom: 2vh;
    right: 3vh;
  }
  .ds_regis {
    height: 87vh;
  }
  .full_getUser {
    height: 78%;
  }
  .full_list {
    height: 88%;
  }
  .all_table_user {
    height: 90%;
  }
}
@media screen and (max-width: 1820px) {
  .icon_user {
    margin-left: 2vw;
    gap: 3vw;
  }
  .icon_user_img {
    height: 90%;
    width: 70%;
  }
  .all_user {
    width: 28%;
  }
  .ds_regis {
    width: 70%;
  }
  .register_icon {
    float: right;
    margin-right: 2%;
  }
  .full_getUser {
    margin-top: 15%;
  }
  .full_list {
    width: 82%;
  }
}
@media screen and (max-width: 1714px) and (min-width: 1409px) {
  .table_list {
    width: 100%;
  }
  .th_name {
    width: 30%;
  }
  .th_email {
    width: 40%;
  }
  .th_phone {
    width: 30%;
  }
  .full_list {
    margin-top: 16%;
    height: 80%;
  }
  .pagination {
    margin-bottom: -1.5vh;
  }
  .all_table_user {
    height: 50vh;
  }
}
@media screen and (max-width: 1408px) {
  .user_all {
    margin-top: 5vh;
    width: 210%;
  }
  .all_user {
    width: 30%;
  }
  .ds_regis {
    width: 73%;
  }
  .full_getUser {
    margin-top: 10%;
  }
  .full_list {
    margin-top: 10%;
  }
  .register_icon {
    float: right;
    margin-left: 0;
    margin-right: 3%;
  }
  .detail_user {
    padding: 5vh 2vw;
  }
  .icon_user {
    gap: 12vw;
  }
}
@media screen and (max-width: 1464px) and (min-width: 1409px) {
  .full_getUser {
    margin-top: 20%;
  }
  .pagination {
    margin-bottom: 2vh;
  }
}
@media screen and (max-width: 1400px) {
  .user_all {
    margin-top: 9%;
  }
}
@media screen and (max-width: 1280px) and (max-height: 1080px) {
  .user_all {
    margin-top: 10%;
  }
}
@media screen and (max-width: 1100px) {
  .user_all {
    display: inline;
  }
  .all_user {
    margin-top: 9%;
    width: 210%;
    height: 82vh;
  }
  .user_st {
    padding: 3vh 0;
    height: 15%;
  }
  .detail_user {
    padding: 5vh 10vh;
  }
  .icon_user {
    gap: 40vw;
    padding: 0 10vh;
  }
  .user_login {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ds_regis {
    width: 210%;
    height: 113vh;
  }
  .register_icon {
    float: right;
    margin-left: 0;
    margin-right: 7%;
  }
  .full_getUser {
    margin-top: 15%;
  }
  .perPage {
    margin-bottom: 2vh;
  }
}
@media screen and (max-width: 960px) and (min-width: 901px) {
  .all_user {
    height: 210%;
  }
  .full_getUser {
    margin-top: 10%;
  }
  .user_st {
    padding: 3vh 0;
    height: 20%;
  }
  .detail_user {
    padding: 10vh 40vh;
  }
  .ds_regis {
    height: 210vh;
  }
  .perPage {
    margin-bottom: 10vh;
    margin-right: 5vh;
  }
}
@media screen and (max-width: 900px) {
  .all_user {
    margin-top: 14%;
    width: 210%;
    height: 80vh;
  }
  .user_st {
    padding: 1vh 0;
    height: 12%;
  }
  .detail_user {
    padding: 5vh 10vh;
  }
  .icon_user {
    gap: 40vw;
    padding: 0 10vh;
  }
  .user_login {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ds_regis {
    width: 210%;
    height: 90vh;
  }
  .register_icon {
    float: right;
    margin-left: 0;
    margin-right: 7%;
  }
  .full_getUser {
    margin-top: 15%;
  }
  .pagination {
    bottom: 6vh;
  }
}
@media screen and (max-width: 768px) {
  .all_user {
    margin-top: 16%;
  }
  .perPage {
    margin-bottom: 10vh;
  }
}
@media screen and (max-width: 1100px) and (max-height: 720px) {
  .all_user {
    margin-top: 9%;
  }
}
@media screen and (max-height: 720px) and (min-height: 551px) {
  .user_all {
    margin-top: 8%;
  }
  .all_user {
    height: 110vh;
  }
  .pagination {
    margin-bottom: -5vh;
    margin-right: 3vw;
  }
  .full_list {
    height: 80%;
  }
  .ds_regis {
    height: 110vh;
  }
  .full_getUser {
    height: 70%;
  }
  .full_list {
    height: 80%;
  }
  .all_table_user {
    height: 80%;
  }
}
@media screen and (max-width: 640px) and (min-width: 415px) {
  .all_user {
    margin-top: 22%;
    height: 80%;
  }
  .user_st {
    height: 30%;
  }
  .detail_user {
    padding: 10vh 22vh;
  }
  .ds_regis {
    height: 230vh;
  }
  .pagination {
    margin-bottom: -20vh;
    margin-right: 10vw;
  }
}
@media screen and (max-width: 414px) {
  .all_user {
    margin-top: 30%;
    width: 390%;
  }
  .perPage {
    margin-bottom: 10vh;
  }
  .icon_user {
    gap: 60vw;
    padding: 0 20vh;
  }
  .ds_regis {
    width: 390%;
    height: 110vh;
  }
}
@media screen and (max-width: 1408px) and (max-height: 720px) {
  .user_all {
    margin-top: 5%;
    width: 100%;
    display: inline-block;
  }
  .all_user {
    width: 100%;
  }
  .detail_user {
    padding: 0 20vw;
  }
  .ds_regis {
    width: 100%;
  }
  .full_list {
    margin-top: 15%;
  }
}
@media screen and (max-width: 1100px) and (max-height: 720px) {
  .all_user {
    margin-top: -1%;
  }
  .register_icon {
    margin-top: 2%;
  }
}
@media screen and (max-width: 395px) {
  .all_user {
    width: 400%;
  }
  .ds_regis {
    width: 400%;
  }
  .pagination {
    margin-right: 10vw;
  }
}
@media screen and (max-width: 375px) {
  .all_user {
    margin-top: 35%;
  }
  .user_st {
    padding: 0;
    height: 20%;
  }
  .user_tt {
    padding: 2vh 0;
  }
  .user_s {
    padding: 2vh 0;
  }
  .ds_regis {
    height: 150vh;
  }
  .pagination {
    margin-bottom: -10vh;
    margin-right: 10vw;
  }
}
@media screen and (max-width: 768px) and (max-height: 968px) and (min-height: 845px) {
  .all_user {
    margin-top: 23%;
  }
}
@media screen and (max-width: 600px) and (max-height: 968px) and (min-height: 845px) {
  .all_user {
    margin-top: 27%;
  }
}
@media screen and (max-width: 550px) and (max-height: 968px) and (min-height: 845px) {
  .all_user {
    margin-top: 30%;
  }
}
@media screen and (max-height: 1050px) and (min-height: 968px) {
  .pagination {
    bottom: 4vh;
  }
}
@media screen and (max-height: 995px) and (min-height: 968px) {
  .pagination {
    bottom: 6vh;
  }
}
@media screen and (max-height: 1300px) and (min-height: 1181px) {
  .all_table_user {
    height: 120%;
  }
  .pagination {
    bottom: -12vh;
  }
}
@media screen and (max-width: 1408px) and (max-height: 976px) and (min-height: 845px) {
  .user_all {
    margin-top: 5%;
  }
}
@media screen and (max-width: 1400px) and (max-height: 976px) and (min-height: 845px) {
  .user_all {
    margin-top: 10%;
  }
}
@media screen and (max-width: 1280px) and (max-height: 976px) and (min-height: 845px) {
  .user_all {
    margin-top: 11%;
  }
}
@media screen and (max-width: 1140px) and (max-height: 976px) and (min-height: 845px) {
  .user_all {
    margin-top: 12%;
  }
}
@media screen and (max-width: 1100px) and (max-height: 976px) and (min-height: 845px) {
  .all_user {
    margin-top: 10%;
  }
  .pagination {
    bottom: 10vh;
    right: 15vw;
  }
}
@media screen and (max-width: 965px) and (max-height: 967px) and (min-height: 845px) {
  .all_user {
    margin-top: 12vh;
  }
  .ds_regis {
    height: 105vh;
  }
  .pagination {
    bottom: 1vh;
  }
}
@media screen and (max-width: 900px) and (max-height: 967px) and (min-height: 845px) {
  .all_user {
    margin-top: 14vh;
  }
  .ds_regis {
    height: 112vh;
  }
  .pagination {
    bottom: 4vh;
  }
}
@media screen and (max-width: 639px) and (max-height: 967px) {
  .pagination {
    bottom: 10vh;
    right: 5vw;
  }
}
@media screen and (max-width: 965px) and (max-height: 940px) and (min-width: 961px) {
  .pagination {
    bottom: 10vh;
  }
}
@media screen and (max-width: 1820px) and (min-width: 1409px) and (max-height: 900px) {
  .table_user {
    height: 70%;
  }
}
@media screen and (max-width: 1714px) and (max-height: 900px) {
  .pagination {
    bottom: 6vh;
  }
}
@media screen and (max-height: 844px) and (max-width: 1920px) {
  .table_user {
    height: 70%;
  }
  .pagination {
    bottom: 6%;
  }
  .full_getUser {
    height: 70%;
  }
}
@media screen and (max-width: 1100px) and (max-height: 844px) {
  .all_user {
    height: 80%;
  }
  .full_list {
    margin-top: -7%;
    height: 90%;
  }
  .ds_regis {
    height: 100vh;
  }
  .table_list {
    width: 100%;
  }
}
@media screen and (max-width: 960px) and (max-height: 844px) and (min-width: 901px) {
  .all_user {
    margin-top: 10%;
  }
  .full_list {
    margin-top: 5%;
  }
  .ds_regis {
    height: 96vh;
  }
  .pagination {
    bottom: 1vh;
  }
}
@media screen and (max-width: 900px) and (max-height: 844px) {
  .all_user {
    margin-top: 11.5%;
  }
  .ds_regis {
    height: 100vh;
  }
  .full_list {
    margin-top: -5%;
  }
}
@media screen and (max-width: 768px) and (max-height: 844px) {
  .all_user {
    margin-top: 16%;
  }
}
@media screen and (max-width: 1920px) and (max-height: 1100px) {
  .full_getUser {
    height: 75%;
  }
  .full_list {
    height: 100%;
  }
  .all_table_user {
    height: 78%;
  }
}
@media screen and (max-width: 1280px) and (max-height: 720px) {
  .user_all {
    margin-top: 6%;
  }
}
@media screen and (max-width: 960px) and (max-height: 540px) {
  .all_user {
    margin-top: 6%;
  }
}
@media screen and (max-width: 1920px) and (max-height: 720px) and (min-width: 1409px) {
  .user_all {
    margin-top: 4%;
  }
}
@media screen and (max-width: 390px) and (max-height: 844px) {
  .all_user {
    margin-top: 30%;
  }
}
@media screen and (max-width: 1820px) and (max-height: 967px) and (min-width: 1715px) {
  .full_list {
    margin-top: 15%;
  }
}
</style>
