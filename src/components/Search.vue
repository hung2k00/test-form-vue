<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="full_screen_search">
    <div class="flex all_search_form">
      <div class="all_search">
        <div class="flex h-20 user_st">
          <div class="user_tt w-1/2 border-r-slate-400">
            <router-link :to="{ name: 'user' }">
              <p
                class="text-center mt-6 font-semibold user_st_p cursor-pointer hover:text-black"
              >
                Thông tin khách hàng
              </p>
            </router-link>
          </div>
          <div class="user_s w-1/2">
            <p class="mt-6 font-semibold ml-4 user_sp">Tìm kiếm</p>
          </div>
        </div>
        <div class="search_form_1">
          <div class="w-96 search_list">
            <div class="relative -ml-8">
              <img
                src="../assets/img/search.png"
                class="img_search absolute mt-8 ml-16"
              />
              <input
                type="text"
                v-model="searchTerm"
                placeholder="0941584628"
              />
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
                    class="absolute -top-2 right-1 cursor-pointer"
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
      </div>
      <div class="relative show_popup">
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
@media screen and (max-width: 1920px) and (max-height: 967px) {
  .full_screen_search {
    height: 87vh;
    width: 95vw;
  }
  .all_search {
    height: 87vh;
  }
  .show_popup {
    height: 87vh;
  }
  .text_kq_search {
    font-size: 100%;
  }
  .search_name {
    font-size: 100%;
  }
  .search_phone {
    font-size: 100%;
  }
  input[type="text"] {
    width: 80%;
  }
  .search_form_1 {
    height: 80%;
  }
  .kq_search {
    height: 50vh;
  }
}
@media screen and (max-width: 1910px) {
  .full_screen_search {
    height: 87vh;
    width: 95vw;
  }
  .all_search {
    height: 87vh;
  }
  .show_popup {
    height: 87vh;
  }
  .text_kq_search {
    font-size: 100%;
  }
  .search_name {
    font-size: 90%;
  }
  .search_phone {
    font-size: 90%;
  }
  input[type="text"] {
    width: 80%;
  }
  .search_form_1 {
    height: 80%;
  }
  .kq_search {
    height: 50vh;
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
@media screen and (max-width: 1745px) and (min-width: 1409px) {
  .th_table {
    width: 5vw;
  }
  .th_email {
    width: 8vw;
  }
  .full_list {
    margin-top: 18%;
  }
  .pagination {
    margin-bottom: 1vh;
  }
}
@media screen and (max-width: 1408px) {
  .full_screen_search {
    margin-top: 4.5%;
    width: 210%;
  }
  .all_search {
    width: 30%;
  }
  .show_contact_search {
    width: 73%;
  }
  .search_form_1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media screen and (max-width: 1400px) {
  .full_screen_search {
    margin-top: 9.5%;
  }
}
@media screen and (max-width: 1280px) {
  .full_screen_search {
    margin-top: 10.5%;
    width: 210%;
  }
  .all_search {
    width: 40%;
  }
  .show_popup {
    width: 100%;
  }
}
@media screen and (max-width: 1100px) {
  .full_screen_search {
    margin-top: 12%;
    box-shadow: none;
    width: 168.5%;
  }
  .all_search_form {
    display: inline;
  }
  .all_search {
    width: 124.6%;
  }
  .search_form_1 {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.3vh solid rgba(0, 0, 0, 0.25);
    padding-bottom: 4vh;
    margin-left: -8%;
  }
  input[type="text"] {
    width: 120%;
  }
  .show_popup {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -10%;
    margin-left: 10%;
  }
}
@media only screen and (max-width: 960px) {
  .show_popup {
    margin-left: 0;
  }
  .full_screen_search {
    margin-top: 14%;
    width: 191.5%;
  }
  .all_search_form {
    display: inline;
  }
  .all_search {
    width: 109.6%;
  }
  .search_list {
    height: 80%;
  }
  .kq_search {
    height: 70%;
  }
  .search_form_1 {
    height: 80%;
  }
}
@media screen and (max-width: 900px) {
  .full_screen_search {
    margin-top: 15%;
    width: 191.5%;
  }
  .all_search_form {
    display: inline;
  }
  .search_list {
    height: 70%;
  }
  .kq_search {
    height: 80%;
  }
  .search_form_1 {
    height: 100%;
  }
  input[type="text"] {
    width: 120%;
  }
  .show_popup {
    margin-top: -10%;
    margin-left: 5%;
  }
}
@media screen and (max-width: 768px) {
  .full_screen_search {
    margin-top: 17%;
  }
}
@media screen and (max-height: 720px) and (min-height: 670px) {
  .full_screen_search {
    margin-top: 9%;
    height: 120%;
  }
  .all_search_form {
    height: 120vh;
  }
  .all_search {
    height: 90%;
  }
}
@media screen and (max-width: 640px) and (min-width: 415px) {
  .full_screen_search {
    margin-top: 21%;
  }
  .search_form_1 {
    height: 60%;
  }
  .show_popup {
    margin-top: -18%;
    margin-left: 20%;
    height: 50%;
    width: 50%;
  }
  .kq_search {
    height: 50%;
  }
}
@media screen and (max-width: 414px) {
  .full_screen_search {
    margin-top: 34%;
    width: 355%;
  }
  .show_popup {
    margin-left: -10%;
    margin-top: 10%;
  }
}
@media screen and (max-width: 1408px) and (max-height: 720px) {
  .full_screen_search {
    width: 100%;
    margin-top: 5.5%;
  }
  .kq_search {
    width: 100%;
    margin-left: 0;
  }
}
@media screen and (max-width: 1100px) and (max-height: 720px) {
  .full_screen_search {
    display: inline-block;
  }
  .all_search {
    width: 100%;
  }
  .show_popup {
    width: 90%;
    margin-top: -4%;
  }
}
@media screen and (max-width: 395px) {
  .full_screen_search {
    width: 365%;
    margin-top: 33%;
  }
  .user_st {
    height: 14%;
  }
  .show_popup {
    margin-top: 30%;
  }
  .show_popup {
    margin-top: 10%;
  }
}
@media screen and (max-width: 375px) {
  .full_screen_search {
    width: 365%;
    margin-top: 29%;
  }
  .all_user {
    margin-top: 35%;
  }
  .user_st {
    padding: 0;
    height: 14%;
  }
  .user_tt {
    padding: 2vh 0;
  }
  .user_s {
    padding: 2vh 0;
  }
  .show_popup {
    margin-top: 20%;
  }
}
@media screen and (max-width: 1920px) and (max-height: 1070px) and (min-width: 1409px) {
  .full_screen_search {
    height: 88vh;
  }
  .search_list {
    height: 55%;
  }
  .kq_search {
    height: 60vh;
  }
}
@media screen and (max-width: 900px) and (max-height: 967px) {
  .show_popup {
    margin-top: 0;
  }
}
@media screen and (max-width: 600px) and (max-height: 967px) {
  .full_screen_search {
    margin-top: 24%;
  }
}
@media screen and (max-width: 500px) and (max-height: 967px) {
  .full_screen_search {
    margin-top: 29%;
  }
}
@media screen and (max-width: 960px) and (max-height: 540px) and (min-width: 376px) {
  .full_screen_search {
    margin-top: 8%;
  }
  .all_search_form {
    height: 4vh;
  }
  .search_form_1 {
    height: 100%;
  }
  .show_popup {
    margin-top: 25%;
    height: 50%;
    margin-left: 10%;
  }
}
@media screen and (max-width: 1920px) and (max-height: 720px) and (min-width: 1409px) {
  .full_screen_search {
    margin-top: 4%;
    height: 100%;
  }
}
</style>
