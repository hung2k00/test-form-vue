<template>
  <div class="bg-gray-200 create_uer_all p-32">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors }"
      class="create_user max-w-4xl mx-auto -mt-14"
    >
      <div class="flex create_header p-6">
        <div class="w-11/12 text-blue-500">
          <p class="text-2xl ml-10 font-semibold">Thông tin cá nhân</p>
        </div>
        <div class="w-1/12 cursor-pointer" @click="onClose">
          <i class="fa-solid fa-xmark fa-2xl" style="color: #888b91"></i>
        </div>
      </div>
      <div class="">
        <div class="px-48 ml-10 py-6">
          <label for="image-input" class="upload-button text-base font-medium"
            >Choose Image:</label
          >
          <input
            class="ml-2 cursor-pointer"
            type="file"
            id="image-input"
            accept="image/*"
            @change="handleImageUpload"
          />
        </div>
      </div>
      <div class="grid gap-4 grid-cols-2 py-10 px-16 create_form">
        <div>
          <label>Tên truy cập</label>
          <Field
            type="username"
            placeholder="manhhung00"
            name="username"
            v-model="user.username"
          />
          <p class="text-red-500 mt-2">{{ errors.username }}</p>
        </div>
        <div>
          <label for="">Họ và tên</label>
          <Field
            name="fullname"
            type="text"
            v-model="user.fullname"
            placeholder="fullname"
          />
          <p class="text-red-500 mt-2">{{ errors.fullname }}</p>
        </div>
        <div class="mt-2">
          <label>Email</label>
          <Field
            name="email"
            placeholder="example@gmail.com"
            v-model="user.email"
          />
          <p class="text-red-500 mt-2">{{ errors.email }}</p>
        </div>
        <div class="mt-2">
          <label for="">Mật khẩu</label>
          <Field
            name="password"
            type="password"
            placeholder="*********"
            v-model="user.password"
          />
          <p class="text-red-500 mt-2">{{ errors.password }}</p>
        </div>
        <div class="mt-2">
          <label for="">Số điện thoại</label>
          <Field
            name="phone"
            type="tel"
            playhoder="09xx657xxx"
            v-model="user.phone"
          />
          <p class="text-red-500 mt-2">{{ errors.phone }}</p>
        </div>
        <div class="mt-2">
          <label for="">Địa chỉ</label>
          <Field
            name="address"
            type="text"
            playhoder="address"
            v-model="user.address"
          />
          <p class="text-red-500 mt-2">{{ errors.address }}</p>
        </div>
        <div class="mt-2">
          <label>Số CMND</label>
          <Field
            name="cmnd"
            type=""
            placeholder="03620000xxx"
            v-model="user.cmnd"
          />
          <p class="text-red-500 mt-2">{{ errors.cmnd }}</p>
        </div>
        <div class="flex mt-4">
          <label for="cars" class="">Choose tags:</label>
          <select
            v-model="user.tags"
            multiple
            size="3"
            class="ml-4 mt-2 h-20 w-32"
            required
          >
            <option
              class="cursor-pointer"
              v-for="option in options"
              :value="option.value"
              :key="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex gap-8 pb-8">
        <div class="ml-16 submit_form">
          <button type="submit">Lưu trữ</button>
        </div>
        <div class="cancel_form" @click="onClose">
          <button>Đóng</button>
        </div>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.create_user_all {
}
#image-input {
  border: none;
  width: 338px;
}
.submit_form {
  background: rgb(15, 112, 168);
  color: white;
  height: 40px;
  width: 100px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  text-align: center;
  padding-top: 7px;
}
.cancel_form {
  background: rgb(106, 124, 134);
  color: white;
  height: 40px;
  width: 100px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  text-align: center;
  padding-top: 7px;
}
.create_header {
  border-bottom: 2px solid #25242428;
}
input {
  padding: 5px;
  width: 350px;
  height: 50px;
  border: 2px solid #25242428;
  border-radius: 10px;
}
.create_form label {
  font-size: 18px;
  font-weight: 500;
}
.create_user {
  background: #ffffff;
  box-shadow: 16px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border-top: 10px solid rgba(17, 107, 143, 0.904);
}
</style>
<script>
import axios from "axios";
import { MD5 } from "crypto-js";
import * as yup from "yup";
import { Field, Form } from "vee-validate";
export default {
  components: {
    Field,
    Form,
  },
  data() {
    const schema = yup.object({
      fullname: yup.string().required(),
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
      phone: yup.string().max(10).required(),
      address: yup.string().required(),
      cmnd: yup.string().required(),
    });
    return {
      schema,
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
        { label: "Option 4", value: "option4" },
        { label: "Option 5", value: "option5" },
        { label: "Option 6", value: "option6" },
      ],
      user: {
        fullname: "",
        email: "",
        tags: [],
        picture: "",
        username: "",
        password: "",
        phone: null,
        address: "",
        cmnd: null,
      },
      newUser: {},
    };
  },
  methods: {
    onClose() {
      this.$router.push("/user");
    },
    handleImageUpload(event) {
      console.log(event);
      const file = event.target.files[0];
      // Thực hiện các hành động với file đã chọn
      console.log(file);
      this.user.picture = file.name;
    },
    onSubmit() {
      const hashedPassword = MD5(this.user.password).toString();
      this.newUser = {
        fullname: this.user.fullname,
        email: this.user.email,
        tags: this.user.tags,
        picture: this.user.picture,
        username: this.user.username,
        password: hashedPassword,
        phone: this.user.phone,
        address: this.user.address,
        cmnd: this.user.cmnd,
      };

      axios
        .post("http://localhost:3000/users", this.newUser)
        .then((response) => {
          console.log("User created:", response.data);
          alert("Success!");
          this.$router.push("/user");
          // Reset the form after successful creation
          this.user.fullname = "";
          this.user.email = "";
          this.user.tags = [];
          this.user.picture = "";
          this.user.username = "";
          this.user.password = "";
          this.user.phone = null;
          this.user.address = "";
          this.user.cmnd = null;
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
      // Xử lý form khi dữ liệu hợp lệ
    },
  },
};
</script>
