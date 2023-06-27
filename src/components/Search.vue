<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="full_screen_search">
    <div class="flex all_search_form mt-4">
      <div class="all_search">
        <div class="flex h-20 user_st">
          <div class="user_tt w-1/2 border-r-slate-400">
            <router-link :to="{ name: 'user' }">
              <p class="text-center mt-6 font-semibold user_st_p">
                Thông tin khách hàng
              </p>
            </router-link>
          </div>
          <div class="user_s w-1/2">
            <p class="mt-6 font-semibold ml-4 user_sp">Tìm kiếm</p>
          </div>
        </div>
        <div class="w-96 search_form_1">
          <div class="relative -ml-8">
            <img
              src="../assets/img/search.png"
              class="img_search absolute mt-8 ml-16"
            />
            <input type="text" v-model="searchTerm" placeholder="0941584628" />
          </div>
          <div class="mt-10 ml-12 w-full">
            <p class="text_kq_search -ml-8">Kết quả tìm kiếm danh bạ</p>
          </div>
          <div class="mt-10 ml-20 w-full hidden" id="error_search"></div>
          <ul class="mt-10 ml-14 h-100 max-w-smd kq_search overflow-y-auto">
            <li
              v-for="contact in filteredContacts()"
              :key="contact.id"
              class="mt-2 w-96 right-2"
            >
              <div class="flex relative">
                <p class="search_name">{{ contact.fullname }}</p>
                <input
                  type="radio"
                  name="search"
                  :checked="searchBy === contact.id"
                  v-model="searchBy"
                  @change="showContactInfo(contact)"
                  class="absolute -top-2 right-1"
                />
              </div>
              <div class="flex relative mt-4">
                <span class="search_phone">{{ contact.phone }}</span>
                <img
                  src="../assets/img/search.png"
                  alt=""
                  class="h-6 w-6 absolute right-2"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="relative">
        <popup-detail
          :selectedContact="selectedContact"
          v-if="showComponentSearch"
          class="absolute"
          :close="isComponentClosed"
          @close="closeComponentSearch"
        />
      </div>
    </div>
  </div>
