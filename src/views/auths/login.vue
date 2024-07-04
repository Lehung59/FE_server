<template>
  <div class="login-style chag-sso">
    <div class="container form form-login">
      <div class="login-form-view">
        <div class="header">
          <div class="header-image">
            <img class="fade show chag-logo" alt="Sapo"
              src="https://res.cloudinary.com/dqvr7kat6/image/upload/v1718268402/zu43thyvdywlzfuhxfm6.webp" />
          </div>
          <div class="title mt-3">
            <h1 class="title-center h4">Đăng nhập tài khoản</h1>
          </div>
        </div>
      </div>



      <div class="login-form-view login-form-block">
        <a-form :model="formState" @finish="onFinish" @finishFailed="onFinishFailed" id="pos-login-form"
          class="content mt-4" autocomplete="off" name="normal_login" novalidate="novalidate">

          <div class="form-login-info">

            <div class="form-group position-relative" id="username-input-wrapper">
              <a-form-item name="username" :rules="[
          { required: true, message: 'Please input your username!' },
        ]">
                <a-input placeholder="Email của bạn" class="form-input country-phone-input valid"
                  v-model:value="formState.username">
                  <template #prefix> </template>
                </a-input>
              </a-form-item>

              <div class="has-error padding-md-left padding-sm-top">
                <span class="help-block">
                  <label for="username" class="help-block field-validation-valid"></label>
                </span>
              </div>
            </div>
            <div class="form-group" id="password-input-wrapper">
              <a-form-item name="password" autocomplete="off" :rules="[
          { required: true, message: 'Please input your password!' },
        ]">
                <a-input-password class="password-login" id="password" name="password" placeholder="Mật khẩu của bạn"
                  type="password" autocomplete="current-password" v-model:value="formState.password">
                </a-input-password>
              </a-form-item>
              <div class="has-error padding-md-left padding-sm-top">
                <span class="help-block">
                  <label for="password" class="help-block field-validation-valid"></label>
                </span>
              </div>
            </div>
          </div>
          <div class="form-group margin-sm-bottom d-flex">
            <div class="col-3">
              <a href="/register" onclick="onForgotPassword()" class="forgot-pos-password">Đăng kí tài khoản mới</a>
            </div>
            <div class="col-9">
              <a href="/forgetPassword" onclick="onForgotPassword()" class="forgot-pos-password">Quên mật khẩu</a>
            </div>
          </div>
          
          <div class="text-center mb-3 mt-5" style="clear: both">
            <button class="btn-login" type="submit">Đăng nhập</button>
          </div>
          <div class="social-login mt-3 text-center">
            <span class="social-login__label">Hoặc đăng nhập với</span>
            <div class="social-login__btn-group mt-3">
              <a href="http://localhost:9000/oauth2/authorization/google"
                class="social-login__item " id="">
                <img src="https://sapo.dktcdn.net/sso-service/images/svg_sociallogin_gg_new.svg" alt="chag"
                  class="" />
              </a>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, ref, reactive, onMounted } from "vue";
