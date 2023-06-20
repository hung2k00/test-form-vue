<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="relative">
    <div class="max-w-screen-aa mx-auto flex relative mt-31 all_form">
      <!-- <transition name="slide-in">
        <div class="notification absolute -top-28 flex" v-if="showNotification">
          <i
            class="fa-regular fa-circle-check mt-1 mr-2"
            style="color: #fffcfc"
          ></i>
          <p>Đăng nhập thành công</p>
        </div>
      </transition> -->
      <div class="max-w-screen-bb login_form absolute top-0 bottom-0">
        <div class="w-1/2 ml-36 login_items">
          <p class="font-normal text-5xl login_p mt-28 ml-4">Customer Care</p>
          <Form action="" method="post" class="mt-10" @submit="login">
            <div class="container_form">
              <div class="email_form">
                <label for="email" class="font-normal text-2xl text_label"
                  >Tên đăng nhập</label
                >
                <br />
                <Field
                  class="input_login"
                  type="text"
                  placeholder="example@gmail.com"
                  name="email"
                  rules="required|email"
                  v-model="email"
                />
                <br />
                <ErrorMessage name="email" class="text-red-500 mt-2" />
              </div>
              <div>
                <label for="psw" class="font-normal text-2xl text_label"
                  >Mật khẩu</label
                >
                <br />
                <Field
                  class="input_login mt-5"
                  type="password"
                  placeholder=" ********************"
                  name="password"
                  rules="required|min:8"
                  v-model="password"
                />
                <br />
                <ErrorMessage name="password" class="text-red-500 mt-2" />
              </div>
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  class="mt-4 check__box"
                  v-model="remember"
                />
                <span class="text_check">Ghi nhớ ?</span>
                <!-- <span class="psw"><a href="#">Quên mật khẩu</a></span> -->
              </label>
              <br />
              <div
                class="mt-5 hidden text-red-400"
                role="alert"
                id="alert_1"
              ></div>
              <br />
              <button class="mt-9 font-normal text-2xl">
                <p class="text_button">Đăng nhập</p>
              </button>
            </div>
          </Form>
        </div>
      </div>
      <div class="ml-96 img_login">
        <img src="../assets/img/Image.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { MD5 } from "crypto-js";
