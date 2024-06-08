<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <form @submit.prevent="createUsers()">
                    <a-card title="Đăng ký Tài khoản" style="width: 100%">
                        <div class="row mb-3">
                            <div class="col-12 col-sm-8">
                                <div class="row mb-3">
                                    <div class="col-12 col-sm-3 text-start text-sm-end">
                                        <label>
                                            <span class="text-danger me-1">*</span>
                                            <span :class="{
                                                'text-danger': errors.username
                                            }">
                                                Tên Tài khoản:
                                            </span>
                                        </label>
                                    </div>

                                    <div class="col-12 col-sm-5">
                                        <a-input placeholder="Tên Tài khoản" allow-clear v-model:value="username" :class="{
                                            'input-danger': errors.username
                                        }" />

                                        <div class="w-100"></div>

                                        <small v-if="errors.username" class="text-danger">{{ errors.username[0] }}</small>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-12 col-sm-3 text-start text-sm-end">
                                        <label>
                                            <span class="text-danger me-1">*</span>
                                            <span :class="{
                                                'text-danger': errors.email
                                            }">
                                                Email:
                                            </span>
                                        </label>
                                    </div>

                                    <div class="col-12 col-sm-5">
                                        <a-input placeholder="Email" allow-clear v-model:value="email" :class="{
                                            'input-danger': errors.email
                                        }" />

                                        <div class="w-100"></div>

                                        <small v-if="errors.email" class="text-danger">{{ errors.email[0] }}</small>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-12 col-sm-3 text-start text-sm-end">
                                        <label>
                                            <span class="text-danger me-1">*</span>
                                            <span :class="{
                                                'text-danger': errors.password
                                            }">
                                                Mật khẩu:
                                            </span>
                                        </label>
                                    </div>

                                    <div class="col-12 col-sm-5">
                                        <a-input-password placeholder="Mật khẩu" allow-clear v-model:value="password"
                                            :class="{
                                                'input-danger': errors.password
                                            }" />

                                        <div class="w-100"></div>

                                        <small v-if="errors.password" class="text-danger">{{ errors.password[0] }}</small>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-12 col-sm-3 text-start text-sm-end">
                                        <label>
                                            <span class="text-danger me-1">*</span>
                                            <span>Xác nhận mật khẩu:</span>
                                        </label>
                                    </div>

                                    <div class="col-12 col-sm-5">
                                        <a-input-password placeholder="Xác nhận mật khẩu" allow-clear
                                            v-model:value="password_confirmation" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
                                    <router-link :to="{ name: 'login' }">
                                        <span>Hủy</span>
                                    </router-link>
                                </a-button>

                                <a-button type="primary" html-type="submit">
                                    <span>Lưu</span>
                                </a-button>
                            </div>
                        </div>
                    </a-card>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { message } from 'ant-design-vue';
import { useMenu } from "../../stores/use-menu.js";

export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-users"]);

        const router = useRouter();
        const users = reactive({
            username: "",
            email: "",
            password: "",
            password_confirmation: ""
        });

        const errors = ref({});

        const getUsersCreate = () => {
            axios.get("http://localhost:7010/api/users/create")
                .then((response) => {
                    // chua dropdown status
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const createUsers = () => {
            axios.post("http://localhost:7010/api/user/CreateItem", users)
                .then((response) => {
                    if (response.status == 200) {
                        message.success("Tạo mới thành công!");
                        router.push({ name: "admin-users" });
                    }
                })
                .catch((error) => {
                    errors.value = error.response.data.errors;
                });
        }

        getUsersCreate();

        return {
            ...toRefs(users),
            errors,
            filterOption,
            createUsers
        }
    },
});
</script>
<style>
.select-danger {
    border: 1px solid red;
}

.input-danger {
    border-color: red;
}
</style>