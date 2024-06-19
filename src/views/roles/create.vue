<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-12">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-roles' }">Vai trò</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>Thêm mới</a-breadcrumb-item>
                </a-breadcrumb>
                <h1></h1>
            </div>
            <div class="col-12 col-sm-12 mb-3">
                <!-- @submit.prevent="createUsers()" -->
                <a-form class="p-3" name="custom-validation" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                    autocomplete="off" ref="formRef" :model="formState" :rules="rules" @finish="createUsers()">
                    <div class="row">
                        <div class="col-12 col-sm-9">
                            <a-form-item label="Tên vai trò" required name="name">
                                <a-input v-model:value="formState.name" />
                                <small v-if="errors && errors.Name" class="text-danger">{{ errors.Name[0] }}</small>
                            </a-form-item>

                            <a-form-item label="Đặt làm mặc định" name="defaultRole">
                                <a-switch v-model:checked="formState.defaultRole" />
                            </a-form-item>

                            <a-form-item label="Trạng thái" name="status">
                                <a-select v-model:value="formState.status" show-search placeholder="Chọn trạng thái"
                                    style="width: 100%" :options="users.optionsStatus"
                                    :filter-option="filterOptionStatus"></a-select>
                                <small v-if="errors && errors.Status" class="text-danger">{{ errors.Status[0] }}</small>
                            </a-form-item>

                            <a-form-item :wrapper-col="{ span: 14, offset: 4 }" v-if="authStoreClaim['admin.roles.create'] === '1'">
                                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
                                    <router-link :to="{ name: 'admin-roles' }">
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
import ApiRole from '../../api/ApiRole.js';
import { useAuthStore } from "../../stores/auth.store.js";
export default defineComponent({
    components: {
        DeleteOutlined
    },
    setup() {
        useMenu().onSelectedKeys(["admin-roles"]);
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const apiPrefix = import.meta.env.VITE_API_PREFIX;
        const router = useRouter();
        const users = reactive({
            optionsStatus: [],
        });
        const errors = ref({});
        const formRef = ref();
        const formState = reactive({
            name: '',
            defaultRole: false,
            status: '',
        });
        const rules = {
            name: [
                {
                    required: true,
                    message: 'Tên vai trò không để trống.',
                    trigger: 'change',
                }
            ],
            status: [
                {
                    required: true,
                    message: 'Trạng thái không để trống.',
                    trigger: 'change',
                }
            ]
        };
        const resetForm = () => {
            formRef.value.resetFields();
        };
        //
        const getOptionsStatus = () => {
            ApiViewData.GetOptionsStatus().then((response) => {
                users.optionsStatus = response.data;
                formState.status = response.data[0].value;
            }).catch((error) => {
                console.log(error);
            });
        };
        const filterOptionStatus = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        // error
        const createUsers = () => {
            ApiRole.CreateItem(formState).then((response) => {
                if (response.status == 200) {
                    message.success("Tạo mới thành công!");
                    router.push({ name: "admin-roles" });
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
        }
        onMounted(() => {
            resetForm();
            getOptionsStatus();
        })
        //
        return {
            ...toRefs(users),
            authStoreClaim,
            errors,
            formState,
            formRef,
            rules,
            resetForm,
            //
            getOptionsStatus,
            filterOptionStatus,
            //
            users,
            createUsers,
        };
    },
});
</script>