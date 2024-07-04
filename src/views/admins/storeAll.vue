<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-6">
        <a-breadcrumb>
          <a-breadcrumb-item>Danh sách cửa hàng</a-breadcrumb-item>
        </a-breadcrumb>
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
            <template v-if="column.key === 'fullName'">
              <span>{{ record.phoneNumber }}</span>
            </template>
            <template v-if="column.key === 'email'">
              <span>{{ record.storeType }}</span>
            </template>

            <template v-if="column.key === 'action' && authStoreClaim !== null">
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
                    sản phẩm
                  </a-button>
                </router-link>
              </a-popconfirm>


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
        title: "Sđt",
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: "Loại",
        key: "email",
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
          `${apiPrefix}/api/v1/admin/store/view`,
          {
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
      // ApiUser.GetAllByLimit(args).then((response) => {
      //     // // list ban ghi

      //     // tham so
      //     pageParam.current = response.data.pageNumber;
      //     pageParam.pageNumber = response.data.pageNumber;
      //     pageParam.pageSize = response.data.pageSize;
      //     pageParam.totalRecord = response.data.totalRecords;
      //     //
      //     pageParam.userName = args.userName;
      //     if (pageParam.statusFilter) {
      //         if (response.data.totalPages < response.data.pageNumber && response.data.totalRecords > 0) {
      //             pageParam.current = 1;
      //             pageParam.pageNumber = 1;
      //             getUsers(pageParam);
      //             router.push({ name: "admin-users", query: { PageNumber: 1, PageSize: pageParam.pageSize, UserName: pageParam.userName } })
      //         } else {
      //             router.push({ name: "admin-users", query: { PageNumber: pageParam.pageNumber, PageSize: pageParam.pageSize, UserName: pageParam.userName } })
      //         }
      //     }
      //     //
      // }).catch((error) => {
      //     message.error(`Lỗi! ${error.response.statusText}`);
      // });
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
