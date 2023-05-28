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
        />
      </div>
      <div class="flex gap-20 mt-6 ml-12">
        <img src="../assets/img/i.png" alt="" class="h-12 w-12" />
        <img src="../assets/img/chat_user.png" alt="" class="h-12 w-12" />
        <img src="../assets/img/mail_user.png" alt="" class="h-12 w-12" />
        <img src="../assets/img/ab.png" alt="" class="h-12 w-10" />
      </div>
      <div class="flex mt-20 ml-4">
        <div>
          <img src="../assets/img/avartar.png" alt="" class="h-28 w-28" />
        </div>
        <div>
          <div class="">
            <p class="font-bold text-2xl name_p mt-6 ml-2">Đặng long</p>
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
          <p class="font-normal text-xl ml-4">Mail</p>
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
    </div>
  </div>
</template>
<script>
import HearderComponents from "../components/Header.vue";
import MenuComponents from "../components/Menu.vue";
export default {
  components: {
    HearderComponents,
    MenuComponents,
  },
};
</script>
<style scoped>
.all_user {
  font-family: "Roboto";
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
</style>
