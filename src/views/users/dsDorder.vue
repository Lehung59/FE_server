<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-6">
        <a-breadcrumb>
          <a-breadcrumb-item>Danh sách đơn </a-breadcrumb-item>
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
            </template>
            <template v-if="column.key === 'action' && authStoreClaim !== null">

              <a-button @click="getIdDh(record.orderDetailId)" type="dashed" size="small" title="Sửa">
                Chi tiết
              </a-button>
              <a-button @click="giveOrder(record.orderDetailId)" type="dashed" size="small" title="Sửa">
                Nhận đơn
              </a-button>
              <!-- <a-button
                title="Khóa"
                @click="doneOrder(record.orderDetailId)"
                type="dashed"
                size="small"
                shape=""
               
              >
                Hoàn thành
              </a-button> -->
            </template>
          </template>
        </a-table>
        <div class="col-12">
          <a-pagination @change="onChange" v-model:current="pageParam.current" :total="pageParam.totalRecord"
            :pageSize="pageParam.pageSize" :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`
          " class="mt-2 text-end" />
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
      <p>Địa chỉ :{{ dataId.address }}</p>


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
    const token = JSON.parse(localStorage.getItem("token")); // Lấy token từ localStorage

    const isDrawerVisible = ref(false);
    const pageParam = reactive({
      current: Object.keys(route.query).length > 0 ? route.query.PageNumber : 1,
      pageNumber:
        Object.keys(route.query).length > 0 ? route.query.PageNumber : 1,
      pageSize: Object.keys(route.query).length > 0 ? route.query.PageSize : 10,
      totalRecord: 0,
      userName: Object.keys(route.query).length > 0 ? route.query.UserName : "",
      statusFilter: false,
    });

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
        title: "Tên sản phẩm",
        key: "email2",
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

    const getUsers = (args) => {
      axios
        .get(
          `${apiPrefix}/api/v1/shipper/orderlist/view`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
    const giveOrder = async (orderId) => {
      try {

        const data = await axios.get(
          `${apiPrefix}/api/v1/shipper/changestatus1/${orderId}`
          ,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data)
        window.location.href = "/danh-sach-don-da-nhan";
        message.success("success");
      } catch (e) {
        message.error(e.response.data);
      }
    };
    const doneOrder = async (orderId) => {
      try {
        const data = await axios.get(
          `${apiPrefix}/api/v1/shipper/changestatus2/${orderId}`
          ,
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
