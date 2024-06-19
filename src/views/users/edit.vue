<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-12">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-users' }">Tài khoản</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>Sửa</a-breadcrumb-item>
                </a-breadcrumb>
                <h1></h1>
            </div>
            <div class="col-12 col-sm-12 mb-3">
                <a-form class="p-3" name="custom-validation" ref="formRef" :model="formState" :rules="rules"
                    @submit="updateUsers" @validate="handleValidate" @finishFailed="handleFinishFailed" v-bind="layout">
                    <div class="row">
                        <div class="col-12 col-sm-3">
                            <div class="col-12 d-flex justify-content-center mb-3">
                                <div class="clearfix">
                                    <div class="clearfix text-end text-danger" v-if="formState.rmavatar === 'no'">
                                        <a-popconfirm title="Bạn muốn xóa Avatar?" ok-text="Yes" cancel-text="No"
                                            @confirm="handleRemoveAvatar">
                                            <a href="#"><delete-outlined
                                                    :style="{ fontSize: '16px', color: '#ff0000', cursor: 'pointer' }" /></a>
                                        </a-popconfirm>
                                        <!-- <i class="fa-solid fa-trash"></i> -->
                                    </div>
                                    <a-avatar shape="circle" :size="200">
                                        <template #icon>
                                            <img :src="formState.urlAvatar" alt="Avatar" />
                                        </template>
                                    </a-avatar>
                                </div>
                            </div>
                            <div class="col-12 d-flex justify-content-center">
                                <input ref="fileAvatar" type="file" @change="handleChangeUpload($event)">
                            </div>
                        </div>
                        <div class="col-12 col-sm-9">
                            <a-form-item ref="userName" label="Tên tài khoản" required name="userName">
                                <a-input v-model:value="formState.userName" />
                                <small v-if="errors && errors.UserName" class="text-danger">{{ errors.UserName[0] }}</small>
                            </a-form-item>
                            <a-form-item ref="fullName" label="Họ tên" required name="fullName">
                                <a-input v-model:value="formState.fullName" />
                            </a-form-item>
                            <a-form-item ref="email" label="Email" :rules="[{ type: 'email' }]" required name="email">
                                <a-input v-model:value="formState.email" />
                            </a-form-item>

                            <a-form-item ref="change_password" label="*" name="change_password">
                                <a-checkbox v-model:checked="formState.change_password">
                                    Đổi Mật khẩu
                                </a-checkbox>
                            </a-form-item>

                            <div class="" v-if="formState.change_password == true">
                                <a-form-item has-feedback label="Mật khẩu" required name="passWord">
                                    <a-input v-model:value="formState.passWord" type="password" autocomplete="off" />
                                </a-form-item>
                                <a-form-item has-feedback label="Re-Mật khẩu" required name="rePassWord">
                                    <a-input v-model:value="formState.rePassWord" type="password" autocomplete="off" />
                                </a-form-item>
                            </div>

                            <a-form-item ref="select" label="Loại tài khoản" name="levelManage">
                                <a-select v-model:value="formState.levelManage" show-search
                                    placeholder="Chọn loại tài khoản" style="width: 100%"
                                    :options="users.optionsLevelManage" :filter-option="filterOptionLevelManage">
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Vai trò" name="roleID">
                                <a-select v-model:value="formState.roleID" show-search placeholder="Chọn vai trò"
                                    style="width: 100%" :options="users.optionsRole"
                                    :filter-option="filterOptionRole"></a-select>
                            </a-form-item>
                            <a-form-item label="Trạng thái" name="status">
                                <a-select v-model:value="formState.status" show-search placeholder="Chọn trạng thái"
                                    style="width: 100%" :options="users.optionsStatus"
                                    :filter-option="filterOptionStatus"></a-select>
                            </a-form-item>

                            <a-form-item :wrapper-col="{ span: 14, offset: 4 }"
                                v-if="authStoreClaim['admin.users.edit'] === '1'">
                                <a-button @click="goBack" class="me-0 me-sm-2 mb-3 mb-sm-0">
                    <span>Quay lại</span>
                </a-button>
                                <a-button type="primary" html-type="submit" class="bg-success"
                                    v-if="authStoreClaim['admin.users.edit'] === '1'">Lưu</a-button>
                            </a-form-item>
                        </div>
                    </div>
                </a-form>
            </div>
        </div>
    </a-card>
