<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-6">
        <a-breadcrumb>
          <a-breadcrumb-item>Danh sách đơn hàng cửa hàng</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="col-6 d-flex justify-content-end"></div>
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
    <!-- <div class="row">
            <div class="col-12">
                <a-form @keyup.enter="clickFrmFilter($event)" layout="inline" class="p-3 border">
                    <div class="col-3">
                        <label for="exampleFormControlInput1" class="form-label">Tài khoản</label>
                        <a-form-item>
                            <a-input v-model:value="pageParam.userName" placeholder="Username"
                                class="form-control form-control-sm" size="small"></a-input>
                        </a-form-item>
                    </div>
                    <div class="col-3">
                        <label for="exampleFormControlInput1" class="form-label">.</label>
                        <a-form-item>
                           <a-button v-on:click="clickFrmFilter($event)" class="bg-success text-light btn btn-sm"
                                size="small" type="button" html-type="button">
                                Tìm kiếm
                            </a-button>
                            <a-button v-on:click="clickFrmFilter($event)" class="bg-success text-light btn btn-sm"
                                size="small" type="submit" html-type="button">
                                Tìm kiếm
                            </a-button>
                        </a-form-item>
                    </div>
                </a-form>

            </div>
        </div> -->
    <div class="row">
      <div class="col-12">
        <a-table :dataSource="users" :columns="columns" :scroll="{ x: 576 }" :pagination="false">
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <span>{{ index + 1 }}</span>
            </template>
            <!-- imageSp -->
            <template v-if="column.key === 'imageSp'">
              <img :style="{ width: '50px !important' }" :src="record.productImg" :alt="record.productImg" />
            </template>
            <template v-if="column.key === 'userName'">
              <span>{{ record.productName }}</span>
            </template>
            <template v-if="column.key === 'fullName'">
              <span>{{ record.quantity }}</span>
            </template>
            <template v-if="column.key === 'email'">
              <span>{{ record.priceTotal?.toLocaleString() }} VNĐ</span>
            </template>
            <template v-if="column.key === 'status'">
              <span>{{ record.orderStatusName }}</span>
            </template>
            <template v-if="column.key === 'action' && authStoreClaim !== null">

              <a-button @click="showDrawer(record.orderDetailId)" title="Xem" type="dashed" size="small" shape=""
                blue><i class="fa-solid fa-eye"></i></a-button>

            </template>
          </template>
        </a-table>
        <div class="col-12">
          <a-pagination @change="onChange" v-model:current="pageParam.currentPage" :total="pageParam.totalItems"
            :pageSize="pageParam.pageSize" :show-total="(total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`
          " class="mt-2 text-end" />
        </div>
      </div>
    </div>
  </a-card>
  <div>
    <a-drawer title="Chi tiết đơn hàng " :visible="isDrawerVisible" :width="850" @close="handleClose"
      :destroyOnClose="true">
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
      <div style="display: flex; gap: 10px" class="giohang orderhome">
        <p>Ngày đặt hàng :</p>
        <p style="color: black">
          {{ formatDate(dataIdOrder.createdAt) }}
        </p>
      </div>
      <div style="display: flex; gap: 10px" class="giohang orderhome">
  <p>
    {{ getOrderStatusLabel(dataIdOrder.orderStatusId) }} :
  </p>
  <p style="color: black">
    {{ formatDate(dataIdOrder.updatedAt) }}
  </p>
</div>

    </a-drawer>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMenu } from "../../stores/use-menu.js";
import { onUpdated, onMounted } from "vue";
import ApiViewData from "../../api/ApiViewData.js";
import ApiUser from "../../api/ApiUser.js";
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";
import { Form, Drawer, Button, InputNumber, message } from "ant-design-vue";

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
    const isDrawerVisible = ref(false);
    const dataIdOrder = ref({});

    const id = JSON.parse(localStorage.getItem("auth")).storeId;
    const errors = ref([]);
    const users = ref([]);
    const token = JSON.parse(localStorage.getItem("token"));

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
        dataIndex: "userName",
        key: "userName",
      },
      {
        title: "số lượng",
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: "tồng tiền",
        key: "email",
      },
      {
        title: "trạng thái",
        key: "status",
      },
      //
      {
        title: "Tác vụ",
        key: "action",
        fixed: "right",
      },
    ];

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


    const getUsers = (page, size, keyword = "") => {
      axios
        .get(`${apiPrefix}/api/v1/management/${id}/order/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { page, size, keyword },
        })
        .then((response) => {
          console.log(response.data.data, "response");
          users.value = response.data.data;
          pageParam.totalItems = response.data.pagination.totalItems;
          pageParam.totalPages = response.data.pagination.totalPages;
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


    const getOrderStatusLabel = (statusId) => {
      switch (statusId) {
        case 1:
          return "Ngày đặt hàng";
        case 2:
          return "Ngày giao hàng";
        case 3:
          return "Ngày giao thành công";
        case 4:
          return "Ngày hủy đơn";
        default:
          return "Trạng thái không xác định";
      }
    }

    const fetchIdOrder = async (idOrder) => {
      const { data } = await axios.get(
        `${apiPrefix}/api/v1/management/${id}/orderdetail/view/${idOrder}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data, "ccd");

      dataIdOrder.value = data.data;
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
        message.success("success");
      } catch (e) {
        message.error(e.response.data.message);
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
    const onChange = (page, pageSize) => {
      pageParam.currentPage = page;
      pageParam.pageSize = pageSize;
      getUsers(page, pageSize, searchKeyword.value);
    };
    const onSearch = () => {
      pageParam.currentPage = 1;
      getUsers(pageParam.currentPage, pageParam.pageSize, searchKeyword.value);
    };

    //
    onMounted(() => {
      // chay lan dau tien
      getUsers(pageParam.currentPage, pageParam.pageSize);
    });
    //
    const clickFrmFilter = (event) => {
      pageParam.statusFilter = true;
      getUsers(pageParam);
    };
    //
    const showDrawer = (id) => {
      isDrawerVisible.value = true;
      fetchIdOrder(id);
    };
    const handleClose = () => {
      isDrawerVisible.value = false;
    };
    return {
      route,
      formatDate,
      getOrderStatusLabel,
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
      showDrawer,
      handleClose,
      isDrawerVisible,
      dataIdOrder,
      giveOrder,
      doneOrder,
      searchKeyword,
      onSearch,
    };
    //
  },
});
</script>