import { ErrorMessage, Field, Form, defineRule, configure } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `The ${ctx.field} field is required.`,
      email: `The ${ctx.field} must be a valid email address.`,
      min: `The ${ctx.field} is not a valid.`,
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
      email: "",
      password: "",
      error: "",
      remember: false,
      showNotification: false,
    };
  },
  methods: {
    async login() {
      const hashedPassword = MD5(this.password).toString();
      let token;
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}`, {
          params: {
            email: this.email,
            password: hashedPassword,
          },
        });

        const user = response.data[0];
        if (user) {
          console.log(response.data);

          token = response.data;

          toast.success("Đăng nhập thành công!", {
            autoClose: 2000,
          });
          setTimeout(() => {
            this.$router.push("/user");
          }, 1500);
        } else {
          // Tên hoặc mật khẩu không chính xác
          const error = " Tên hoặc mật khẩu không chính xác";
          let alert_1 = document.querySelector("#alert_1");
          alert_1.classList.remove("hidden");
          alert_1.innerHTML = error;
        }
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        let alert_1 = document.querySelector("#alert_1");
        alert_1.classList.remove("hidden");
        alert_1.innerHTML = "Lỗi kết nối server";
        toast.error("Không thể kết nối đến server để lấy dữ liệu!", {
          autoClose: 2000,
        });
      }

      if (token) {
        // Gán token vào header Authorization
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        // Xử lý khi không có token
        console.error("Không tìm thấy token trong phản hồi.");
        // Hoặc thực hiện các hành động khác tùy thuộc vào yêu cầu của bạn
      }
      if (this.remember) {
        localStorage.setItem("email", this.email);
        localStorage.setItem("password", this.password);
      } else {
        // If remember is disabled, remove any previously stored credentials
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    },
  },
  created() {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      this.email = savedEmail;
      this.password = savedPassword;
      this.rememberMe = true;
    }
  },
};
</script>

<style scoped>
.container_form {
  width: 720px;
}
.notification {
  font-family: "Roboto";
  right: -230px;
  height: 50px;
  width: 250px;
  padding: 10px 30px;
  background-color: #32cd32;
  border-radius: 20px;
  color: white;
}
.slide-in-enter-active {
  transition: transform 0.5s;
}

.slide-in-enter {
  transform: translateX(100%);
}

.slide-in-leave-active {
  transition: transform 0.5s;
}

.slide-in-leave-to {
  transform: translateX(-100%);
}
.input_login {
  width: 431px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  background: #fffcfc;
  border: 1px solid #cecdcd;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  box-sizing: border-box;
  height: 72px;
}
input[type="checkbox"] {
  background: #fffcfc;
  border: 2px solid #cecdcd;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  height: 15px;
  width: 15px;
}

button {
  background-color: #0070d2;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 431px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  height: 72px;
}

button:hover {
  opacity: 0.8;
}
.login_p {
  color: rgba(245, 114, 18, 1);
}

.container_form {
  padding: 16px;
}
.text_label {
  color: rgba(0, 112, 210, 1);
}
.text_check {
  margin-left: 10px;
  color: rgba(0, 112, 210, 1);
}
span.psw {
  float: right;
  padding-top: 12px;
}
.login_form {
  background: #fffcfc;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.5);
  border-radius: 30px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 960px) {
  .img_login {
    display: none;
  }
}
@media only screen and (max-width: 1280px) and (max-height: 720px) {
  .all_form {
    margin: 30px 30px;
  }
  .input_login {
    height: 50px;
    width: 380px;
  }
  button {
    height: 50px;
    width: 380px;
    font-size: 16px;
  }
  .text_button {
    margin-top: -6px;
  }
  .login_p {
    font-size: 40px;
    margin-top: 80px;
  }
}
@media only screen and (max-width: 1280px) and (max-height: 1080px) {
  .all_form {
    margin: 215px 40px;
  }
  .login_form {
    width: 680px;
  }
  .input_login {
    height: 50px;
    width: 380px;
  }
  button {
    height: 50px;
    width: 380px;
    font-size: 16px;
  }
  .text_button {
    margin-top: -6px;
  }
  .login_p {
    font-size: 40px;
    margin-top: 80px;
  }
}
@media only screen and (max-width: 1600px) and (max-height: 900px) {
  .all_form {
    margin-top: 75px;
    margin-bottom: 80px;
  }
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
@media only screen and (max-width: 640px) and (max-height: 360px) {
  .input_login {
    height: 30px;
    width: 300px;
  }
  button {
    height: 30px;
    width: 300px;
    font-size: 12px;
  }
  .text_button {
    margin-top: -15px;
  }
  .login_p {
    font-size: 30px;
    margin-top: 80px;
  }
  .login_items {
    margin-top: -200px;
    margin-left: 220px;
    font-size: 14px;
    height: 360px;
    width: 640px;
  }
  .email_form {
    margin-top: -40px;
  }
  .text_label {
    font-size: 14px;
  }
}
@media only screen and (max-width: 375px) and (max-height: 667px) {
  .all_form {
    margin-top: 0px;
    margin-left: auto;
    margin-right: 0px;
  }
  .login_items {
    margin-top: 200px;
    margin-left: 255px;
  }
}
@media only screen and (max-width: 768px) and (max-height: 1024px) {
  .all_form {
    margin-top: 150px;
    margin-left: 40px;
  }
  .login_items {
    margin-top: 250px;
    margin-left: 230px;
  }
}
@media only screen and (max-width: 820px) and (max-height: 1180px) {
  .all_form {
    margin-top: 200px;
    margin-left: 45px;
  }
  .login_items {
    margin-top: 250px;
    margin-left: 230px;
  }
}
@media only screen and (max-width: 412px) and (max-height: 915px) {
  .all_form {
    margin-top: 250px;
    margin-left: -35px;
  }
  .login_items {
    margin-top: 280px;
    margin-left: 270px;
  }
}
@media only screen and (max-width: 414px) and (max-height: 896px) {
  .all_form {
    margin-top: 300px;
    margin-left: 0px;
  }
}
@media only screen and (max-width: 360px) and (max-height: 740px) {
  .all_form {
    margin-top: 250px;
    margin-left: 0px;
  }
}
@media only screen and (max-width: 390px) and (max-height: 844px) {
  .all_forms {
    margin-left: 0px;
  }
}
</style>
