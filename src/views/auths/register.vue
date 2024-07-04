<template>
    <div class="login-style chag-sso">
        <div class="container form ">

            <div class="">
                <div class="header">
                    <div class='header-image'>
                        <img style="margin:0px;" class="fade show chag-logo" alt="chag"
                            src="https://res.cloudinary.com/dqvr7kat6/image/upload/v1718268402/zu43thyvdywlzfuhxfm6.webp" />
                    </div>
                    <div class="title mt-3">
                        <h1 class="title-center h4">Đăng kí loại tài khoản</h1>
                    </div>
                </div>
            </div>

            <div class="">
                <a-form :model="formState" id="pos-login-form" class="mt-4" autocomplete="off" name="normal_login"
                    novalidate="novalidate">
                    <div class="">
                        <div class="" id="">


                            <a-form-item name="firstName" :rules="[
                    { required: true, message: 'Hãy điền họ của bạn!' }
                ]">
                                <a-input placeholder="Nhập họ của bạn" class="form-input  valid"
                                    v-model:value="formState.firstName">
                                    <template #prefix>

                                    </template>
                                </a-input>
                            </a-form-item>
                            <a-form-item name="lastName" :rules="[
                    { required: true, message: 'Hãy điền tên của bạn!' }
                ]">
                                <a-input placeholder="Nhập tên của bạn" class="form-input valid"
                                    v-model:value="formState.lastName">
                                    <template #prefix>

                                    </template>
                                </a-input>
                            </a-form-item>
                            <a-form-item name="username" :rules="[
                    { required: true, message: 'Hãy điền email của bạn!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                ]">
                                <a-input placeholder="Email của bạn" class="form-input valid"
                                    v-model:value="formState.username">
                                    <template #prefix>

                                    </template>
                                </a-input>
                            </a-form-item>

                        </div>
                        <div class="">
                            <a-form-item name="password" autocomplete="off" :rules="[
                    { required: true, message: 'Hãy điền mật khẩu của bạn!' },
                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                    { pattern: /^(?=.*\d).{6,}$/, message: 'Mật khẩu phải chứa ít nhất một chữ số!' }
                ]">
                                <a-input-password class="password-register" name="password"
                                    placeholder="Mật khẩu đăng nhập" type="password" autocomplete="current-password"
                                    v-model:value="formState.password">
                                </a-input-password>
                            </a-form-item>
                            <div class="has-error padding-md-left padding-sm-top">
                                <span class="help-block">
                                    <label for="password" class="help-block field-validation-valid"></label>
                                </span>
                            </div>
                        </div>
                    </div>


                    <div style="display: flex; justify-content: center; align-items: center ; padding-bottom:10px;">
                        <Spin :spinning="spinning">
                        </Spin>
                    </div>

                    <div class="btn-register text-center mb-3" style="">
                        <button @click="resigterManager" class="btn-login" type="button">
                            Quản lý
                        </button>
                        <button @click="resigterUser" class="btn-login" type="button">
                            Người mua hàng
                        </button>
                        <button @click="resigterShipper" class="btn-login" type="button">
                            Người giao hàng
                        </button>

                    </div>

                </a-form>
            </div>

        </div>
    </div>
</template>
<script>
import { defineComponent, computed, ref, reactive } from "vue";

import "ant-design-vue/dist/antd.min.css";
import { message, Spin } from "ant-design-vue";
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
    components: {
        Spin,
    },
    setup() {
        const apiPrefix = import.meta.env.VITE_API_PREFIX;
        const authStore = useAuthStore();
        const router = useRouter();
        const spinning = ref(false);
        const formState = reactive({
            username: '',
            fullName: '',
            email: '',
            password: '',
            rePassWord: '',
            levelManage: '',
            roleID: '',
            status: '',
            firstName: '',
            lastName: '',
            //
            urlAvatar: '',
            fileAvatar: null,
            rmavatar: "yes",
            //
            change_password: false,
        });
        const onFinish = (values) => {
            conssole.log(values, 'values')
            return;
            const { username, password } = values;
            const newValue = {
                email: username,
                password: password,
            };
            axios
                .post(
                    `${apiPrefix}/api/v1/auth/authenticate`,
                    newValue
                )
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem("auth", JSON.stringify(res.data));
                    localStorage.setItem("token", JSON.stringify(res.data.accesstoken));
                    window.location.href = "/dashboards";
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        const onFinishFailed = (errorInfo) => {
            console.log("Failed:", errorInfo);
        };
        const disabled = computed(() => {
            return !(formState.username && formState.password);
        });
        const resigterUser = async () => {
            const newDataPost = {
                firstname: formState.firstName,
                lastname: formState.lastName,
                email: formState.username,
                password: formState.password
            }
            spinning.value = true;
            axios.post(`${apiPrefix}/api/v1/auth/register/user`, newDataPost)
                .then((response) => {
                    message.success("Tạo mới thành công!");
                    router.push({ name: "login" });
                    console.log(response.message);
                    spinning.value = false;

                })
                .catch((error) => {
                    console.log(123);
                    spinning.value = false;
                    if (error.response && error.response.data && error.response.data.message) {
                        showErrorToast('Thất bại!', error.response.data.message);
                    } else {
                        showErrorToast('Thất bại!', 'Đã xảy ra lỗi không xác định.');
                    }
                });
        }


        const resigterShipper = async () => {
            const newDataPost = {
                firstname: formState.firstName,
                lastname: formState.lastName,
                email: formState.username,
                password: formState.password
            }
            spinning.value = true;
            console.log(newDataPost, 'formState');
            axios.post(`${apiPrefix}/api/v1/auth/register/shipper`, newDataPost)
                .then((response) => {
                    message.success("Tạo mới thành công!");
                    router.push({ name: "login" });
                    spinning.value = false;

                }).catch((error) => {
                    console.log(error);
                    if (error.response && error.response.data && error.response.data.message) {
                        showErrorToast('Thất bại!', error.response.data.message);
                    } else {
                        showErrorToast('Thất bại!', 'Đã xảy ra lỗi không xác định.');
                    }
                    spinning.value = false;

                });
        }



        const showErrorToast = (title, content) => {
            message.error({
                content: content,
                duration: 2,
            });
        };
        const resigterManager = async () => {
            const newDataPost = {
                firstname: formState.firstName,
                lastname: formState.lastName,
                email: formState.username,
                password: formState.password
            }
            spinning.value = true;
            console.log('formState');
            console.log(formState, 'formState');
            axios.post(`${apiPrefix}/api/v1/auth/register/manager`, newDataPost).then((response) => {
                message.success("Tạo mới thành công!");
                router.push({ name: "login" });
                spinning.value = false;

            }).catch((error) => {
                console.log(error);
                if (error.response && error.response.data && error.response.data.message) {
                    showErrorToast('Thất bại!', error.response.data.message);
                } else {
                    showErrorToast('Thất bại!', 'Đã xảy ra lỗi không xác định.');
                }
                spinning.value = false;

            });
        }
        //
        return {
            formState,
            onFinishFailed,
            onFinish,
            disabled,
            resigterShipper,
            resigterUser,
            resigterManager,
            spinning
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
</style>
