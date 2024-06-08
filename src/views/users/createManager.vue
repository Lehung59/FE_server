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
                    <a-breadcrumb-item>Thêm mới manager</a-breadcrumb-item>
                </a-breadcrumb>
                <h1></h1>
            </div>
            <div class="col-12 col-sm-12 mb-3">
                <!-- @submit.prevent="createUsers()" -->
                <a-form class="p-3" name="custom-validation" ref="formRef" :model="formState" :rules="rules"
                    v-bind="layout" @finish="createUsers()">
                    <div class="row">
                        <div class="col-12 col-sm-9">
                            <a-form-item ref="userName" label="firstname" required name="userName">
                                <a-input v-model:value="formState.userName" />
                                <small v-if="errors && errors.UserName" class="text-danger">{{ errors.UserName[0]
                                    }}</small>
                            </a-form-item>
                            <a-form-item ref="fullName" label="lastname" required name="fullName">
                                <a-input v-model:value="formState.fullName" />
                                <small v-if="errors && errors.FullName" class="text-danger">{{ errors.FullName[0]
                                    }}</small>
                            </a-form-item>
                            <a-form-item ref="email" label="Email" :rules="[{ type: 'email' }]" required name="email">
                                <a-input v-model:value="formState.email" />
                                <small v-if="errors && errors.Email" class="text-danger">{{ errors.Email[0] }}</small>
                            </a-form-item>

                            <a-form-item has-feedback label="Mật khẩu" required name="passWord">
                                <a-input v-model:value="formState.passWord" type="password" autocomplete="off" />
                            </a-form-item>
                            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
                                    <router-link :to="{ name: 'admin-users' }">
                                        <span>Quay lại</span>
                                    </router-link>
                                </a-button>
                                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0 bg-info text-light"
                                    @click="resetForm">Reset</a-button>
                                <a-button type="primary" html-type="submit" class="bg-success">Lưu</a-button>
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
import { message } from 'ant-design-vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { useMenu } from "../../stores/use-menu.js";
import ApiViewData from '../../api/ApiViewData.js';
import BaseCommon from '../../api/BaseCommon.js';
import ApiUser from '../../api/ApiUser.js';
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";

export default defineComponent({
    components: {
        DeleteOutlined
    },
    setup() {
        useMenu().onSelectedKeys(["admin-users"]);
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const router = useRouter();
        const users = reactive({
            optionsLevelManage: [],
            optionsRole: [],
            optionsStatus: [],
        });
        const errors = ref({});
        const formRef = ref();
        const formState = reactive({
            userName: '',
            fullName: '',
            email: '',
            passWord: '',
            rePassWord: '',
            levelManage: '',
            roleID: '',
            status: '',
            //
            urlAvatar: '',
            fileAvatar: null,
            rmavatar: "yes",
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
        const resetForm = () => {
            formRef.value.resetFields();
        };
        //
        const getOptionsLevelManage = () => {
            ApiViewData.GetOptionsLevelManage().then((response) => {
                users.optionsLevelManage = response.data;
                formState.levelManage = response.data[0].value;
            })
                .catch((error) => {
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
        //
        const createUsers = () => {
            const newDataPost = {
                firstname: formState.userName,
                lastname: formState.fullName,
                email: formState.email,
                password: formState.passWord
            }
            console.log('formState');
            console.log(formState, 'formState');
            axios.post('https://charismatic-friendship-production.up.railway.app/api/v1/auth/register/manager', newDataPost).then((response) => {
                message.success("Tạo mới thành công!");
                router.push({ name: "admin-users" });
            }).catch((error) => {
                console.log(error)
            })
        }
        onMounted(() => {
            //
            resetForm();
            getOptionsLevelManage();
            getOptionsStatus();
            getOptionsRole();
        })
        const handleChangeUpload = (e) => {
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
        //
        return {
            ...toRefs(users),
            authStoreClaim,
            errors,
            formState,
            fileAvatar,
            formRef,
            rules,
            layout,
            resetForm,
            //
            getOptionsLevelManage,
            getOptionsStatus,
            getOptionsRole,
            filterOptionLevelManage,
            filterOptionRole,
            filterOptionStatus,
            users,
            createUsers,
            // preview
            handleChangeUpload,
            handleRemoveAvatar
        };
    },
});
</script>