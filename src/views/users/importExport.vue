<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-6">
        <a-breadcrumb>
          <a-breadcrumb-item>
            Danh sách các hóa đơn nhập hàng</a-breadcrumb-item
          >
        </a-breadcrumb>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <a-button type="primary" title="Thêm mới">
          <router-link
            :to="{
              name: 'importExport/add-new',
              params: { id: storeId2._value },
            }"
          >
            <i class="fa-solid fa-plus"></i>
          </router-link>
        </a-button>
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
              <span>{{ record.storeName }}</span>
            </template>
            <template v-if="column.key === 'imageSp'">
              <span>{{ record.quantity }}</span>
            </template>
            <template v-if="column.key === 'fullName'">
              <span>{{ record.productName }}</span>
            </template>
            <template v-if="column.key === 'email'">
              <span>{{ record.price }}</span>
            </template>

            <template v-if="column.key === 'alltotal'">
              <span>{{ record.priceTotal }}</span>
            </template>
            <template v-if="column.key === 'action' && authStoreClaim !== null">
              <router-link
                :to="{
                  name: 'admin-chi-tiet-san-pham',
                  params: { id: record.productId },
                }"
              >
                <a-button
                  title="Khóa"
                  type="dashed"
                  size="small"
                  shape=""
                  class="me-2 text-warning"
                  >xem
                </a-button>
              </router-link>
              <router-link
                :to="{
                  name: 'hoa-don/sua',
                  params: { id: record.importDetailId },
                }"
              >
                <a-button
                  title="Khóa"
                  type="dashed"
                  size="small"
                  shape=""
                  class="me-2 text-warning"
                  >sửa
                </a-button>
              </router-link>
            </template>
          </template>
        </a-table>
        <div class="col-12">
          <a-pagination
            @change="onChange"
            v-model:current="pageParam.current"
            :total="pageParam.totalRecord"
            :pageSize="pageParam.pageSize"
            :show-total="
              (total, range) => `${range[0]}-${range[1]} of ${total} items`
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
    const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const router = useRouter();
    const route = useRoute();
    const errors = ref([]);
    const users = ref([]);
    const storeId = route.params.id;
    console.log(storeId, "storeId");
    const storeId2 = ref(route.params.id);
    console.log(storeId2._value, "storeId2");

    const pageParam = reactive({
      current: Object.keys(route.query).length > 0 ? route.query.PageNumber : 1,
      pageNumber:
        Object.keys(route.query).length > 0 ? route.query.PageNumber : 1,
      pageSize: Object.keys(route.query).length > 0 ? route.query.PageSize : 10,
      totalRecord: 0,
      userName: Object.keys(route.query).length > 0 ? route.query.UserName : "",
      statusFilter: false,
    });
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
        title: "Số lượng",
        dataIndex: "imageSp",
        key: "imageSp",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: "Giá",
        key: "email",
      },
      {
        title: "Tổng tiền",
        key: "alltotal",
      },

      {
        title: "Tác vụ",
        key: "action",
        fixed: "right",
      },
    ];
    const token = JSON.parse(localStorage.getItem("token"));

    const getUsers = (args) => {
      axios
        .get(
           `${apiPrefix}/api/v1/management/${storeId2._value}/import/view`,{
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào headers
            },
          }
        )
        .then((response) => {
          console.log(response.data.data, "response");
          users.value = response.data.data;
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
    onUpdated(() => {
      //
      if (Object.keys(route.query).length === 0) {
        pageParam.current =
          Object.keys(route.query).length > 0 ? route.query.PageNumber : 1;
        pageParam.pageNumber =
          Object.keys(route.query).length > 0 ? route.query.PageNumber : 1;
        pageParam.pageSize =
          Object.keys(route.query).length > 0 ? route.query.PageSize : 10;
        pageParam.userName =
          Object.keys(route.query).length > 0 ? route.query.UserName : "";
        pageParam.statusFilter = true;
        getUsers(pageParam);
      }
    });
    onMounted(() => {
      // chay lan dau tien
      getUsers(pageParam);
    });
    //
    function onChange(page, pageSize) {
      pageParam.pageNumber = page;
      pageParam.pageSize = pageSize;
      //
      pageParam.statusFilter = true;
      getUsers(pageParam);
    }
    //
    const clickFrmFilter = (event) => {
      pageParam.statusFilter = true;
      getUsers(pageParam);
    };
    //
    return {
      route,
      router,
      storeId2,
      authStoreClaim,
      errors,
      users,
      columns,
      pageParam,
      onChange,

      clickFrmFilter,
      confirmRemove,
      confirmBanned,
    };
    //
  },
});
</script>
