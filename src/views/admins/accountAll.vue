<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-6">
                <a-breadcrumb>
                    <a-breadcrumb-item>Danh sách các tài khoản</a-breadcrumb-item>
                </a-breadcrumb>
            </div>
            
        </div>
        <div class="row mb-3">
            <div class="col-12">
                <a-form @submit.prevent="onSearch">
                    <a-form-item>
                        <a-input placeholder="Tìm kiếm tài khoản" v-model:value="searchKeyword" @pressEnter="onSearch" />
                    </a-form-item>
                    <a-form-item>
                <a-select v-model:value="selectedRole" placeholder="Chọn loại tài khoản" default-value="MANAGER">
                    <a-select-option value="MANAGER">Chủ cửa hàng</a-select-option>
                    <a-select-option value="SHIPPER">Người giao hàng</a-select-option>
                    <a-select-option value="USER">Khách hàng</a-select-option>
                </a-select>
            </a-form-item>
                    <a-button type="primary" @click="onSearch">Tìm kiếm</a-button>
                </a-form>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-table :dataSource="users" :columns="columns" :scroll="{ x: 576 }" :pagination="false">
                    <template #bodyCell="{ column, index, record }">
                        <template v-if="column.key === 'index'">
                            <span>{{ index + 1 }}</span>
                        </template>
                        <template v-if="column.key === 'email'">
                            <span>{{ record.email }}</span>
                        </template>
                        <template v-if="column.key === 'firstname'">
                            <span>{{ record.firstname }}</span>
                        </template>
                        <template v-if="column.key === 'lastname'">
                            <span>{{ record.lastname }}</span>
                        </template>
                        
                        <template v-if="column.key === 'ADMIN' && authStoreClaim !== null">




        <a-popconfirm v-if="record.enabled" title="Bạn có muốn khóa tài khoản?" ok-text="Yes"
        cancel-text="No" @confirm="confirmBan(record.id)">
        <a-button title="Khóa sản phẩm" type="dashed" size="small" shape="" >
            <p class="me-2 text-danger">Khóa</p>
        </a-button>
    </a-popconfirm>
    
    <a-popconfirm v-if="!record.enabled" title="Bạn có muốn mở khóa tài khoản?" ok-text="Yes"
        cancel-text="No" @confirm="confirmUnBan(record.id)">
        <a-button title="Khóa sản phẩm" type="dashed" size="small" shape="" >
            <p class="me-2 text-green">Mở</p>
        </a-button>
    </a-popconfirm>

    <!-- <a-modal class="custom-modal" v-model:visible="isBanModalVisible" title="Nhập lý do khóa sản phẩm" ok-text="Khóa"
        cancel-text="Hủy" @ok="handleBanConfirm">
        <a-input v-model:value="banReason" placeholder="Nhập lý do" />
    </a-modal> -->

    
    <a-modal v-model:visible="isBanModalVisible" title="Nhập lý do khóa sản phẩm" ok-text="Khóa"
    cancel-text="Hủy" @ok="handleBanConfirm">
    <a-input v-model:value="banReason" placeholder="Nhập lý do" />

  </a-modal>

</template>
                    </template>
                </a-table>
                <div class="col-12">
                    <a-pagination @change="onChange" v-model:current="pageParam.currentPage"
                        :total="pageParam.totalItems" :pageSize="pageParam.pageSize"
                        :show-total="(total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`"
                        class="mt-2 text-end" />
                </div>
            </div>
        </div>
    </a-card>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useAuthStore } from "../../stores/auth.store.js";
import { message } from "ant-design-vue";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