import "ant-design-vue/dist/antd.min.css";
import { message } from "ant-design-vue";
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export default defineComponent({
  setup() {





    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const authStore = useAuthStore();
    const formState = reactive({
      username: "",
      password: "",
    });



    onMounted(() => {
      localStorage.clear();
      const token = new URLSearchParams(window.location.search).get('token');
      if (token) {
        localStorage.setItem('token', JSON.stringify(token));



        const encodedToken = encodeURIComponent(token);
        axios.get(`http://localhost:9000/api/v1/auth/validtoken?token=${encodedToken}`)
          .then(response => {
            if (response.data) {
              axios.get(`http://localhost:9000/api/v1/auth/getUserFromToken?token=${encodedToken}`)
                .then(response2 => {
                  console.log(response2);
                  localStorage.setItem("auth", JSON.stringify(response2.data));
                  // await fetchFireBase(response2.data.accesstoken, response2.data.userId);
                  window.location.href = '/trang-chu-stores';
                })
                .catch(error => {
                  console.error("Error fetching user data:", error);
                  showErrorToast('Thất bại!', 'Không thể lấy thông tin người dùng.');
                  localStorage.clear();
                  window.location.href = '/login';
                });
            } else {
              localStorage.clear();
              window.location.href = '/login';
            }
          });
      }
    });
    const fetchFireBase = (jwtToken, userId) => {
      return new Promise((resolve, reject) => {
        console.log(123);
        // const firebaseConfig = {
        //   apiKey: "AIzaSyAYfnQlKBxt8LbgX3zBcsTSUT2qVhiNiA0",
        //   authDomain: "be-for-gr-49b88.firebaseapp.com",
        //   projectId: "be-for-gr-49b88",
        //   storageBucket: "be-for-gr-49b88.appspot.com",
        //   messagingSenderId: "531339012617",
        //   appId: "1:531339012617:web:29675eb397477856eae6d8",
        //   measurementId: "G-KH9RSMYBBZ"
        // };

        const firebaseConfig = {
          apiKey: "AIzaSyBTotN9vQoBZlxQY2UG1TuGEZ7rpkWZt70",
          authDomain: "be-for-gr-180e7.firebaseapp.com",
          projectId: "be-for-gr-180e7",
          storageBucket: "be-for-gr-180e7.appspot.com",
          messagingSenderId: "483915681179",
          appId: "1:483915681179:web:bcc760df56ee3c5044a53e",
          measurementId: "G-0FG12P4QPH"
        };


        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        getToken(messaging, { vapidKey: 'BAffji7PkXTfbxfExeCdiORnNzDdfG-nYcSX-MKZ_t29PlmV87swAMV7MsN7n3tohTW6K2saSCXLS31wkR-A36o' })

          // getToken(messaging, { vapidKey: 'BD3Ah9hzi42_eO-QDUXGWyk8WDQf7_7NnuvkDO8AqTfp2q5KstVx18loyeWy5D8HRvsLjxqLFCo19ETlK_4nmUU' })
          .then((currentToken) => {
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              console.log("Token is:", currentToken);
              const formData = new FormData();
              formData.append("userId", userId);
              localStorage.setItem("firebase", JSON.stringify(currentToken));

              formData.append("firebaseId", currentToken);
              axios.post(
                `${apiPrefix}/api/v1/notifications/subscribe/device`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${jwtToken}`,
                  },
                }
              ).then((response) => {
                message.success("Thành công!");
                resolve(); // Resolve the promise when the request is successful
              }).catch((error) => {
                console.log(error);
                reject(error); // Reject the promise if there is an error
              });
            } else {
              console.log('No registration token available. Request permission to generate one.');
              reject('No registration token available.');
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            reject(err); // Reject the promise if there is an error
          });
      });
    };

    const onFinish = async (values) => {
      const { username, password } = values;
      const newValue = {
        email: username,
        password: password,
      };
      try {
        const res = await axios.post(`${apiPrefix}/api/v1/auth/authenticate`, newValue);
        console.log(res.data);
        localStorage.setItem("auth", JSON.stringify(res.data));
        localStorage.setItem("token", JSON.stringify(res.data.accesstoken));

        await fetchFireBase(res.data.accesstoken, res.data.userId); // Đợi fetchFireBase hoàn thành

        if (res.data.role == "USER") {
          window.location.href = "/trang-chu-stores";
        } else if (res.data.role == "MANAGER") {
          if (res.data.storeId == 0) {
            window.location.href = "/store/info-them-moi";
          } else {
            window.location.href = "/doanh-thu-store/" + res.data.storeId;
          }
        } else if (res.data.role == "SHIPPER") {
          window.location.href = "/danh-sach-don";
        } else if (res.data.role == "ADMIN") {
          window.location.href = "/danh-sach-store";
        }
      } catch (err) {

        if (err.response && err.response.status == 404) {
          showErrorToast('Thất bại!', 'Tài khoản hoặc mật khẩu không đúng!');
          console.log(err.response);
        } else if(err.response && err.response.status == 501){
          showErrorToast('Thất bại!', 'Tài khoản này chưa được kích hoạt hoặc đã bị tạm dừng!');

        } 
        else
        {
          showErrorToast('Thất bại!', 'Đăng nhập không thành công!');
        }
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });
    const showErrorToast = (title, content) => {
      message.error({
        content: content,
        duration: 2,
      });
    };

    return {
      formState,
      onFinishFailed,
      onFinish,
      disabled,
    };
  },
});
</script>

<style scoped>


.login-style .btn-login {
    color: #fff;
    width: 279px;
    background: radial-gradient(100% 1111.11% at 100% 51.11%, #00d8b0 0, #00de92 100%);
    border-radius: 50px;
    display: inline-block;
    line-height: 64px;
    padding: 0 35px;
    outline: none;
    -webkit-user-select: none;
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    white-space: nowrap;
    font-size: 20px;
    transition: all .5s ease
}

.login-style button.btn-login {
    border: none;
    border-radius: 50px;
    line-height: 64px;
    font-weight: 500
}

.login-style .btn-submit-primary,
.login-style button.btn-login {
    color: #fff;
    display: inline-block;
    padding: 0 30px;
    cursor: pointer;
    outline: none
}
.form {
    max-width: 595px;
    position: relative
}


.valid-feedback {
    display: none;
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #28a745
}

.valid-tooltip {
    position: absolute;
    top: 100%;
    z-index: 5;
    display: none;
    max-width: 100%;
    padding: .25rem .5rem;
    margin-top: .1rem;
    font-size: .875rem;
    line-height: 1.5;
    color: #fff;
    background-color: rgba(40, 167, 69, .9);
    border-radius: .25rem
}

.is-valid~.valid-feedback,
.is-valid~.valid-tooltip,
.was-validated :valid~.valid-feedback,
.was-validated :valid~.valid-tooltip {
    display: block
}

input.form-input {
    background-image: none !important;
    border: thin solid #d3d5d7;
    border-radius: 40px;
    height: 48px;
    line-height: 1;
    color: #363636;
    font-size: .895rem;
    padding: 0 20px;
    width: 100%;
    outline: none;
    font-weight: 500
}

input.form-input::placeholder {
    font-weight: 400
}

input.form-input:disabled,
input.form-input:read-only {
    background: #e8eaeb !important;
    font-weight: 500;
    border: none
}

input.form-input:focus {
    border: 1px solid #08f
}
.password-register {
    border-radius: 40px;
    padding: 0 20px;
    height: 48px;
    border: thin solid #d3d5d7;
}
.btn-register {
    display: flex;
    gap: 6px;
}
.header-image {
    width: 50%;
    height: 250px;
    display: flex;
    margin: auto;
    margin-bottom: 40px;
}

.header-image img {
    margin: 0px;
    width: 100%;
    display: block;
    height: 100%;
}
.header-image {
    margin-bottom: 0;
}

@media (min-width: 992px) {
    .chag-sso {
        min-height: 100vh;
        min-width: 100vh;
        background-size: 100%;
        background: url(https://sapo.dktcdn.net/sso-service/images/background-bottom-pos-app.svg) no-repeat fixed bottom
    }
}


.header {
    display: flex;
    flex-flow: column;
    margin-bottom: 1rem
}
.password-login {
  border-radius: 40px;
  padding: 0 20px;
  height: 48px;
  border: thin solid #d3d5d7;
}
.login-style .forgot-pos-password {
  display: block;
  margin-top: -10px;
  float: right;
  font-size: 14px;
  color: #08f;
}

.login-style .social-login__btn-group {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}
.login-style a.social-login__item {
  display: block;
  width: 151px;
  height: 48px;
}
</style>
