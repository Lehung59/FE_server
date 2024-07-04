<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-6">
                <a-breadcrumb>
                    <a-breadcrumb-item>Sản phẩm của Cửa hàng</a-breadcrumb-item>
                </a-breadcrumb>
            </div>


            <div class="col-6 d-flex justify-content-end" v-if="role === 'MANAGER'">
                <!-- <a-button class="me-2"> -->

                <a-select class="me-2" v-model:value="selectedType" style="width: 200px"
                    placeholder="Chọn loại sản phẩm" @change="handleChange" title="Chọn loại sản phẩm">
                    <a-select-option :value="allType">
                  Tất cả
                </a-select-option>
                    <a-select-option v-for="typee in productTypes" :key="typee"
                        :value="typee.productTypeName">
                        {{ typee.productTypeName }}
                    </a-select-option>
                    <a-select-option style="background-color: azure;" key="addNew" @click="handleAddNewType">
                        Thêm mới loại sản phẩm
                    </a-select-option>
                </a-select>


                <!-- 
                    <router-link :to="{ name: 'product-type/them-moi', params: { id: storeId2 } }">
                        Loại sản phẩm
                    </router-link> -->
                <!-- </a-button> -->
                <a-button type="primary" title="Thêm mới sản phẩm">
                    <router-link :to="{ name: 'product/them-moi', params: { id: storeId2 } }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>
                </a-button>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12">
                <a-form @submit.prevent="onSearch">
                    <a-form-item>
                        <a-input placeholder="Tìm kiếm sản phẩm" v-model:value="searchKeyword" @pressEnter="onSearch" />
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
                        <template v-if="column.key === 'producName'">
                            <span>{{ record.productName }}</span>
                        </template>
                        <template v-if="column.key === 'imageSp'">
                            <img :style="{ width: '50px !important' }" :src="record.avatarProduct"
                                :alt="record.avatarProduct">
                        </template>
                        <template v-if="column.key === 'quantity'">
                            <span>{{ record.quantity }}</span>
                        </template>
                        <template v-if="column.key === 'price'">
                            <span>{{ record.price }}</span>
                        </template>
                        <template v-if="column.key === 'status'">
                            <a-tag :class="getStatusClass(record.status)">
                                {{ getStatusText(record.status) }}
                            </a-tag>
                        </template>
                        <template v-if="column.key === 'MANAGER' && authStoreClaim !== null">
                            <a-space warp>
                                <router-link v-if="record.status !== 2"
                                    :to="{ name: 'admin-product-edit', params: { id: record.productId } }">
                                    <a-button type="dashed" class="me-2 text-primary" size="small" title="Sửa">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a-button>
                                </router-link>
                            </a-space>
                            <router-link :to="{ name: 'admin-chi-tiet-san-pham', params: { id: record.productId } }">
                                <a-button title="Xem chi tiết" type="dashed" size="small" shape=""
                                    class="me-2 text-warning">Xem
                                </a-button>
                            </router-link>
                            <a-popconfirm title="Dữ liệu sẽ không thể phục hồi, bạn muốn xóa bản ghi này?" ok-text="Yes"
                                cancel-text="No" @confirm="confirmRemove(record.productId)">
                                <a-button title="Xóa" type="dashed" size="small" shape="" danger>
                                    <i class="fa-solid fa-trash-can"></i>
                                </a-button>
                            </a-popconfirm>
                        </template>
                        <template v-if="column.key === 'ADMIN' && authStoreClaim !== null">
                            <router-link :to="{ name: 'admin-chi-tiet-san-pham', params: { id: record.productId } }">
                                <a-button title="Xem chi tiết" type="dashed" size="small" shape=""
                                    class="me-2 text-warning">Xem
                                </a-button>
                            </router-link>


                            <a-button v-if="record.status != 2" @click="showBanModal(record.productId)"
                                title="Khóa sản phẩm" type="dashed" size="small" shape="" danger>
                                <p class="me-2 text-danger">Khóa</p>
                            </a-button>



                            <a-popconfirm v-if="record.status === 2" title="Bạn có muốn mở khóa sản phẩm?" ok-text="Yes"
                                cancel-text="No" @confirm="confirmUnBan(record.productId)">
                                <a-button title="Khóa sản phẩm" type="dashed" size="small" shape="">
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
import { defineComponent, ref, reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useAuthStore } from "../../stores/auth.store.js";
import { message,Space, Tag } from "ant-design-vue";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


