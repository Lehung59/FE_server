<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-6">
        <a-breadcrumb>
          <a-breadcrumb-item>Danh sách khách hàng cửa hàng</a-breadcrumb-item>
        </a-breadcrumb>
      </div>

    </div>
    <div class="row mb-3">
      <div class="col-12">
        <a-form @submit.prevent="onSearch">
          <a-form-item>
            <a-input
              placeholder="Tìm kiếm"
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
            <template v-if="column.key === 'userName'">
              <span>{{ record.customerName }}</span>
            </template>
            <template v-if="column.key === 'fullName'">
              <span>{{ record.customerPhoneNumber }}</span>
            </template>
            <template v-if="column.key === 'email'">
              <span>{{ record.totalOrder }}</span>
            </template>
            <template v-if="column.key === 'totalPayment'">
              <span>{{ record.totalPayment }}</span>
            </template>

            <template v-if="column.key === 'action' && authStoreClaim !== null">
              <!-- <a-space warp>

                <a-button
                  type="dashed"
                  class="me-2 text-primary"
                  size="small"
                  title="Sửa"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </a-button>
              </a-space>
              <a-popconfirm
                title="Bạn muốn Khóa bản ghi này?"
                ok-text="Yes"
                cancel-text="No"
              >
                <router-link
                  :to="{
                    name: 'ProductByStore',
                    params: { id: record.storeId },
                  }"
                >
                  <a-button
                    title="Khóa"
                    type="dashed"
                    size="small"
                    shape=""
                    class="me-2 text-warning"
                  >
                    <i class="fa-solid fa-lock"></i>
                  </a-button>
                </router-link>
              </a-popconfirm> -->
              <router-link
                :to="{
                  name: 'order-by-user',
                  params: { id: record.storeId, customerId: record.customerId },
                }"
              >
                <a-button
                  title="Xóa"
                  type="dashed"
                  size="small"
                  shape=""
                  danger
                >
                  Xem đơn đã mua
                </a-button>
              </router-link>

              <!-- <a-popconfirm
                title="Bạn muốn Khóa bản ghi này?"
                ok-text="Yes"
                cancel-text="No"
              >
                <router-link
                  :to="{
                    name: 'admin-store-all-staff',
                    params: { id: record.storeId },
                  }"
                >
                  <a-button
                    title="Khóa"
                    type="dashed"
                    size="small"
                    shape=""
                    class="me-2 text-warning"
                  >
                    staff
                  </a-button>
                </router-link>
              </a-popconfirm> -->
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
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
    const router = useRouter();
    const route = useRoute();
    const id = JSON.parse(localStorage.getItem("auth")).storeId;
    const errors = ref([]);
    const users = ref([]);
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
        title: "Tên khách hàng",
        dataIndex: "userName",
        key: "userName",
      },
      {
        title: "Số điện thoại",
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: "Số lượng đơn hàng",
        key: "email",
      },
      {
        title: "Tổng chi",
        key: "totalPayment",
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
        .get(`${apiPrefix}/api/v1/management/${id}/customer/view`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, size, keyword },
        })
        .then((response) => {
          console.log(response.data.data, "response");
          const data = response.data;

          users.value = response.data.data;
          pageParam.totalItems = data.pagination.totalItems;
          pageParam.totalPages = data.pagination.totalPages;
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
    const onSearch = () => {
      pageParam.currentPage = 1;
      getUsers(pageParam.currentPage, pageParam.pageSize, searchKeyword.value);
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
    // onUpdated(() => {
    //   //
    //   if (Object.keys(route.query).length === 0) {
    //     pageParam.current =
    //       Object.keys(route.query).length > 0 ? route.query.PageNumber : 1;
    //     pageParam.pageNumber =
    //       Object.keys(route.query).length > 0 ? route.query.PageNumber : 1;
    //     pageParam.pageSize =
    //       Object.keys(route.query).length > 0 ? route.query.PageSize : 10;
    //     pageParam.userName =
    //       Object.keys(route.query).length > 0 ? route.query.UserName : "";
    //     pageParam.statusFilter = true;
    //     getUsers(pageParam);
    //   }
    // });
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
      onChange,
      clickFrmFilter,
      confirmRemove,
      confirmBanned,
      searchKeyword,
      onSearch,
    };
    //
  },
});
</script>
