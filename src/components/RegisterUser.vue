<template>
  <div class="create_uer_all px-32">
    <Form @submit="onSubmit" class="create_user max-w-4xl mx-auto -mt-14">
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
          <img
            v-if="user.picture"
            :src="user.picture"
            alt="Selected Image"
            class="h-24 w-24 rounded-full mr-8 ml-40"
          />
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
            rules="required"
          />
          <br />
          <ErrorMessage name="username" class="text-red-500 mt-2" />
        </div>
        <div>
          <label for="">Họ và tên</label>
          <Field
            name="fullname"
            type="text"
            v-model="user.fullname"
            placeholder="fullname"
            rules="required"
          />
          <br />
          <ErrorMessage name="fullname" class="text-red-500 mt-2" />
        </div>
        <div class="mt-2">
          <label>Email</label>
          <Field
            name="email"
            placeholder="example@gmail.com"
            v-model="user.email"
            rules="required|email"
          />
          <br />
          <ErrorMessage name="email" class="text-red-500 mt-2" />
        </div>
        <div class="mt-2">
          <label for="">Mật khẩu</label>
          <Field
            name="password"
            type="password"
            placeholder="*********"
            v-model="user.password"
            rules="required|min:8"
          />
          <br />
          <ErrorMessage name="password" class="text-red-500 mt-2" />
        </div>
        <div class="mt-2">
          <label for="">Số điện thoại</label>
          <Field
            name="phone"
            type="tel"
            placeholder="09xx657xxx"
            v-model="user.phone"
            rules="required|numeric|max:10"
          />
          <br />
          <ErrorMessage name="phone" class="text-red-500 mt-2" />
        </div>
        <div class="mt-2">
          <label for="">Địa chỉ</label>
          <Field
            name="address"
            type="text"
            placeholder="address"
            v-model="user.address"
            rules="required"
          />
          <br />
          <ErrorMessage name="address" class="text-red-500 mt-2" />
        </div>
        <div class="mt-2">
          <label>Số CMND</label>
          <Field
            name="idNumber"
            type=""
            placeholder="03620000xxx"
            v-model="user.idNumber"
            rules="required"
          />
          <br />
          <ErrorMessage name="idNumber" class="text-red-500 mt-2" />
        </div>
        <div class="mt-2">
          <div class="flex">
            <label for="cards" class="">Choose tags:</label>
            <p class="ml-4">{{ showSelected() }}</p>
          </div>
          <br />
          <select
            v-model="user.tags"
            multiple
            size="3"
            class="h-16 -mt-6"
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
      <div
        class="hidden text-red-400 mt-2 ml-16 text-xl"
        id="error_register"
      ></div>
      <div class="flex gap-8 pb-8 mt-2">
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
<script>
import axios from "axios";
import { MD5 } from "crypto-js";
import { ErrorMessage, Field, Form, defineRule, configure } from "vee-validate";
import { required, email, numeric, min, max } from "@vee-validate/rules";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
defineRule("required", required);
defineRule("email", email);
defineRule("numeric", numeric);
defineRule("min", min);
defineRule("max", max);
configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `The ${ctx.field} is field is required.`,
      email: `The ${ctx.field} must be a valid email address.`,
      min: `The ${ctx.field} must be greater than 8 characters.`,
      numeric: `The ${ctx.field} must be number.`,
      max: `The ${ctx.field} must have 10 digits.`,
    };

    const message = messages[ctx.rule.name];
    return message ? message : `Lỗi không xác định: ${ctx.field}.`;
  },
});
export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
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
        idNumber: null,
      },
      newUser: {},
    };
  },
  methods: {
    showSelected() {
      if (Array.isArray(this.user.tags)) {
        return this.user.tags.join(" , ");
      } else {
        return this.user.tags;
      }
    },
    onClose() {
      this.$emit("close");
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.user.picture = reader.result;
      };
      reader.readAsDataURL(file);
      // Thực hiện các hành động với file đã chọn
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
        idNumber: this.user.idNumber,
      };

      axios
        .post(`${process.env.VUE_APP_API_URL}`, this.newUser, {
          headers: {
            Authorization: "RegisterToken",
            // Add other headers as needed
          },
        })
        .then(() => {
          this.$emit("close");
          this.$emit("userCreated");
          toast.success("Tạo người dùng thành công!", {
            autoClose: 2000,
          });
          // Reset the form after successful creation
          this.user.fullname = "";
          this.user.email = "";
          this.user.tags = [];
          this.user.picture = "";
          this.user.username = "";
          this.user.password = "";
          this.user.phone = null;
          this.user.address = "";
          this.user.idNumber = null;
        })
        .catch(() => {
          toast.error("Tạo người dùng không thành công!", {
            autoClose: 2000,
          });
        });
    },
  },
};
</script>
<style scoped>
select {
  border: 2px solid #25242428;
  border-radius: 10px;
  padding: 10px;
  width: 350px;
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
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  border-top: 10px solid rgba(17, 107, 143, 0.904);
}
</style>
