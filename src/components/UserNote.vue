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
      <div class="register_icon flex mt-28 cursor-pointer" @click="createUser">
        <p>Tạo Người Dùng</p>
        <img src="../assets/img/Icon.png" />
      </div>
      <div class="relative">
        <div class="full_list mt-8 mx-auto">
          <div class="all_list flex">
            <router-link :to="{ name: 'user' }" class="user_list">
              <p class="font-normal text-xl pt-2">Danh sách người dùng</p>
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
@media only screen and (max-width: 1920px) and (max-height: 1080px) {
  .user_all {
    height: 970px;
  }
  .ds_regis {
    height: 970px;
  }
}
@media only screen and (max-width: 1280px) and (max-height: 720px) {
  .register_components {
    margin-top: -20px;
    margin-left: 280px;
  }
  .perPage_option {
    height: 32px;
  }
  .header_items {
    display: none;
  }
  .all_user {
    box-shadow: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1608px;
  }
  .user_st {
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .detail_user {
    margin-left: 100px;
    width: 1300px;
    height: 700px;
    padding: 50px;
  }
  .icon_user {
    margin-left: 280px;
    gap: 180px;
  }
  .user_s_p {
    margin-top: 20px;
  }
  .ds_regis {
    margin-left: 150px;
    margin-top: 50px;
  }
  detail-components {
    margin-left: 50px;
  }
}
@media only screen and (max-width: 1280px) and (max-height: 1080px) {
  .register_components {
    margin-top: -20px;
    margin-left: 280px;
  }
  .header_items {
    display: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1608px;
  }
  .user_st {
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .detail_user {
    margin-left: 100px;
    width: 1300px;
    height: 700px;
    padding: 50px;
  }
  .icon_user {
    margin-left: 280px;
    gap: 180px;
  }
  .user_s_p {
    margin-top: 20px;
  }
  .ds_regis {
    margin-left: 150px;
    margin-top: 50px;
  }
  detail-components {
    margin-left: 50px;
  }
  .all_user {
    box-shadow: none;
  }
}
@media only screen and (max-width: 1600px) and (max-height: 900px) {
  .register_components {
    margin-top: -20px;
    margin-left: 200px;
  }
  .header_items {
    display: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1608px;
  }
  .user_st {
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .detail_user {
    margin-left: 100px;
    width: 1300px;
    height: 700px;
    padding: 50px;
  }
  .icon_user {
    margin-left: 280px;
    gap: 180px;
  }
  .user_s_p {
    margin-top: 20px;
  }
  .ds_regis {
    margin-left: 150px;
    margin-top: 50px;
  }
  detail-components {
    margin-left: 50px;
  }
  .all_user {
    box-shadow: none;
  }
}
@media only screen and (max-width: 960px) and (max-height: 540px) {
  .register_components {
    margin-top: -20px;
    margin-left: 280px;
  }
  .header_items {
    display: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1608px;
  }
  .user_st {
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .detail_user {
    margin-left: 100px;
    width: 1300px;
    height: 700px;
    padding: 50px;
  }
  .icon_user {
    margin-left: 280px;
    gap: 180px;
  }
  .user_s_p {
    margin-top: 20px;
  }
  .ds_regis {
    margin-left: 150px;
    margin-top: 50px;
  }
  detail-components {
    margin-left: 50px;
  }
  .all_user {
    box-shadow: none;
  }
}
@media only screen and (max-width: 640px) and (max-height: 360px) {
  .register_components {
    margin-top: -320px;
    margin-left: 280px;
  }
  .header_items {
    display: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1600px;
  }
  .user_st {
    height: 120px;
    width: 1600px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .detail_user {
    margin-left: 150px;
    width: 1300px;
    height: 700px;
    padding: 50px;
  }
  .icon_user {
    margin-left: 280px;
    gap: 180px;
  }
  .user_s_p {
    margin-top: 20px;
  }
  .ds_regis {
    margin-left: 200px;
    margin-top: -250px;
  }
  detail-components {
    margin-left: 50px;
  }
  .all_user {
    box-shadow: none;
  }
}
@media only screen and (max-width: 375px) and (max-height: 667px) {
  .register_components {
    margin-top: -330px;
    margin-left: 280px;
  }
  .header_items {
    display: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1000px;
  }
  .user_st {
    height: 120px;
    width: 1000px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .ds_regis {
    margin-top: -250px;
  }
}
@media only screen and (max-width: 768px) and (max-height: 1024px) {
  .register_components {
    margin-top: -320px;
    margin-left: 250px;
  }
  .header_items {
    display: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1600px;
  }
  .user_st {
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .ds_regis {
    margin-top: -250px;
  }
  .pagination {
    bottom: 0;
  }
}
@media only screen and (max-width: 820px) and (max-height: 1180px) {
  .register_components {
    margin-top: -800px;
    margin-left: 280px;
  }
  .header_items {
    display: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1608px;
  }
  .user_st {
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .detail_user {
    margin-left: 100px;
    width: 1300px;
    height: 700px;
    padding: 50px;
  }
  .icon_user {
    margin-left: 280px;
    gap: 180px;
  }
  .user_s_p {
    margin-top: 20px;
  }
  .ds_regis {
    margin-left: 150px;
    margin-top: -250px;
  }
  detail-components {
    margin-left: 50px;
  }
  .all_user {
    box-shadow: none;
  }
  .pagination {
    bottom: 80px;
  }
}
@media only screen and (max-width: 412px) and (max-height: 915px) {
  .register_components {
    margin-top: -320px;
    margin-left: 280px;
  }
  .header_items {
    display: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1608px;
  }
  .user_st {
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .pagination {
    bottom: 20px;
  }
}
@media only screen and (max-width: 414px) and (max-height: 896px) {
  .register_components {
    margin-top: -320px;
    margin-left: 280px;
  }
  .header_items {
    display: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1608px;
  }
  .user_st {
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .ds_regis {
    margin-top: -250px;
  }
  .pagination {
    bottom: 20px;
  }
}
@media only screen and (max-width: 390px) and (max-height: 844px) {
  .header_items {
    display: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1255px;
  }
  .user_st {
    height: 120px;
    width: 1555px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .pagination {
    bottom: 0;
  }
}
@media only screen and (max-width: 360px) and (max-height: 740px) {
  .register_components {
    margin-left: 200px;
  }
  .header_items {
    display: none;
  }
  .user_all {
    display: block;
    margin-top: 150px;
    width: 1455px;
  }
  .user_st {
    height: 120px;
    width: 1455px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .detail_user {
    margin-left: 50px;
  }

  .ds_regis {
    margin-left: 100px;
  }
}
</style>
