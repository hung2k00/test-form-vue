<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="relative h-screen flex justify-center items-center container mx-auto all_login"
  >
    <div class="max-w-screen-aa ff:mx-auto mx-4 flex relative all_form">
      <div class="max-w-screen-bb login_form absolute top-0 bottom-0 smd:p-28">
        <div class="">
          <p class="font-normal lg:text-5xl text-4xl login_p ml-4">
            Customer Care
          </p>
          <Form action="" method="post" class="lg:mt-10 mt-3" @submit="login">
            <div class="container_form">
              <div class="email_form">
                <label
                  for="email"
                  class="font-normal lg:text-2xl text-xl text_label"
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
                <label
                  for="psw"
                  class="font-normal lg:text-2xl text-xl text_label"
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
                class="mt-5 text-red-400"
                role="alert"
                id="alert_1"
                v-if="error"
              >
                {{ errorText }}
              </div>
              <br />
              <button
                class="mt-9 font-normal lg:text-2xl text-xl hover:bg-white"
              >
                <p class="text_button cursor-pointer hover:text-blue-700">
                  Đăng nhập
                </p>
              </button>
            </div>
          </Form>
        </div>
      </div>
      <div class="ml-96 img_login hidden smd:inline">
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
      error: false,
      remember: false,
      showNotification: false,
      errorText: "",
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
          this.error = true;
          this.errorText = "Tên hoặc mật khẩu không chính xác";
          toast.error("Tên hoặc mật khẩu không chính xác", {
            autoClose: 2000,
          });
        }
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        this.error = true;
        this.errorText = "Lỗi kết nối server";
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
      this.remember = true;
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
@media screen and (max-width: 1299px) {
  .login_form {
    box-shadow: none;
    margin-top: -15rem;
    margin-left: -15rem;
  }
}
@media screen and (max-width: 900px) {
  .login_form {
    margin-left: -12rem;
  }
}
@media screen and (max-width: 415px) {
  .login_form {
    margin-left: 0;
    margin-top: 0;
  }
}
@media screen and (min-width: 1300px) and (max-width: 1407px) {
  .login_p {
    margin-top: -2rem;
  }
}
@media screen and (max-width: 1920px) and (max-height: 967px) {
  .all_login {
    height: 96vh;
  }
}
</style>
