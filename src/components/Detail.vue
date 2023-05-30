<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="form_details" v-if="selectedUser">
    <div class="float-right mr-6 mt-4 cursor-pointer" @click="onClose">
      <i class="fa-solid fa-xmark fa-2xl" style="color: #888b91"></i>
    </div>
    <div class="detail_items_form">
      <div class="flex mt-14 ml-4">
        <div class="">
          <img src="../assets/img/avartar.png" alt="" class="h-28 w-28" />
        </div>
        <div>
          <div class="">
            <p class="font-bold text-2xl name_p mt-6 ml-2">
              {{ selectedUser.fullname }}
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
          <p class="font-normal text-xl ml-4">{{ selectedUser.email }}</p>
        </div>
        <div class="flex gap-3 ml-10 mt-9">
          <img src="../assets/img/cccd.png" />
          <p class="font-normal text-xl ml-4 mt-2">{{ selectedUser.cmnd }}</p>
        </div>
        <div class="flex gap-3 ml-10 mt-10">
          <img src="../assets/img/phone.png" alt="" />
          <p class="font-normal text-xl ml-5">{{ selectedUser.phone }}</p>
        </div>
        <div class="flex gap-3 ml-10 mt-11">
          <img src="../assets/img/address.png" alt="" />
          <p class="font-normal text-xl ml-6">{{ selectedUser.address }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onClose() {
      this.$emit("close");
    },
  },
  props: {
    selectedUser: {
      type: Object,
      default: null,
    },
  },
};
</script>
<style scoped>
.detail_items_form {
  border: 2px solid white;
  border-radius: 20px;
  padding: 10px 10px;
  background: white;
  height: 590px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.5);
}
.form_details {
  height: 800px;
  width: 1200px;
  margin-top: -310px;
  margin-left: 20px;
  padding: 90px 200px;
}
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