</template>
<script>
import PopupDetail from "../components/PopupDetails.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  components: {
    PopupDetail,
  },
  data() {
    return {
      contacts: [],
      searchTerm: "",
      selectedContact: null,
      searchBy: null,
      showComponentSearch: true,
      isComponentClosed: false,
    };
  },
  watch: {
    searchTerm(newSearchTerm) {
      if (newSearchTerm === "") {
        this.searchBy = null; // hoặc this.searchBy = ''
      }
    },
  },
  mounted() {
    this.fetchContacts();
  },
  computed: {},
  methods: {
    closeComponentSearch() {
      this.showComponentSearch = !this.showComponentSearch;
      this.searchBy = null;

      // this.searchBy = null;
    },
    async fetchContacts() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}`);
        this.contacts = response.data;
      } catch {
        toast.error("Không thể kết nối đến server để lấy dữ liệu!", {
          autoClose: 2000,
        });
      }
    },
    showContactInfo(contact) {
      this.selectedContact = contact;
      this.showComponentSearch = true;
    },
    filteredContacts() {
      if (this.searchTerm === "") {
        return this.contacts;
      } else {
        const searchTerm = this.searchTerm.toLowerCase();
        return this.contacts.filter((contact) =>
          contact.phone.includes(searchTerm)
        );
      }
    },
  },
};
</script>
<style scoped>
.show_contact_search {
  border-top: 1px solid #cfcfcf;
  width: 1367.7px;
}
.full_screen_search {
  height: 967px;
  width: 1837px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
.form_details {
  font-family: "Roboto";
  border: 2px solid rgba(71, 58, 58, 0.322);
  padding: 10px 10px;
  background: white;
  height: 870px;
  box-shadow: -1px 0px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
}
.text_kq_search {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
}
li {
  border-bottom: 1px solid #a4a4a4;
  padding: 10px;
}
.search_name {
  color: #df6106;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
}
.search_phone {
  color: rgb(88, 88, 247);
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
}
input[type="radio"] {
  margin-right: 10px;
  margin-top: 15px;
  height: 20px;
  width: 20px;
}
.kq_search {
  width: 415px;
}
.all_search {
  border-right: 2px solid #cfcfcf;
  width: 505.3px;
  height: 900px;
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
  font-family: "Poppins";
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
.search_form_1 {
  font-family: "Roboto";
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
.user_item_1 p {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
}
.user_item_2 p {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
}
.user_item_3 p {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
}
.user_item_1 {
  background: #dd7a01;
  border-radius: 16px;
  color: white;
  width: 77px;
  height: 29px;
  text-align: center;
}
.user_item_2 {
  background: #0b8e11;
  border-radius: 16px;
  color: white;
  width: 94px;
  height: 29px;
  text-align: center;
}
.user_item_3 {
  background: #ffdada;
  border-radius: 16px;
  color: #db524e;
  width: 110px;
  height: 29px;
  text-align: center;
}
@media only screen and (max-width: 1280px) and (max-height: 720px) {
  .show_contact_search {
    border-top: none;
  }
  .full_screen_search {
    height: 1200px;
    width: 1608px;
    border-bottom: 2px solid rgba(71, 58, 58, 0.322);
  }
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
  }
  .search_form_1 {
    margin-left: 150px;
  }
  .form_details {
    margin-top: 150px;
    width: 760px;
  }
  .all_search {
    width: 804px;
  }
  .user_sp {
    margin-top: 50px;
  }
  .user_st {
    margin-top: -10px;
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
}
@media only screen and (max-width: 1280px) and (max-height: 1080px) {
  .search_form_1 {
    margin-left: 150px;
  }
  .full_screen_search {
    height: 1200px;
    width: 1608px;
    border-bottom: 2px solid rgba(71, 58, 58, 0.322);
  }
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
    width: 1608px;
    border: none;
  }
  .form_details {
    margin-top: 150px;
    width: 760px;
  }
  .all_search {
    width: 804px;
    height: 1080px;
  }
  .user_sp {
    margin-top: 50px;
  }
  .user_st {
    margin-top: -10px;
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
}
@media only screen and (max-width: 1600px) and (max-height: 900px) {
  .search_form_1 {
    margin-left: 150px;
  }
  .full_screen_search {
    height: 1200px;
    width: 1608px;
    border-bottom: 2px solid rgba(71, 58, 58, 0.322);
  }
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
    width: 1608px;
  }
  .form_details {
    margin-top: 150px;
    width: 760px;
  }
  .all_search {
    width: 804px;
  }
  .user_sp {
    margin-top: 50px;
  }
  .user_st {
    margin-top: -10px;
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
}
@media only screen and (max-width: 960px) and (max-height: 540px) {
}
@media only screen and (max-width: 640px) and (max-height: 360px) {
}
@media only screen and (max-width: 768px) and (max-height: 1024px) {
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
    width: 1608px;
  }
  .form_details {
    margin-top: 150px;
    margin-left: 100px;
  }
  .all_search {
    width: 804px;
  }
  .search_form_1 {
    margin-left: 150px;
    margin-top: 50px;
  }
  .user_sp {
    margin-top: 50px;
  }
  .user_st {
    margin-top: -10px;
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
}
@media only screen and (max-width: 820px) and (max-height: 1180px) {
  .full_screen_search {
    height: 1200px;
    width: 1608px;
    border-bottom: 2px solid rgba(71, 58, 58, 0.322);
  }
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
    width: 1608px;
  }
  .form_details {
    margin-top: 150px;
    margin-left: 100px;
  }
  .all_search {
    width: 804px;
  }
  .search_form_1 {
    margin-left: 150px;
    margin-top: 50px;
  }
  .user_sp {
    margin-top: 50px;
  }
  .user_st {
    margin-top: -10px;
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
}
@media only screen and (max-width: 412px) and (max-height: 915px) {
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
    width: 1608px;
  }
  .form_details {
    margin-top: 150px;
    margin-left: 100px;
  }
  .all_search {
    width: 804px;
  }
  .search_form_1 {
    margin-left: 150px;
    margin-top: 50px;
  }
  .user_sp {
    margin-top: 50px;
  }
  .user_st {
    margin-top: -10px;
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .all_search_form {
    display: inline-block;
  }
  .all_search {
    border-right: 0px;
  }
  .search_form_1 {
    width: 500px;
    margin-left: 550px;
  }
  .kq_search {
    width: 500px;
  }
  input[type="text"] {
    width: 450px;
  }
}
@media only screen and (max-width: 414px) and (max-height: 896px) {
  .all_search_form {
    display: inline-block;
  }
  .all_search {
    border-right: 0px;
  }
  .search_form_1 {
    width: 500px;
    margin-left: 550px;
  }
  .kq_search {
    width: 500px;
  }
  input[type="text"] {
    width: 450px;
  }
}
@media only screen and (max-width: 390px) and (max-height: 844px) {
  .all_search_form {
    display: inline-block;
  }
  .all_search {
    border-right: 0px;
  }
  .search_form_1 {
    width: 500px;
    margin-left: 550px;
  }
  .kq_search {
    width: 500px;
  }
  input[type="text"] {
    width: 450px;
  }
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
    width: 1608px;
  }
  .form_details {
    margin-top: 150px;
    margin-left: 100px;
  }
  .all_search {
    width: 804px;
  }
  .user_sp {
    margin-top: 50px;
  }
  .user_st {
    margin-top: -10px;
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
}
@media only screen and (max-width: 360px) and (max-height: 740px) {
  .all_search_form {
    display: inline-block;
  }
  .all_search {
    border-right: 0px;
  }
  .search_form_1 {
    width: 500px;
    margin-left: 480px;
  }
  .kq_search {
    width: 500px;
  }
  input[type="text"] {
    width: 450px;
  }
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
    width: 1608px;
  }
  .form_details {
    margin-top: 150px;
    margin-left: 50px;
  }
  .all_search {
    width: 804px;
  }
  .user_sp {
    margin-top: 50px;
  }
  .user_st {
    margin-top: -10px;
    height: 120px;
    width: 1608px;
  }
  .user_st_p {
    margin-top: 50px;
  }
  .user_tt {
    width: 715px;
  }
}
@media only screen and (max-width: 375px) and (max-height: 667px) {
  .all_search_form {
    display: inline-block;
  }
  .all_search {
    border-right: 0px;
  }
  .search_form_1 {
    width: 500px;
    margin-left: 500px;
  }
  .kq_search {
    width: 500px;
  }
  input[type="text"] {
    width: 450px;
  }
  .header_items {
    display: none;
  }
  .form_details {
    margin-top: 150px;
    margin-left: 100px;
  }
  .all_search {
    width: 756px;
  }
  .user_sp {
    margin-top: 50px;
  }
  .user_st {
    margin-top: -10px;
    height: 120px;
    width: 1508px;
  }
  .user_st_p {
    margin-top: 50px;
  }
}
</style>
