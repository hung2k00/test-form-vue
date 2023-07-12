<template>
  <div>
    <div
      class="float-right mr-6 mt-4 cursor-pointer"
      @click="onClose"
      v-if="selectedUser"
    >
      <i class="fa-solid fa-xmark fa-2xl" style="color: #888b91"></i>
    </div>
    <div v-for="item in [user, selectedUser, selectedContact]" :key="item">
      <div :class="showContactSearch(item)" v-if="item">
        <div :class="[formDetailsSearch(item), getUserClass(item)]">
          <div
            class="close_search float-right mr-6 mt-4 cursor-pointer sm:hidden"
            @click="onClose"
            v-if="selectedContact"
          >
            <i class="fa-solid fa-xmark fa-2xl" style="color: #888b91"></i>
          </div>
          <div class="flex mt-20 ml-4 text_details">
            <div>
              <img
                :src="item.picture"
                alt=""
                class="h-28 w-28 rounded-full img_avatar"
              />
            </div>
            <div>
              <div>
                <p class="font-bold text-2xl name_p mt-6 ml-2">
                  {{ item.fullname }}
                </p>
              </div>
              <div class="flex gap-6 ml-2 mt-2 item-getUser">
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
          <div class="detail_icons" :class="userClass(item)">
            <div class="flex gap-3 ml-11 mt-14">
              <img src="../assets/img/mail2.png" />
              <p class="font-normal text-xl ml-4">{{ item.email }}</p>
            </div>
            <div class="flex gap-3 ml-10 mt-9">
              <img src="../assets/img/id_number.png" />
              <p class="font-normal text-xl ml-4 mt-2">{{ item.idNumber }}</p>
            </div>
            <div class="flex gap-3 ml-10 mt-10">
              <img src="../assets/img/phone.png" alt="" />
              <p class="font-normal text-xl ml-5">{{ item.phone }}</p>
            </div>
            <div class="flex gap-3 ml-10 mt-11">
              <img src="../assets/img/address.png" alt="" class="h-10 w-10" />
              <p class="font-normal text-xl ml-6">{{ item.address }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  methods: {
    userClass(item) {
      return {
        detail_icons_user: item === this.user,
      };
    },
    getUserClass(item) {
      return {
        form_details_selectUser: item === this.selectedUser,
      };
    },
    showContactSearch(item) {
      return {
        show_contact_search: item === this.selectedContact,
      };
    },
    formDetailsSearch(item) {
      return {
        form_details_search: item === this.selectedContact,
      };
    },
    onClose() {
      this.$emit("close");
    },
  },
  props: {
    selectedUser: {
      type: Object,
      default: null,
    },
    user: {
      type: Object,
      default: null,
    },
    selectedContact: {
      type: Object,
      default: null,
    },
  },
};
</script>
<style lang="css" scoped>
.img_avatar {
  box-shadow: 0px 6px 8px 5px rgba(71, 58, 58, 0.322);
}
.form_details_search {
  font-family: "Roboto";
  padding: 10px 10px;
  background: white;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.show_contact_search {
  width: 150%;
  padding: 0 20vh;
  margin-top: 7vh;
  height: 100%;
}
.form_details_selectUser {
  border: 2px solid white;
  border-radius: 20px;
  padding: 10px 10px;
  background: white;
  height: 590px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.5);
}
.form_details {
  font-family: "Roboto";
  height: 800px;
  width: 1200px;
  margin-top: -310px;
  margin-left: 20px;
  padding: 90px 200px;
}
.text_details {
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
.popup_detail {
  border: 1px solid #cfcfcf;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.detail_icons {
  font-family: "Roboto";
}
@media screen and (max-width: 1905px) {
  .form_details_search {
    height: 80%;
    margin-left: -2vw;
  }
}
@media screen and (max-width: 1745px) and (min-width: 1408px) {
  .item-getUser {
    gap: 2vw;
    margin-right: 1vw;
  }
  .user_item_1 {
    font-size: 70%;
    height: 80%;
    width: 3vw;
  }
  .user_item_2 {
    font-size: 70%;
    height: 80%;
    width: 5vw;
  }
  .user_item_3 {
    font-size: 70%;
    height: 80%;
    width: 4vw;
  }
}
@media screen and (max-width: 1700px) and (min-width: 1409px) {
  .form_details_search {
    width: 80%;
  }
  .show_contact_search {
    width: 128%;
    margin-left: -15%;
  }
}
@media only screen and (max-width: 1280px) and (max-height: 1080px) {
  .form_details_selectUser {
    margin-left: 200px;
  }
  .show_contact_search {
    border-top: none;
    margin-top: 100px;
    width: 120%;
  }
}
@media only screen and (max-width: 1600px) and (max-height: 900px) {
  .form_details_selectUser {
    margin-left: 200px;
  }
  .show_contact_search {
    border-top: none;
    margin-top: 100px;
    width: 800px;
  }
}
@media only screen and (max-width: 960px) and (max-height: 540px) and (min-width: 376px) {
  .all_form {
    margin-top: 0;
    margin-left: 140px;
  }
  .login_p {
    margin-top: 50px;
  }
  .form_details_selectUser {
    margin-left: 190px;
  }
  .show_contact_search {
    border-top: none;
    width: 800px;
  }
  .form_details_search {
    margin-top: -95%;
  }
}
@media only screen and (max-width: 375px) and (max-height: 667px) {
  .detail_icons_user {
    display: none;
  }
  .form_details_search {
    margin-top: 20%;
  }
}
@media screen and (max-width: 640px) {
  .detail_icons_user {
    display: none;
  }
}
@media only screen and (max-width: 768px) and (max-height: 1024px) {
}
@media only screen and (max-width: 820px) and (max-height: 1180px) {
  .form_details_selectUser {
    margin-left: 190px;
  }
  .show_contact_search {
    border-top: none;
    margin-top: 100px;
    width: 800px;
  }
  .form_details_search {
    width: 150%;
  }
}
@media only screen and (max-width: 412px) and (max-height: 915px) {
  .detail_icons_user {
    display: none;
  }
  .show_contact_search {
    margin-top: 10px;
    width: 900px;
    margin-left: 320px;
  }
}
@media only screen and (max-width: 414px) and (max-height: 896px) {
  .detail_icons_user {
    display: none;
  }
  .show_contact_search {
    margin-top: 10px;
    width: 900px;
    margin-left: 320px;
  }
}
@media only screen and (max-width: 360px) and (max-height: 740px) {
  .detail_icons_user {
    display: none;
  }
  .show_contact_search {
    margin-top: 10px;
    width: 900px;
    margin-left: 270px;
  }
  .form_details_search {
    margin-top: 30%;
  }
}
@media only screen and (max-width: 390px) and (max-height: 844px) {
  .detail_icons_user {
    display: none;
  }
}
@media screen and (max-width: 640px) and (max-height: 360px) {
  .form_details_search {
    margin-top: 8%;
    margin-left: 50%;
  }
}
@media screen and (max-width: 900px) {
  .form_details_selectUser {
    margin-left: 0;
  }
}
</style>
