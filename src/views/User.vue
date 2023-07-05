<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex mt-4 user_all relative">
    <div class="all_user">
      <div class="flex h-20 user_st">
        <div class="user_tt w-1/2 border-r-slate-400">
          <p class="text-center mt-7 font-semibold user_st_p">
            Thông tin khách hàng
          </p>
        </div>
        <div
          id="search_text"
          class="w-1/2 user_s font-semibold pl-3"
          @click="onSearch"
        >
          <p class="py-6 mt-1 user_s_p cursor-pointer hover:text-black">
            Tìm kiếm
          </p>
        </div>
      </div>
      <div class="detail_user">
        <div class="flex gap-20 mt-6 ml-12 icon_user">
          <router-link :to="{ name: 'note_user' }">
            <img
              src="../assets/img/i.png"
              alt=""
              class="h-12 w-12 icon_user_img"
            />
          </router-link>
          <router-link :to="{ name: 'note_user' }">
            <img
              src="../assets/img/chat_user.png"
              alt=""
              class="h-12 w-12 icon_user_img"
            />
          </router-link>
          <router-link :to="{ name: 'note_user' }">
            <img
              src="../assets/img/mail_user.png"
              alt=""
              class="h-12 w-12 icon_user_img"
            />
          </router-link>
          <router-link :to="{ name: 'note_user' }">
            <img
              src="../assets/img/ab.png"
              alt=""
              class="h-12 w-10 icon_user_img"
            />
          </router-link>
        </div>
        <div class="user_login">
          <popup-detail :user="user" />
        </div>
      </div>
    </div>
    <div class="ds_regis">
      <div
        class="register_icon flex mt-28 cursor-pointer hover:bg-green-400 hover:text-blue-600"
        @click="showComponentRegister = true"
      >
        <p>Tạo Người Dùng</p>
        <img src="../assets/img/Icon.png" />
      </div>
      <div class="relative full_getUser">
        <div class="full_list mt-8 mx-auto">
          <div class="all_list flex">
            <div class="user_list">
              <p class="font-normal ff:text-xl text-base pt-2">
                Danh sách người dùng
              </p>
            </div>
            <router-link :to="{ name: 'note_user' }" class="user_note">
              <p
                class="font-normal ff:text-xl text-base pt-2 hover:text-black cursor-pointer"
              >
                Ghi chú
              </p>
            </router-link>
          </div>
          <div class="all_table_user">
            <div class="table_user mt-10">
              <table class="table_list">
                <thead class="">
                  <tr class="fixed-row bg-gray-200">
                    <th class="th_name">Họ và tên</th>
                    <th class="th_email">Email</th>
                    <th class="th_phone">Phone Number</th>
                  </tr>
                </thead>
                <tbody class="">
                  <tr v-for="user in reversedUsers()" :key="user.id">
                    <td>{{ user.fullname }}</td>
                    <td
                      @click="selectUser(user)"
                      class="cursor-pointer hover:text-blue-400"
                    >
                      {{ user.email }}
                    </td>
                    <td>{{ user.phone }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pagination absolute bottom-0 right-24">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="mt-4 change_page"
              >
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <button
                class="pagination_items h-8 w-8"
                v-for="pageNumber in visiblePageNumbers()"
                :key="pageNumber"
                :class="{ active: pageNumber === currentPage }"
                @click="changePage(pageNumber)"
              >
                {{ pageNumber }}
              </button>
              <span v-if="showEndEllipsis()">...</span>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages()"
                class="change_page mt-4"
              >
                <i class="fa-solid fa-chevron-right"></i>
              </button>
              <select
                id="itemsPerPage"
                v-model="perPage"
                @change="updatePagination"
                class="perPage"
              >
                <option
                  class="perPage_option"
                  v-for="option in itemsPerPageOptions"
                  :value="option"
                  :key="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <popup-detail
            :selectedUser="selectedUser"
            v-if="showComponentDetail"
            class="user-modal"
            @close="resetComponentUser"
          />
          <div
            :selectedUser="selectedUser"
            class="modal-overlay"
            v-if="showComponentDetail"
            @click="resetComponentUser"
          ></div>
        </div>
        <!-- <div class="relative -mt-100"></div> -->
      </div>
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";
export default {
  components: {
    PopupDetail,
    RegisterComponents,
  },
  data() {
    return {
      users: [],
      perPage: 20, // Số lượng người dùng hiển thị trên mỗi trang
      currentPage: 1, // Trang hiện tại
      selectedUser: null,
      selectedRegister: null,
      showComponentRegister: false,
      showComponentDetail: false,
      itemsPerPageOptions: [5, 10, 20, 30, 50],
      maxVisiblePages: 5,
    };
  },
  created() {
    this.fetchUserData();
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    resetComponentUser() {
      this.showComponentDetail = false; // Tắt Component A
      // Thực hiện các hành động khác để đặt lại trạng thái ban đầu cho Component B
    },
    resetComponent() {
      this.showComponentRegister = false;
    },
    onSearch() {
      this.$router.push("/search");
    },
    createUser() {
      this.showComponentRegister = true;
    },

    getUsers() {
      axios
        .get(`${process.env.VUE_APP_API_URL}`, {
          headers: {
            Authorization: "UserToken",
            // Add other headers as needed
          },
        })
        .then((response) => {
          const reversedData = [...response.data].reverse();
          this.users = reversedData;
        })
        .catch(() => {
          toast.error("Không thể lấy dữ liệu!", {
            autoClose: 2000,
          });
        });
    },
    reversedUsers() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.users.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.users.length / this.perPage);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getUsers();
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages()) {
        this.currentPage++;
        this.getUsers();
      }
    },
    selectUser(user) {
      this.selectedUser = user;
      this.showComponentDetail = true;
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    updatePagination() {
      // Reset về trang đầu tiên khi thay đổi số sản phẩm mỗi trang
      this.currentPage = 1;
    },
    visiblePageNumbers() {
      const pageNumbers = [];

      if (this.pageCount <= this.maxVisiblePages) {
        // Hiển thị tất cả các trang nếu không vượt quá độ dài quy định
        for (let i = 1; i <= this.pageCount; i++) {
          pageNumbers.push(i);
        }
      } else {
        const leftCount = Math.ceil((this.maxVisiblePages - 2) / 2); // Số trang hiển thị bên trái của trang hiện tại
        const rightCount = Math.floor((this.maxVisiblePages - 2) / 2); // Số trang hiển thị bên phải của trang hiện tại
        const startPage = Math.max(2, this.currentPage - leftCount);
        const endPage = Math.min(
          this.totalPages() - 1,
          this.currentPage + rightCount
        );

        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("...");
        }
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
        if (endPage < this.totalPages() - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(this.totalPages());
      }

      return pageNumbers;
    },
    showEndEllipsis() {
      return (
        this.pageCount > this.maxVisiblePages &&
        !this.visiblePageNumbers.includes(this.pageCount - 1)
      );
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
.all_user {
  width: 26.3vw;
}
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
.user-modal {
  width: 45%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Màu nền của modal */

  z-index: 1000;
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
  border-top: 4px solid #dd7a01;
  border-left: 1px solid rgba(151, 145, 145, 0.76);
  width: 300px;
  height: 50px;
  text-align: center;
  color: #dd7a01;
}
.user_note {
  font-family: "Roboto";
  border: 1px solid rgba(151, 145, 145, 0.76);
  border-top: 4px solid rgba(151, 145, 145, 0.76);
  border-bottom: none;
  width: 300px;
  height: 50px;
  text-align: center;
  color: rgba(151, 145, 145, 0.76);
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
  height: 90.3vh;
}
.ds_regis {
  width: 1255px;
  height: 90.3vh;
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
    height: 90%;
  }
  .pagination {
    margin-bottom: 2vh;
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
    margin-top: 6.8%;
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
    margin-top: 12%;
  }
}
@media screen and (max-width: 1280px) {
  .user_all {
    margin-top: 13%;
  }
}
@media screen and (max-width: 1100px) {
  .user_all {
    display: inline;
  }
  .all_user {
    margin-top: 13%;
    width: 210%;
    height: 82vh;
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
    margin-top: 8%;
    height: 210%;
  }
  .full_getUser {
    margin-top: 10%;
  }
  .user_st {
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
    margin-top: 21%;
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
}
@media screen and (max-width: 768px) {
  .all_user {
    margin-top: 19%;
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
    margin-top: 8%;
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
</style>
