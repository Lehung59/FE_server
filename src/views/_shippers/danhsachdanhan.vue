<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-6">
                <a-breadcrumb>
                    <a-breadcrumb-item>Danh sách đơn đã nhận</a-breadcrumb-item>
                </a-breadcrumb>
            </div>
        </div>
        <div class="row">
            <div class="row mb-3">
                <div class="col-12">
                    <a-form @submit.prevent="onSearch">
                        <a-form-item>
                            <a-input placeholder="Tìm kiếm" v-model:value="searchKeyword" @pressEnter="onSearch" />
                        </a-form-item>
                        <a-button type="primary" @click="onSearch">Tìm kiếm</a-button>
                    </a-form>
                </div>
            </div>

            <div class="col-12">
                <a-table :dataSource="users" :columns="columns" :scroll="{ x: 576 }" :pagination="false">
                    <template #bodyCell="{ column, index, record }">
                        <template v-if="column.key === 'index'">
                            <span>{{ index + 1 + (pageParam.currentPage-1)*10 }}</span>
                        </template>
                        <template v-if="column.key === 'userName'">
                            <span>{{ record.storeName }}</span>
                        </template>
                        <template v-if="column.key === 'fullName'">
                            <span>{{ record.productName }}</span>
                        </template>
                        <template v-if="column.key === 'email'">
                            <span>{{ record.quantity }}</span>
                        </template>
                        <template v-if="column.key === 'email2'">
                            <span>{{ record.storeAddress }}</span>
                        </template>
                        <template v-if="column.key === 'email5'">
                            <span>{{ record.storePhone }}</span>
                        </template>
                        <template v-if="column.key === 'email3'">
                            <img :style="{ width: '50px !important' }" :src="record.productImg"
                                :alt="record.productImg" />
                        </template>
                        <template v-if="column.key === 'email4'">
                            <span>{{ record.priceTotal?.toLocaleString() }} VND</span>
                        </template>
                        <template v-if="column.key === 'action' && authStoreClaim !== null">
                        </template>
                        <template v-if="column.key === 'action' && authStoreClaim !== null">

                            <a-button @click="getIdDh(record.orderDetailId)" type="dashed" size="small">
                                Chi tiết
                            </a-button>
                            <a-button title="Hoàn thành đơn" @click="doneOrder(record.orderDetailId)" type="dashed"
                                size="small" shape="">
                                Hoàn thành
                            </a-button>
                        </template>
                    </template>
                </a-table>
                <div class="col-12">
                    <a-pagination @change="onChange" v-model:current="pageParam.currentPage"
                        :total="pageParam.totalItems" :pageSize="pageParam.pageSize"
                        :show-total="(total, range) => `${range[0]}-${range[1]} của ${total} đơn hàng`"
                        class="mt-2 text-end" />
                </div>
            </div>
        </div>
    </a-card>
    <a-drawer title="Chi tiết" :visible="isDrawerVisible" :width="850" @close="handleClose" :destroyOnClose="true">
        <div class="giohang orderhome">
            <p style="color: black;">Tên khách hàng : {{ dataId.customerName }}</p>
            <p>Số điện thoại : {{ dataId.customerPhone }}</p>
            <p>Tổng tiền :{{ dataId.priceTotal }}</p>
            <p>Tên sản phẩm :{{ dataId.productName }}</p>
            <p>Số lượng :{{ dataId.quantity }}</p>
            <p>Địa chỉ giao hàng:{{ dataId.address }}</p>
        </div>
    </a-drawer>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { Form, Drawer, Button, InputNumber, message } from "ant-design-vue";