export default defineComponent({
    setup() {
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const router = useRouter();
        const route = useRoute();
        const apiPrefix = import.meta.env.VITE_API_PREFIX;
        const token = JSON.parse(localStorage.getItem("token"));
        const userNOW = JSON.parse(localStorage.getItem("auth"));
        const role = userNOW.role;
        const storeId2 = ref(route.params.id);
        const users = ref([]);
        const searchKeyword = ref("");
        const selectedRole = ref("MANAGER")
        const pageParam = reactive({
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0
        });
        const isBanModalVisible = ref(false)
        const banReason = ref('');
        const currentProductId = ref();
        const columns = [
            { title: "#", key: "index" },
            { title: "Email",  key: "email" },
            { title: "Họ",  key: "firstname" },
            { title: "Tên", key: "lastname" },
            { title: "Tác vụ", key: role, fixed: "right" }
        ];


        const showBanModal = (productId) => {
            currentProductId.value = productId;
        };
        const handleBanConfirm = () => {
            console.log(currentProductId.value);
            console.log(banReason.value); // Kiểm tra xem banReason có giá trị hay không

            if (banReason.value) {
                confirmBan(currentProductId.value, banReason.value);
                isBanModalVisible.value = false;
                banReason.value = ''; // Đặt lại banReason về rỗng sau khi xử lý xong
            } else {
                // Xử lý khi banReason chưa có giá trị
                // Ví dụ: Hiển thị một thông báo lỗi cho người dùng
                console.error('Lý do không được để trống');
            }
        }
        const fetchProducts = (page, size, keyword = "",role) => {
            axios
                .get(`${apiPrefix}/api/v1/admin/account/view`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { page, size, keyword,role }
                })
                .then((response) => {
                    const data = response.data;
                    users.value = data.data;
                    console.log(users.value)
                    pageParam.totalItems = data.pagination.totalItems;
                    pageParam.totalPages = data.pagination.totalPages;
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        const confirmBan = (id) => {
            const formData = new FormData();
            formData.append("accountId", id);
            axios
                .post(`${apiPrefix}/api/v1/admin/account/ban`,
                    formData,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                .then((response) => {
                    message.success("Khóa thành công!");
                    fetchProducts(pageParam.currentPage, pageParam.pageSize, searchKeyword.value,selectedRole.value);
                })
                .catch((error) => {
                    message.error("Khóa không thành công!");
                    console.error(error);
                });
        };
        const confirmUnBan = (id) => {
            const formData = new FormData();
            formData.append("accountId", id);


            axios
                .post(`${apiPrefix}/api/v1/admin/account/active`,
                    formData,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                .then((response) => {
                    message.success("Mở khóa thành công!");
                    fetchProducts(pageParam.currentPage, pageParam.pageSize, searchKeyword.value,selectedRole.value);
                })
                .catch((error) => {
                    message.error("Mở khóa không thành công!");
                    console.error(error);
                });
        };


        const onChange = (page, pageSize) => {
            pageParam.currentPage = page;
            pageParam.pageSize = pageSize;
            fetchProducts(page, pageSize, searchKeyword.value,selectedRole.value);
        };
        const onSearch = () => {
            pageParam.currentPage = 1;
            fetchProducts(pageParam.currentPage, pageParam.pageSize, searchKeyword.value,selectedRole.value);
        };


        onMounted(() => {
            fetchProducts(pageParam.currentPage, pageParam.pageSize,selectedRole.value);

        });
        return {
            authStoreClaim,
            users,
            columns,
            pageParam,
            storeId2,
            searchKeyword,
            onChange,
            onSearch,
            role,
            confirmUnBan,
            confirmBan,
            handleBanConfirm,
            showBanModal,
            isBanModalVisible,
            banReason,
            selectedRole
        };
    }
});
</script>



<style scoped>
.status-selling {
    background-color: #56b725;
    /* Màu xanh */
    color: black;
    border-radius: 3px;
    border: 1px solid;
}

.status-stopped {
    background-color: #f5222d;
    /* Màu đỏ */
    color: black;
    border-radius: 3px;
    border: 1px solid;

}
.custom-modal .ant-modal-content {
    background-color: white; /* Hoặc màu nền bạn muốn */
}

.custom-modal .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.5); /* Màu nền mờ bạn muốn khi modal hiện lên */
}
</style>
