<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-6">
        <a-breadcrumb>
          <a-breadcrumb-item>
            Danh sách các hóa đơn nhập hàng</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <a-button type="primary" title="Thêm mới">
          <router-link :to="{
            name: 'importExport/add-new',
            params: { id: storeId },
          }">
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

            <template v-if="column.key === 'imageSp'">
              <span>{{ record.quantity }}</span>
            </template>
            <template v-if="column.key === 'fullName'">
              <span>{{ record.productName }}</span>
            </template>
            <template v-if="column.key === 'date'">
              <span>{{ formatDate(record.createdAt) }}</span>
            </template>
            <template v-if="column.key === 'email'">
              <span>{{ record.price }}₫</span>
            </template>

            <template v-if="column.key === 'alltotal'">
              <span>{{ record.priceTotal }}₫</span>
            </template>
            <template v-if="column.key === 'status'">
              <span>{{ getStatus(record) }}</span>
            </template>
            <template v-if="column.key === 'action' && authStoreClaim !== null && getStatus(record) !== 'Đã xóa'">
              <router-link :to="{
            name: 'admin-chi-tiet-san-pham',
            params: { id: record.productId },
          }">
                <a-button title="Xem chi tiết" type="dashed" size="small" shape="" class="me-2 text-warning">xem
                </a-button>
              </router-link>
              <router-link :to="{
            name: 'hoa-don/sua',
            params: { id: record.importDetailId },
            query: {
              productName: record.productName,
              quantity: record.quantity,
              price: record.price
            }
          }">
                <a-button title="Khóa" type="dashed" size="small" shape="" class="me-2 text-warning">sửa
                </a-button>
              </router-link>
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
    const status = ref();
    const storeId2 = ref(route.params.id);
    console.log(storeId2._value, "storeId2");
    const storeId = JSON.parse(localStorage.getItem("auth")).storeId;
const searchKeyword = ref("");
    const pageParam = reactive({
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0
        });
    const columns = [
      {
        title: "#",
        key: "index",
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
        title: "Ngày nhập",
        dataIndex: "date",
        key: "date",
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
        title: "Tình trạng sản phẩm",
        key: "status",
      },

      {
        title: "Tác vụ",
        key: "action",
        fixed: "right",
      },
    ];
    const token = JSON.parse(localStorage.getItem("token"));

    const formatDate = (dateString) => {
      try {
        // Cắt chuỗi theo các thành phần thời gian và ngày
        const year = dateString.slice(2, 4); // Lấy hai chữ số cuối của năm
        const month = dateString.slice(5, 7); // Lấy tháng
        const day = dateString.slice(8, 10); // Lấy ngày
        const hours = dateString.slice(11, 13); // Lấy giờ
        const minutes = dateString.slice(14, 16); // Lấy phút
        const seconds = dateString.slice(17, 19); // Lấy giây

        // Ghép lại thành định dạng mong muốn
        return `${hours}:${minutes}:${seconds}    ${day}-${month}-${year}`;
      } catch (error) {
        console.error('Error formatting date:', error);
        return "Invalid date";
      }

      // Ghép lại thành định dạng mong muốn
      return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    };
    const getUsers = (page, size, keyword = "" ) => {
      axios
        .get(
          `${apiPrefix}/api/v1/management/${storeId}/import/view`, {
            params: { page, size, keyword },
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
          },
        }
        )
        .then((response) => {
          console.log(response.data.data, "response");
          users.value = response.data.data;
          pageParam.totalItems = response.data.pagination.totalItems;
          pageParam.totalPages = response.data.pagination.totalPages;
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

    const getStatus = (record) => {
      if (record.deleted) {
        return 'Đã xóa';
      }
      switch (record.productStatus) {
        case 0:
          return 'Ngừng bán';
        case 1:
          return 'Đang bán';
        case 3:
          return 'Bị cấm';
        default:
          return 'Không rõ';
      }
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

    onMounted(() => {
      // chay lan dau tien
      getUsers(pageParam.currentPage, pageParam.pageSize);
    });
    //
    const onChange = (page, pageSize) => {
            pageParam.currentPage = page;
            pageParam.pageSize = pageSize;
            getUsers(page, pageSize, searchKeyword.value);
        };
    //
    const onSearch = () => {
            pageParam.currentPage = 1;
            getUsers(pageParam.currentPage, pageParam.pageSize, searchKeyword.value);
        };
    const clickFrmFilter = (event) => {
      pageParam.statusFilter = true;
      getUsers(pageParam);
    };
    //
    return {
      route,
      getStatus,
      searchKeyword,
      onSearch,
      router,
      storeId2,
      storeId,
      authStoreClaim,
      errors,
      users,
      columns,
      pageParam,
      onChange,
      formatDate,
      clickFrmFilter,
      confirmRemove,
      confirmBanned,
    };
    //
  },
});
</script>
