<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header-components class="header_items" />
  <menu-components class="menu_items mt-4" />
  <div class="flex mt-4 user_all relative">
    <div class="w-100 all_user">
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
            <div class="user_list">
              <p class="font-normal text-xl pt-2">Danh sách người dùng</p>
            </div>
            <router-link :to="{ name: 'note_user' }" class="user_note">
              <p class="font-normal text-xl pt-2">Ghi chú</p>
            </router-link>
          </div>
          <div class="all_table_user">
            <div class="table_user mt-10">
              <table class="cursor-pointer">
                <thead class="">
                  <tr class="fixed-row bg-gray-200">
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody class="">
                  <tr v-for="user in reversedUsers()" :key="user.id">
                    <td>{{ user.fullname }}</td>
                    <td @click="selectUser(user)">
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
        <div class="relative -mt-101 ml-24">
          <popup-detail
            :selectedUser="selectedUser"
            v-if="showComponentDetail"
            class="absolute"
            @close="resetComponentUser"
          />
        </div>
        <!-- <div class="relative -mt-100"></div> -->
      </div>
    </div>
  </div>
  <register-components
    :createUser="createUser"
    class="register_components absolute -mt-100 ml-96"
    v-if="showComponentRegister"
    @close="resetComponent"
    @userCreated="getUsers"
  />
</template>
<script>
import HeaderComponents from "../components/Header.vue";
import MenuComponents from "../components/Menu.vue";
import PopupDetail from "../components/PopupDetails.vue";
import RegisterComponents from "../components/RegisterUser.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";
export default {
  components: {
    HeaderComponents,
    MenuComponents,
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
      showComponentDetail: true,
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
  .popup_details {
    margin-left: 100px;
  }
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
    margin-top: 50px;
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
  .ds_regis {
    margin-top: -280px;
  }
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