</template>
<script>
import { onMounted, defineComponent, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from 'ant-design-vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { useMenu } from "../../stores/use-menu.js";
import ApiViewData from '../../api/ApiViewData.js';
import BaseCommon from '../../api/BaseCommon.js';
import ApiUser from '../../api/ApiUser.js';
import { useAuthStore } from "../../stores/auth.store.js";

export default defineComponent({
    components: {
        DeleteOutlined
    },
    setup() {
        useMenu().onSelectedKeys(["admin-users"]);
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const apiPrefix = import.meta.env.VITE_API_PREFIX;
        const router = useRouter();
        const route = useRoute();
        const users = reactive({
            optionsLevelManage: [],
            optionsRole: [],
            optionsStatus: [],
        });

        const errors = ref({});
        const formRef = ref();
        const formState = reactive({
            id: '',
            userName: '',
            fullName: '',
            email: '',
            passWord: '',
            rePassWord: '',
            levelManage: '',
            roleID: '',
            status: '',
            urlAvatar: '',
            fileAvatar: null,
            rmavatar: "no",
            //
            change_password: false,
        });
        const fileAvatar = ref(null)
        let validatePass = async (rule, value) => {
            if (value === '') {
                return Promise.reject('Please input the password');
            } else {
                if (formState.rePassWord !== '') {
                    formRef.value.validateFields('rePassWord');
                }
                return Promise.resolve();
            }
        };
        let validatePass2 = async (rule, value) => {
            if (value === '') {
                return Promise.reject('Please input the password again');
            } else if (value !== formState.passWord) {
                return Promise.reject("Two inputs don't match!");
            } else {
                return Promise.resolve();
            }
        };
        const rules = {
            userName: [
                {
                    required: true,
                    message: 'Tài khoản không để trống.',
                    trigger: 'change',
                }
            ],
            fullName: [
                {
                    required: true,
                    message: 'Họ tên không để trống.',
                    trigger: 'change',
                }
            ],
            email: [
                {
                    required: true,
                    message: 'email không để trống.',
                    trigger: 'change',
                }
            ],
            passWord: [
                {
                    required: true,
                    validator: validatePass,
                    trigger: 'change',
                },
            ],
            rePassWord: [
                {
                    validator: validatePass2,
                    trigger: 'change',
                },
            ]
        };
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 14,
            },
        };
        //
        const getOptionsLevelManage = () => {
            ApiViewData.GetOptionsLevelManage().then((response) => {
                users.optionsLevelManage = response.data;
                formState.levelManage = response.data[0].value;
            }).catch((error) => {
                console.log(error);
            });
        };
        const filterOptionLevelManage = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        const getOptionsRole = () => {
            ApiViewData.GetOptionsRole().then((response) => {
                users.optionsRole = response.data;
                formState.roleID = response.data[0].value;
            })
                .catch((error) => {
                    console.log(error);
                });
        };
        const filterOptionRole = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        const getOptionsStatus = () => {
            ApiViewData.GetOptionsStatus().then((response) => {
                users.optionsStatus = response.data;
                formState.status = response.data[0].value;
            })
                .catch((error) => {
                    console.log(error);
                });
        };
        const filterOptionStatus = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        const getUsersEdit = () => {
            ApiUser.GetItemById(route.params.id).then((response) => {
                formState.id = response.data.id;
                formState.userName = response.data.userName;
                formState.fullName = response.data.fullName;
                formState.email = response.data.email;
                formState.levelManage = `${response.data.levelManage}`;
                formState.roleID = `${response.data.roleID}`;
                formState.status = `${response.data.status}`;
                formState.urlAvatar = `${response.data.urlAvatar}`;
                //
                if (formState.urlAvatar == 'null') {
                    formState.rmavatar = 'yes';
                }
            }).catch((error) => {
                message.error(`Lỗi! ${error.response.statusText}`);
            });
        };
        //
        const goBack = () => {
      // Navigate back to the previous page
      if (history.length > 1) {
        // If there's history available, go back
        history.go(-1);
      } else {
        // Otherwise, fallback to home or another default route
        this.$router.push("/");
      }
    };
        const updateUsers = () => {
            formState.fileAvatar = fileAvatar.value.files[0];
            ApiUser.EditItemById(formState).then((response) => {
                if (response.status == 200) {
                    message.success("Cập nhật thành công!");
                    router.push({ name: "admin-users" });
                } else {
                    message.error('Lỗi! Thực hiện tác vụ không thành công.');
                }
            }).catch((error) => {
                message.error(error.message);
                if (error.response.data.hasOwnProperty('errors')) {
                    errors.value = error.response.data.errors;
                } else {
                    errors.value = error.response.data;
                }
            });
        };
        onMounted(() => {
            //
            getOptionsLevelManage();
            getOptionsStatus();
            getOptionsRole();
            getUsersEdit();
            //
        })
        const handleChangeUpload = (e) => {
            // hien thi base 64 preview
            var p = BaseCommon.GetBase64(e.target.files[0]);
            p.then(value => {
                formState.urlAvatar = value;
                formState.rmavatar = 'no';
            }).catch(err => {
                console.log(err); // 👉️ "Something went wrong"
            });
        }
        const handleRemoveAvatar = () => {
            formState.urlAvatar = null;
            formState.rmavatar = 'yes';
        }

        return {
            ...toRefs(users),
            authStoreClaim,
            errors,
            formState,
            fileAvatar,
            formRef,
            rules,
            layout,
            //
            filterOptionLevelManage,
            filterOptionRole,
            filterOptionStatus,
            //
            users,
            getUsersEdit,
            updateUsers,
            // preview
            handleChangeUpload,
            handleRemoveAvatar,
            goBack
        };
    },
});
</script>