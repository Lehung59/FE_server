<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-6">
        <a-breadcrumb>
          <a-breadcrumb-item>Danh sách đơn đã giao</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a-table :dataSource="users" :columns="columns" :scroll="{ x: 576 }" :pagination="false">
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <span>{{ index + 1 }}</span>
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
              <span>{{ record.productName }}</span>
            </template>
            <template v-if="column.key === 'email3'">
              <img :style="{ width: '50px !important' }" :src="record.productImg" :alt="record.productImg" />
            </template>
            <template v-if="column.key === 'email4'">
              <span>{{ record.priceTotal?.toLocaleString() }} VND</span>
            </template>
            <template v-if="column.key === 'action' && authStoreClaim !== null">
              <a-button @click="getIdDh(record.orderDetailId)" type="dashed" size="small" title="Sửa">
                Chi tiết
              </a-button>
            </template>
          </template>
        </a-table>
        <div class="col-12">
          <a-pagination @change="onChange" v-model:current="pageParam.current" :total="pageParam.totalRecord"
            :pageSize="pageParam.pageSize" :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`"
            class="mt-2 text-end" />
        </div>
      </div>
    </div>
  </a-card>
  <a-drawer title="Chi tiết" :visible="isDrawerVisible" :width="850" @close="handleClose" :destroyOnClose="true">
    <div class="giohang orderhome">
      <p style="color: black;">Tên khách hàng: {{ dataId.customerName }}</p>
      <p>Số điện thoại: {{ dataId.customerPhone }}</p>
      <p>Tổng tiền: {{ dataId.priceTotal }}</p>
      <p>Tên sản phẩm: {{ dataId.productName }}</p>
      <p>Số lượng: {{ dataId.quantity }}</p>
      <p>Địa chỉ: {{ dataId.address }}</p>
    </div>
  </a-drawer>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMenu } from "../../stores/use-menu.js";
import { onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "../../stores/auth.store.js";
import { Form, Drawer, Button, message } from "ant-design-vue";

export default defineComponent({
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-drawer": Drawer,
    "a-button": Button,
  },
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const router = useRouter();
    const route = useRoute();
    const errors = ref([]);
    const users = ref([]);
    const isDrawerVisible = ref(false); // Initial value false
    const dataId = ref({});

    const pageParam = reactive({
      current: Object.keys(route.query).length > 0 ? route.query.PageNumber : 1,
      pageSize: Object.keys(route.query).length > 0 ? route.query.PageSize : 10,
      totalRecord: 0,
    });

    const columns = [
      { title: "#", key: "index" },
      { title: "Tên cửa hàng", dataIndex: "userName", key: "userName" },
      { title: "Tên sản phẩm", dataIndex: "fullName", key: "fullName" },
      { title: "Số lượng", key: "email" },
      { title: "Tên sản phẩm", key: "email2" },
      { title: "Ảnh", key: "email3" },
      { title: "Tổng tiền", key: "email4" },
      { title: "Tác vụ", key: "action", fixed: "right" },
    ];

    const token = JSON.parse(localStorage.getItem("token"));

    const getUsers = () => {
      axios
        .get(`${apiPrefix}/api/v1/shipper/orderlist/shipped`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          users.value = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const showDrawer = () => {
      isDrawerVisible.value = true;
    };

    const handleClose = () => {
      isDrawerVisible.value = false;
    };

    const getIdDh = async (idI) => {
      showDrawer(); // Show drawer first
      try {
        const { data } = await axios.get(`${apiPrefix}/api/v1/shipper/orderdetail?orderid=${idI}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.status === "OK") {
          dataId.value = data.data;
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const onChange = (page, pageSize) => {
      pageParam.current = page;
      pageParam.pageSize = pageSize;
      getUsers();
    };
    onMounted(() => {
      getUsers();
    });
    return {
      users,
      columns,
      isDrawerVisible,
      dataId,
      getIdDh,
      handleClose,
      showDrawer,
      onChange,
      pageParam,
    };
  },
});
</script>
