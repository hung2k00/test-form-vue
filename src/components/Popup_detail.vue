<template v-if="isLoggedIn">
  <div class="flex mt-20 ml-4">
    <div>
      <img src="../assets/img/avartar.png" alt="" class="h-28 w-28" />
    </div>
    <div>
      <div class="">
        <p class="font-bold text-2xl name_p mt-6 ml-2">{{ user.fullname }}</p>
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
  <div class="detail_icons">
    <div class="flex gap-3 ml-11 mt-14">
      <img src="../assets/img/mail2.png" />
      <p class="font-normal text-xl ml-4">{{ user.email }}</p>
    </div>
    <div class="flex gap-3 ml-10 mt-9">
      <img src="../assets/img/cccd.png" />
      <p class="font-normal text-xl ml-4 mt-2">Số CMND</p>
    </div>
    <div class="flex gap-3 ml-10 mt-10">
      <img src="../assets/img/phone.png" alt="" />
      <p class="font-normal text-xl ml-5">Số điện thoại</p>
    </div>
    <div class="flex gap-3 ml-10 mt-11">
      <img src="../assets/img/address.png" alt="" />
      <p class="font-normal text-xl ml-6">Địa chỉ</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {}, // Initialize an empty object to store user information
    };
  },
  mounted() {
    // Call the getUserInfo() method when the component is mounted
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      // Make an API request to fetch the user information
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint URL
      axios
        .get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
            // Retrieve the authentication token from local storage
          },
        })
        .then((response) => {
          console.log(response);
          // Update the user object with the retrieved user information
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
          // Handle error scenarios (e.g., redirect to login page)
        });
    },
  },
};
</script>
<style lang="css" scoped>
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
.popup_detail {
  border: 1px solid #cfcfcf;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
@media only screen and (max-width: 960px) and (max-height: 540px) {
  .all_form {
    margin-top: 0;
    margin-left: 140px;
  }
  .login_p {
    margin-top: 50px;
  }
}
@media only screen and (max-width: 375px) and (max-height: 667px) {
  .detail_icons {
    display: none;
  }
}
@media only screen and (max-width: 768px) and (max-height: 1024px) {
  .detail_icons {
    display: none;
  }
}
@media only screen and (max-width: 820px) and (max-height: 1180px) {
  .detail_icons {
    display: none;
  }
}
@media only screen and (max-width: 412px) and (max-height: 915px) {
  .detail_icons {
    display: none;
  }
}
@media only screen and (max-width: 414px) and (max-height: 896px) {
  .detail_icons {
    display: none;
  }
}
@media only screen and (max-width: 360px) and (max-height: 740px) {
  .detail_icons {
    display: none;
  }
}
@media only screen and (max-width: 390px) and (max-height: 844px) {
  .detail_icons {
    display: none;
  }
}
</style>
