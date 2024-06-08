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
                    <a-breadcrumb-item>Sửa</a-breadcrumb-item>
                </a-breadcrumb>
                <h1></h1>
            </div>
            <div class="col-12 col-sm-12 mb-3">
                <a-form class="p-3" name="custom-validation" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                    autocomplete="off" ref="formRef" :model="formState" :rules="rules" @finish="updateUsers()">
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

                            <a-form-item :wrapper-col="{ span: 14, offset: 4 }" v-if="authStoreClaim['admin.roles.edit'] === '1'">
                                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
                                    <router-link :to="{ name: 'admin-roles' }">
                                        <span>Quay lại</span>
                                    </router-link>
                                </a-button>
                                <a-button type="primary" html-type="submit" class="bg-success">Lưu</a-button>
                            </a-form-item>
                        </div>
                    </div>
                </a-form>
            </div>
            <div class="col-12">
                <h3 class="col-sm-12">
                    <p class="p-2 bg-secondary text-light">Phân quyền</p>
                </h3>
            </div>
            <div class="col-12" v-if="authStoreClaim['admin.roles.edit'] === '1'">
                <div class="permission-item" v-for="item in users.rolePermission">
                    <fieldset class="clearfix field_set_role">
                        <legend class="border-bottom">{{ item.title }}</legend>
                        <div class="row clear_fix row-role-detail">
                            <div class="col-lg-2 col-md-2 col-xs-2" v-for="item2 in item.roleClaimDetail">
                                <label class="control-label clearfix fw-bold">{{ item2.title }}</label>
                                <div class="clearfix radio icheck-success form-check">
                                    <input v-model="item2.claimValue" :id="item2.claimType + '-allow'"
                                        class="flat-red form-check-input" :name="item2.claimType" type="radio" :value="1"
                                        @click="handleClickClaim($event)">
                                    <label :for="item2.claimType + '-allow'" class="form-check-label">
                                        <span class="font-weight-normal">Cho phép</span>
                                    </label>
                                </div>
                                <div class="clearfix radio icheck-success form-check">
                                    <input v-model="item2.claimValue" :id="item2.claimType + '-deny'"
                                        class="flat-red form-check-input" :name="item2.claimType" type="radio" :value="0"
                                        @click="handleClickClaim($event)">
                                    <label :for="item2.claimType + '-deny'" class="lbl-deny form-check-label" onclick="">
                                        <span class="font-weight-normal">Từ chối</span>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </fieldset>
                    <h1 class="clearfix"></h1>
                </div>
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
import ApiRole from '../../api/ApiRole.js';
import { useAuthStore } from "../../stores/auth.store.js";
export default defineComponent({
    components: {
        DeleteOutlined
    },
    setup() {
        useMenu().onSelectedKeys(["admin-roles"]);
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const router = useRouter();
        const route = useRoute();
        const users = reactive({
            optionsStatus: [],
            rolePermission: []
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
        const getUsersEdit = () => {
            ApiRole.GetItemById(route.params.id).then((response) => {
                formState.id = response.data.id;
                formState.name = response.data.name;
                formState.defaultRole = response.data.defaultRole;
                formState.status = `${response.data.status}`;
            }).catch((error) => {
                console.log(error);
            });
        };
        // lay permission
        const getPermissionEdit = () => {
            ApiRole.GetPermissionByRoleId(route.params.id).then((response) => {
                console.log(response.data);
                users.rolePermission = response.data;
            }).catch((error) => {
                console.log(error);
            });
        };
        const handleClickClaim = (event) => {
            // console.log(event);
            console.log(event.target.name);
            console.log(event.target.value);
            console.log(formState.id);
            //
            ApiRole.UpdateRoleClaimByRoleId(formState.id, event.target.name, event.target.value).then((response) => {
                if (response.status == 200) {
                    message.success("Cập nhật quyền thành công!");
                } else {
                    message.error('Lỗi! Thực hiện tác vụ không thành công.');
                }
                console.log(response.data);
                // users.rolePermission = response.data;
            }).catch((error) => {
                console.log(error);
            });
        }
        //
        const updateUsers = () => {
            ApiRole.EditItemById(formState).then((response) => {
                if (response.status == 200) {
                    message.success("Cập nhật thành công!");
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
        };
        onMounted(() => {
            getOptionsStatus();
            getUsersEdit();
            getPermissionEdit();
        })
        //
        return {
            ...toRefs(users),
            authStoreClaim,
            errors,
            formState,
            formRef,
            rules,
            getOptionsStatus,
            filterOptionStatus,
            getUsersEdit,
            getPermissionEdit,
            handleClickClaim,
            users,
            updateUsers,
        };
    },
});
</script>