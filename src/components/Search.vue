<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <hearder-components class="header_items" />
  <menu-components class="menu_items mt-4" />
  <div class="flex all_search_form">
    <div class="all_search">
      <div class="flex h-20 user_st mt-4">
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
        <div class="relative">
          <img
            src="../assets/img/search.png"
            class="img_search absolute mt-8 ml-16"
          />
          <input type="text" v-model="searchTerm" placeholder="0941584628" />
        </div>
        <div class="mt-10 ml-12 w-full">
          <p class="font-semibold">Kết quả tìm kiếm danh bạ</p>
        </div>
        <ul class="mt-10 ml-12 kq_search">
          <li
            v-for="contact in filteredContacts"
            :key="contact.id"
            @click="showContactInfo(contact)"
            class="-ml-12 mt-2"
          >
            <input type="radio" name="searchCriteria" v-model="searchBy" />
            {{ contact.fullname }}: &nbsp;{{ contact.phone }}
          </li>
        </ul>
      </div>
    </div>
    <div class="form_details" v-if="selectedContact">
      <div class="detail_items_form">
        <div class="flex mt-14 ml-4">
          <div class="">
            <img src="../assets/img/avartar.png" alt="" class="h-28 w-28" />
          </div>
          <div>
            <div class="">
              <p class="font-bold text-2xl name_p mt-6 ml-2">
                {{ selectedContact.fullname }}
              </p>
            </div>
            <div class="flex gap-10 ml-2 mt-2">
              <div class="user_item_1">
                <p>VIP</p>
              </div>
              <div class="user_item_2">
                <p>ACTIVE</p>
              </div>
              <div class="user_item_3">
                <p>TPIN</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="flex gap-3 ml-11 mt-14">
            <img src="../assets/img/mail2.png" />
            <p class="font-normal text-xl ml-4">
              {{ selectedContact.email }}
            </p>
          </div>
          <div class="flex gap-3 ml-10 mt-9">
            <img src="../assets/img/cccd.png" />
            <p class="font-normal text-xl ml-4 mt-2">
              {{ selectedContact.cmnd }}
            </p>
          </div>
          <div class="flex gap-3 ml-10 mt-10">
            <img src="../assets/img/phone.png" alt="" />
            <p class="font-normal text-xl ml-5">
              {{ selectedContact.phone }}
            </p>
          </div>
          <div class="flex gap-3 ml-10 mt-11">
            <img src="../assets/img/address.png" alt="" />
            <p class="font-normal text-xl ml-6">
              {{ selectedContact.address }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HearderComponents from "../components/Header.vue";
import MenuComponents from "../components/Menu.vue";
import axios from "axios";

export default {
  components: {
    HearderComponents,
    MenuComponents,
  },
  data() {
    return {
      contacts: [],
      searchTerm: "",
      selectedContact: null,
      searchBy: "",
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
  computed: {
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
  methods: {
    async fetchContacts() {
      try {
        const response = await axios.get("http://localhost:3000/users");
        this.contacts = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    showContactInfo(contact) {
      this.selectedContact = contact;
    },
  },
};
</script>
<style scoped>
input[type="radio"] {
  margin-right: 10px;
  margin-top: 15px;
  height: 25px;
  width: 25px;
}
.kq_search {
  width: 530px;
}
.all_search {
  border-right: 2px solid #cfcfcf;
  width: 450px;
  height: 830px;
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
.detail_items_form {
  border: 2px solid white;
  border-radius: 20px;
  padding: 10px 10px;
  background: white;
  height: 590px;
}
.all_user {
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
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
    width: 1608px;
  }
  .form_details {
    margin-top: 150px;
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
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
    width: 1608px;
  }
  .form_details {
    margin-top: 150px;
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
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
    width: 1608px;
  }
  .form_details {
    margin-top: 150px;
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
}
@media only screen and (max-width: 414px) and (max-height: 896px) {
}
@media only screen and (max-width: 390px) and (max-height: 844px) {
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
@media only screen and (max-width: 360px) and (max-height: 740px) {
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
  .search_form_1 {
    margin-left: 100px;
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
@media only screen and (max-width: 375px) and (max-height: 667px) {
  .header_items {
    display: none;
  }
  .all_search_form {
    margin-top: 130px;
    width: 108px;
  }
  .form_details {
    margin-top: 150px;
    margin-left: 100px;
  }
  .all_search {
    width: 756px;
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
    width: 1508px;
  }
  .user_st_p {
    margin-top: 50px;
  }
}
</style>
