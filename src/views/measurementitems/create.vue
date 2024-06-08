<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-12">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-measurementitems' }">Hạng mục đo</router-link>
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
                            <a-form-item label="ShortKey" required name="ShortKeyItem">
                                <a-input v-model:value="formState.ShortKeyItem" />
                                <small v-if="errors && errors.ShortKeyItem" class="text-danger">{{ errors.ShortKeyItem[0]
                                }}</small>
                            </a-form-item>

                            <a-form-item label="Tên hạng mục" required name="ItemName">
                                <a-input v-model:value="formState.ItemName" />
                                <small v-if="errors && errors.ItemName" class="text-danger">{{ errors.ItemName[0]
                                }}</small>
                            </a-form-item>

                            <a-form-item :wrapper-col="{ span: 14, offset: 4 }"
                                v-if="authStoreClaim['admin.measurementitems.create'] === '1'">
                                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
                                    <router-link :to="{ name: 'admin-measurementitems' }">
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
import ApiMeasurementItem from '../../api/ApiMeasurementItem.js';
import { useAuthStore } from "../../stores/auth.store.js";
export default defineComponent({
    components: {
        DeleteOutlined
    },
    setup() {
        useMenu().onSelectedKeys(["admin-measurementitems"]);
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const router = useRouter();
        const users = reactive({
            optionsStatus: [],
        });
        const errors = ref({});
        const formRef = ref();
        const formState = reactive({
            ShortKeyItem: '',
            ItemName: '',
        });
        const rules = {
            ShortKeyItem: [
                {
                    required: true,
                    message: 'Short Key không để trống.',
                    trigger: 'change',
                }
            ],
            ItemName: [
                {
                    required: true,
                    message: 'Tên hạng mục không để trống.',
                    trigger: 'change',
                }
            ]
        };
        const resetForm = () => {
            formRef.value.resetFields();
        };
        // error
        const createUsers = () => {
            ApiMeasurementItem.CreateItem(formState).then((response) => {
                if (response.status == 200) {
                    message.success("Tạo mới thành công!");
                    router.push({ name: "admin-measurementitems" });
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
            users,
            createUsers,
        };
    },
});
</script>