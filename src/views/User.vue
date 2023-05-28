<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <hearder-components />
  <div class="flex mt-4">
    <menu-components />
    <div class="w-100 all_user">
      <div class="flex h-20 user_st">
        <div class="user_tt w-1/2 border-r-slate-400">
          <p class="text-center mt-7 font-semibold">Thông tin khách hàng</p>
        </div>
        <input
          type="search"
          id="search_text"
          placeholder="Tìm kiếm"
          class="w-1/2 user_s font-semibold pl-3"
          @click="onSearch"
        />
      </div>
      <div class="flex gap-20 mt-6 ml-12">
        <router-link :to="{ name: 'detail' }">
          <img src="../assets/img/i.png" alt="" class="h-12 w-12" />
        </router-link>
        <router-link :to="{ name: 'detail' }">
          <img src="../assets/img/chat_user.png" alt="" class="h-12 w-12" />
        </router-link>
        <router-link :to="{ name: 'detail' }">
          <img src="../assets/img/mail_user.png" alt="" class="h-12 w-12" />
        </router-link>
        <router-link :to="{ name: 'detail' }">
          <img src="../assets/img/ab.png" alt="" class="h-12 w-10" />
        </router-link>
      </div>
      <div>
        <popup-detail />
      </div>
    </div>
    <div class="ds_regis">
      <div class="register_icon flex mt-14 cursor-pointer" @click="createUser">
        <p>Tạo Người Dùng</p>
        <img src="../assets/img/Icon.png" />
      </div>
      <div class="">
        <div class="full_list mt-10 mx-auto">
          <div class="all_list flex">
            <div class="user_list">
              <p class="font-normal text-2xl pt-2">Danh sách người dùng</p>
            </div>
            <router-link :to="{ name: 'note_user' }" class="user_note">
              <p class="font-normal text-2xl pt-2">Ghi chú</p>
            </router-link>
          </div>
          <table class="mt-10">
            <thead class="bg-gray-200">
              <tr class="">
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in reversedUsers" :key="user.id">
                <td>{{ user.fullname }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 1">
              Previous
            </button>
            <span>{{ currentPage }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HearderComponents from "../components/Header.vue";
import MenuComponents from "../components/Menu.vue";
import PopupDetail from "../components/Popup_detail.vue";
import axios from "axios";
export default {
  components: {
    HearderComponents,
    MenuComponents,
    PopupDetail,
  },
  data() {
    return {
      users: [],
      perPage: 6, // Số lượng người dùng hiển thị trên mỗi trang
      currentPage: 1, // Trang hiện tại
    };
  },
  mounted() {
    this.getUsers();
  },
  computed: {
    reversedUsers() {
      // Đảo ngược thứ tự của mảng users
      return this.users.slice().reverse();
    },
    totalPages() {
      return Math.ceil(this.users.length / this.perPage);
    },
    displayedUsers() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.users.slice(startIndex, endIndex);
    },
  },
  methods: {
    onSearch() {
      this.$router.push("/search");
    },
    createUser() {
      this.$router.push("/create_user");
    },

    getUsers() {
      axios
        .get("http://localhost:3000/users")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Error getting user list:", error);
        });
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>
<style scoped>
table {
  width: 960px;
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
}
.user_note {
  font-family: "Roboto";
  border: 1px solid rgba(151, 145, 145, 0.76);
  border-top: 4px solid rgba(151, 145, 145, 0.76);
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
  border-bottom: 2px solid #df6106;
}
#search_text {
  color: #a4a4a4;
}
.name_p {
  font-family: "Roboto";
}
</style>