import { useMenu } from "../../stores/use-menu.js";
import { onUpdated, onMounted } from "vue";
import ApiViewData from "../../api/ApiViewData.js";
import ApiUser from "../../api/ApiUser.js";
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";
export default defineComponent({
    components: {
        "a-form": Form,
        "a-form-item": Form.Item,
        "a-drawer": Drawer,
        "a-button": Button,
        "a-input-number": InputNumber,
    },
    setup() {
        useMenu().onSelectedKeys(["admin-users"]);
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const apiPrefix = import.meta.env.VITE_API_PREFIX;
        const router = useRouter();
        const route = useRoute();
        const errors = ref([]);
        const users = ref([]);
        const dataId = ref({});
        const searchKeyword = ref("");

        const pageParam = reactive({
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
        });

        const isDrawerVisible = ref(false);
        const token = JSON.parse(localStorage.getItem("token")); // Lấy token từ localStorage

        const showDrawer = () => {
            isDrawerVisible.value = true;
        };
        const handleClose = () => {
            isDrawerVisible.value = false;
        };
        const getIdDh = async (idI) => {
            showDrawer()
            const { data } = await axios.get(`${apiPrefix}/api/v1/shipper/orderdetail?orderid=${idI}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (data.status === "OK") {
                dataId.value = data.data
                console.log(dataId.data, 'dataId.data')
            } else {
                console.error(data.message);
            }

        }


        const columns = [
            {
                title: "#",
                key: "index",
            },
            {
                title: "Tên cửa hàng",
                dataIndex: "userName",
                key: "userName",
            },
            {
                title: "Tên sản phẩm",
                dataIndex: "fullName",
                key: "fullName",
            },
            {
                title: "Số lượng",
                key: "email",
            },
            {
                title: "Đia chỉ cửa hàng",
                key: "email2",
            },
            {
                title: "Số cửa hàng",
                key: "email5",
            },
            {
                title: "Ảnh",
                key: "email3",
            },
            {
                title: "Tổng tiền",
                key: "email4",
            },
            {
                title: "Tác vụ",
                key: "action",
                fixed: "right",
            },
        ];

        const getUsers = (page, size, keyword = "") => {
            axios
                .get(
                    `${apiPrefix}/api/v1/shipper/orderlist/taken`,
                    {
                        params: { page, size, keyword },
                        headers: {
                            Authorization: `Bearer ${token}`,
                            

                        },
                    }
                )
                .then((response) => {
                    const sortedData = response.data.data.sort((a, b) => {
                        return new Date(b.updateAt) - new Date(a.updateAt);
                    });
                    console.log(sortedData, "response");
                    users.value = sortedData;
                    pageParam.totalItems = response.data.pagination.totalItems;
                    pageParam.totalPages = response.data.pagination.totalPages;
                })
                .catch((error) => {
                    console.error(error);
                });

        };

        const onChange = (page, pageSize) => {
            pageParam.currentPage = page;
            pageParam.pageSize = pageSize;
            getUsers(page, pageSize, searchKeyword.value);
        };
        const giveOrder = async (orderId) => {
            try {
                const data = await axios.get(
                    `${apiPrefix}/api/v1/shipper/changestatus1/${orderId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                message.success("success");
            } catch (e) {
                message.error(e.response.data.message);
            }
        };
        const onSearch = () => {
            pageParam.currentPage = 1;
            getUsers(pageParam.currentPage, pageParam.pageSize, searchKeyword.value);
        };
        const doneOrder = async (orderId) => {
            try {
                const data = await axios.get(
                    `${apiPrefix}/api/v1/shipper/changestatus2/${orderId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                router.push("danh-sach-don-da-giao")
                message.success("success");
            } catch (e) {
                message.error(e.response.data.message);
            }
        };
        //

        onMounted(() => {
            // chay lan dau tien
            getUsers(pageParam.currentPage, pageParam.pageSize);
        });
        


        return {
            route,
            onSearch,
            searchKeyword,
            router,
            authStoreClaim,
            errors,
            users,
            columns,
            pageParam,
            onChange,
            giveOrder,
            doneOrder,
            isDrawerVisible,
            showDrawer,
            handleClose,
            dataId,
            getIdDh
        };
        //
    },
});
</script>