export default defineComponent({
    components: {
    'a-space': Space,
    'a-tag': Tag,
  },
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
const allType = ref("")
        const selectedType = ref("");
        const productTypes = ref([]);

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
            { title: "Tên sản phẩm", dataIndex: "producName", key: "producName" },
            { title: "Ảnh sản phẩm", dataIndex: "imageSp", key: "imageSp" },
            { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
            { title: "Giá", key: "price" },
            { title: "Trạng thái", key: "status" },
            { title: "Tác vụ", key: role, fixed: "right" }
        ];

        const getStatusClass = (status) => {
            if (status === 0) {
                return 'status-stopped';
            } else if (status === 1) {
                return 'status-selling';
            } else if (status === 2) {
                return 'status-locked';
            }
        };
        const getStatusText = (status) => {
            if (status === 0) {
                return 'Ngừng bán';
            } else if (status === 1) {
                return 'Đang bán';
            } else if (status === 2) {
                return 'Bị khóa';
            }
        };
        const handleChange = (value) => {
            console.log('Selected productTypeName:', value);
            selectedType.value = value;

            pageParam.currentPage = 1;
            fetchProducts(pageParam.currentPage, pageParam.pageSize, searchKeyword.value,value);
        }
        const handleAddNewType = () => {
            router.push({ name: 'product-type/them-moi', params: { id: storeId2.value } });

        };
        const showBanModal = (productId) => {
            currentProductId.value = productId;
            isBanModalVisible.value = true;
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
        const fetchProducts = (page, size, keyword = "" ,productTypeName = "") => {
            axios
                .get(`${apiPrefix}/api/v1/management/${storeId2.value}/product/view`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { page, size, keyword,productTypeName }
                })
                .then((response) => {
                    const data = response.data;
                    users.value = data.data;
                    pageParam.totalItems = data.pagination.totalItems;
                    pageParam.totalPages = data.pagination.totalPages;
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        const fetchProductType = async () => {
            try {

                const response = await axios.get(
                    `${apiPrefix}/api/v1/management/${storeId2.value}/producttype/view`,
                    {
                        headers: {

                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,

                        },
                    });
                if (response.data.status === "OK") {
                    console.log(response.data.data,"producttype")
                    productTypes.value = response.data.data;
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        };
        const fetchFireBase = () => {


            // const firebaseConfig = {
            //     apiKey: "AIzaSyAYfnQlKBxt8LbgX3zBcsTSUT2qVhiNiA0",
            //     authDomain: "be-for-gr-49b88.firebaseapp.com",
            //     projectId: "be-for-gr-49b88",
            //     storageBucket: "be-for-gr-49b88.appspot.com",
            //     messagingSenderId: "531339012617",
            //     appId: "1:531339012617:web:29675eb397477856eae6d8",
            //     measurementId: "G-KH9RSMYBBZ"
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

                // getToken(messaging, { vapidKey: 'BEjH694CDnh2Hx__9CFs3bTo9v4Ti7uJq4ohSgN3LN8EVrfn9-dY8m7vTcsiLycQsH8Q9JyKQ0jZeu71fwblmEQ' })
                .then((currentToken) => {
                    if (currentToken) {
                        // Send the token to your server and update the UI if necessary
                        console.log("Token is:", currentToken);
                        // alert(currentToken);
                        const formData = new FormData();
                        formData.append("userId", userNOW.userId);

                        formData.append("firebaseId", currentToken);
                        axios.post(
                            `${apiPrefix}/api/v1/notifications/subscribe/device`,
                            formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        ).then((response) => {
                            message.success(" thành công!");
                        }).catch((error) => {
                            console.log(error)
                        })

                        // ...
                    } else {
                        // Show permission request UI
                        console.log('No registration token available. Request permission to generate one.');
                        // ...
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    // ...
                });

        };
        const confirmBan = (id, reason) => {
            const formData = new FormData();
            formData.append("productId", id);

            formData.append("banReason", reason);

            axios
                .post(`${apiPrefix}/api/v1/admin/product/ban`,
                    formData,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                .then((response) => {
                    message.success("Khóa thành công!");
                    fetchProducts(pageParam.currentPage, pageParam.pageSize, searchKeyword.value,selectedType.value);
                })
                .catch((error) => {
                    message.error("Khóa không thành công!");
                    console.error(error);
                });
        };
        const confirmUnBan = (id) => {
            const formData = new FormData();
            formData.append("productId", id);


            axios
                .post(`${apiPrefix}/api/v1/admin/product/open`,
                    formData,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                .then((response) => {
                    message.success("Mở khóa thành công!");
                    fetchProducts(pageParam.currentPage, pageParam.pageSize, searchKeyword.value,selectedType.value);
                })
                .catch((error) => {
                    message.error("Mở khóa không thành công!");
                    console.error(error);
                });
        };

        const confirmRemove = (id) => {
            axios
                .get(`${apiPrefix}/api/v1/management/${storeId2.value}/product/delete?productId=${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((response) => {
                    message.success("Xóa thành công!");
                    fetchProducts(pageParam.currentPage, pageParam.pageSize, searchKeyword.value,selectedType.value);
                })
                .catch((error) => {
                    message.error("Xóa không thành công!");
                    console.error(error);
                });
        };
        const onChange = (page, pageSize) => {
            pageParam.currentPage = page;
            pageParam.pageSize = pageSize;
            fetchProducts(page, pageSize, searchKeyword.value,selectedType.value);
        };
        const onSearch = () => {
            pageParam.currentPage = 1;
            fetchProducts(pageParam.currentPage, pageParam.pageSize, searchKeyword.value,selectedType.value);
        };
        const filteredProducts = computed(() => {
    if (!selectedType.value) {
        // pageParam.totalItems = users.value.length;
        return users.value;
    }
    const filtered = users.value.filter(product => product.productType === selectedType.value);
    // pageParam.totalItems = filtered.length;
    return filtered;
});


        onMounted(() => {
            fetchProducts(pageParam.currentPage, pageParam.pageSize);
            fetchProductType();
            // fetchFireBase();

        });
        return {
            productTypes,
            filteredProducts,
            handleAddNewType,
            selectedType,
            handleChange,
            allType,
            authStoreClaim,
            getStatusClass,
            getStatusText,
            users,
            columns,
            pageParam,
            storeId2,
            searchKeyword,
            onChange,
            onSearch,
            confirmRemove,
            role,
            confirmUnBan,
            confirmBan,
            handleBanConfirm,
            showBanModal,
            isBanModalVisible,
            banReason
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
    background-color: #eaa50f;
    /* Màu đỏ */
    color: black;
    border-radius: 3px;
    border: 1px solid;

}

.status-locked {
    background-color: #f11010;
    /* Màu đỏ */
    color: black;
    border-radius: 3px;
    border: 1px solid;

}

.custom-modal .ant-modal-content {
    background-color: white;
    /* Hoặc màu nền bạn muốn */
}

.custom-modal .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.5);
    /* Màu nền mờ bạn muốn khi modal hiện lên */
}
</style>
