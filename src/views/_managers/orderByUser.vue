<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-6">
        <a-breadcrumb>
          <a-breadcrumb-item>Sản phẩm khách đã mua</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="col-6 d-flex justify-content-end"></div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <a-form @submit.prevent="onSearch">
          <a-form-item>
            <a-input
              placeholder="Tìm kiếm sản phẩm"
              v-model:value="searchKeyword"
              @pressEnter="onSearch"
            />
          </a-form-item>
          <a-button type="primary" @click="onSearch">Tìm kiếm</a-button>
        </a-form>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a-table
          :dataSource="users"
          :columns="columns"
          :scroll="{ x: 576 }"
          :pagination="false"
        >
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <span>{{ index + 1 }}</span>
            </template>

            <template v-if="column.key === 'imageSp'">
              <img
                :style="{ width: '50px !important' }"
                :src="record.productImg"
                :alt="record.productImg"
              />
            </template>
            <template v-if="column.key === 'fullName'">
              <span>{{ record.productName }}</span>
            </template>
            <template v-if="column.key === 'totalPrice'">
              <span>{{ record.priceTotal }}</span>
            </template>
            <template v-if="column.key === 'status'">
              <span>{{ record.orderStatusName }}</span>
            </template>
            <template v-if="column.key === 'action' && authStoreClaim !== null">
              <a-button
                @click="showDrawer(record.orderDetailId)"
                title="Xem"
                type="dashed"
                size="small"
                shape=""
                blue
                ><i class="fa-solid fa-eye"></i
              ></a-button>
            </template>
          </template>
        </a-table>
        <div class="col-12">
          <a-pagination
            @change="onChange"
            v-model:current="pageParam.currentPage"
            :total="pageParam.totalItems"
            :pageSize="pageParam.pageSize"
            :show-total="
              (total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`
            "
            class="mt-2 text-end"
          />
        </div>
      </div>
    </div>
  </a-card>

  <div>
    <a-drawer
      title="Chi tiết đơn hàng "
      :visible="isDrawerVisible"
      :width="850"
      @close="handleClose"
      :destroyOnClose="true"
    >
      <div style="display: flex; gap: 10px" class="giohang orderhome">
        <p>Tên sản phẩm :</p>
        <p style="color: black">{{ dataIdOrder.productName }}</p>
      </div>
      <div style="display: flex; gap: 10px" class="giohang orderhome">
        <p>Tên cửa hàng :</p>
        <p style="color: black">{{ dataIdOrder.storeName }}</p>
      </div>
      <div style="display: flex; gap: 10px" class="giohang orderhome">
        <p>Tên khách hàng :</p>
        <p style="color: black">{{ dataIdOrder.customerName }}</p>
      </div>
      <div style="display: flex; gap: 10px" class="giohang orderhome">
        <p>Số lượng sản phẩm :</p>
        <p style="color: black">{{ dataIdOrder.quantity }}</p>
      </div>
      <div style="display: flex; gap: 10px" class="giohang orderhome">
        <p>Tổng tiền :</p>
        <p style="color: black">
          {{ dataIdOrder.priceTotal?.toLocaleString() }} VND
        </p>
      </div>
      <div style="display: flex; gap: 10px" class="giohang orderhome">
        <p>Số điện thoại khách hàng :</p>
        <p style="color: black">
          {{ dataIdOrder.customerPhone }}
        </p>
      </div>
    </a-drawer>
  </div>

</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { useMenu } from "../../stores/use-menu.js";
import { onUpdated, onMounted } from "vue";
import ApiViewData from "../../api/ApiViewData.js";
import ApiUser from "../../api/ApiUser.js";
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";
export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const router = useRouter();
    const route = useRoute();
    const errors = ref([]);
    const users = ref([]);
    const storeId = JSON.parse(localStorage.getItem("auth")).storeId;
    console.log(storeId, "storeId");
    const storeId2 = JSON.parse(localStorage.getItem("auth")).storeId;
    const customerId = ref(route.params.customerId);

    const isDrawerVisible = ref(false);

    const dataIdOrder = ref({});

    const fetchIdOrder = async (idOrder) => {
      const { data } = await axios.get(
        `${apiPrefix}/api/v1/management/${storeId}/orderdetail/view/${idOrder}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data, "ccd");

      dataIdOrder.value = data.data;
    };


    const showDrawer = (id) => {
      isDrawerVisible.value = true;
      fetchIdOrder(id);
    };
    const handleClose = () => {
      isDrawerVisible.value = false;
    };

    const searchKeyword = ref("");
    const pageParam = reactive({
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    });
    const columns = [
      {
        title: "#",
        key: "index",
      },
      {
        title: "Ảnh sản phẩm",
        dataIndex: "imageSp",
        key: "imageSp",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: "Đơn giá",
        key: "totalPrice",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
      },

      {
        title: "Tác vụ",
        key: "action",
        fixed: "right",
      },
    ];
    const token = JSON.parse(localStorage.getItem("token"));

    const getUsers = (page, size, keyword = "") => {
      axios
        .get(
          `${apiPrefix}/api/v1/management/${storeId}/customer/${customerId._value}/detail`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { page, size, keyword },
          }
        )
        .then((response) => {
          const data = response.data;

          users.value = response.data.data;
          pageParam.totalItems = data.pagination.totalItems;
          pageParam.totalPages = data.pagination.totalPages;
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const confirmRemove = (id) => {
      ApiUser.DeleteById(id)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            message.success("Xóa thành công!");
            // router.push({ name: "admin-users" });
          }
          getUsers(pageParam);
        })
        .catch((error) => {
          message.error(error.message);
          if (error.response.data.hasOwnProperty("errors")) {
            errors.value = error.response.data.errors;
          } else {
            errors.value = error.response.data;
          }
        });
    };
    const confirmBanned = (id) => {
      ApiUser.BannedById(id)
        .then((response) => {
          if (response.status == 200) {
            message.success("Khóa thành công!");
          } else {
            message.error("Lỗi! Tác vụ thực hiện không thành công.");
          }
          getUsers(pageParam);
        })
        .catch((error) => {
          message.error(error.message);
          if (error.response.data.hasOwnProperty("errors")) {
            errors.value = error.response.data.errors;
          } else {
            errors.value = error.response.data;
          }
        });
    };
    //

    const onChange = (page, pageSize) => {
      pageParam.currentPage = page;
      pageParam.pageSize = pageSize;
      getUsers(page, pageSize, searchKeyword.value);
    };
    const onSearch = () => {
      pageParam.currentPage = 1;
      getUsers(pageParam.currentPage, pageParam.pageSize, searchKeyword.value);
    };
    onMounted(() => {
      // chay lan dau tien
      getUsers(pageParam.currentPage, pageParam.pageSize);
    });
    //

    //
    const clickFrmFilter = (event) => {
      pageParam.statusFilter = true;
      getUsers(pageParam);
    };
    //
    return {
      route,
      router,
      authStoreClaim,
      errors,
      users,
      columns,
      pageParam,
      handleClose,
      showDrawer,
      onChange,
      clickFrmFilter,
      confirmRemove,
      confirmBanned,
      searchKeyword,
      isDrawerVisible,
      dataIdOrder,
      onSearch,
    };
    //
  },
});
</script>
