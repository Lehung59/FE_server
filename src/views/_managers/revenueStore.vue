<template>
  <div class="mui-card">

    <div class="mui-card-content">
      <div class="">
        <Table1 />
      </div>
      <div class="">
        <Table2 />
      </div>      
      <div class="mui-stack vertical">


        <div class="mui-stack horizontal">

          <div class="mui-stack vertical">
            <span class="mui-typography overline">Doanh thu cửa hàng </span>
            <h4 class="mui-typography h4">
              {{ users?.toLocaleString() }} VNĐ
            </h4>
          </div>




          <div class="mui-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"
              class="icon-lg">
              <path
                d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z">
              </path>
            </svg>
          </div>
        </div>
        <div class="mui-stack horizontal">
          <div class="mui-stack vertical">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="var(--mui-palette-success-main)"
              viewBox="0 0 256 256" class="icon-md">
              <path
                d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z">
              </path>
            </svg>
            <p class="mui-typography body2">12%</p>
          </div>
          <span class="mui-typography caption">Since last month</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { useMenu } from "../../stores/use-menu.js";
import { onUpdated, onMounted } from 'vue'
import ApiViewData from '../../api/ApiViewData.js';
import ApiUser from '../../api/ApiUser.js';
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";
import Table1 from "../../components/CChartDoughnutExample.vue"
import Table2 from "../../components/DashBoard.vue"
export default defineComponent({

  components: {
    Table2,
    Table1,
  },
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const router = useRouter();
    const route = useRoute();
    const errors = ref([]);
    const users = ref(null);
    console.log(users, 'users')
    const storeId2 = ref(route.params.id);


    const pageParam = reactive({
      current: (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1,
      pageNumber: (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1,
      pageSize: (Object.keys(route.query).length > 0) ? route.query.PageSize : 10,
      totalRecord: 0,
      userName: (Object.keys(route.query).length > 0) ? route.query.UserName : '',
      statusFilter: false
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
        title: "Tên sản phẩm",
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: "Giá",
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
      axios.get(`${apiPrefix}/api/v1/management/store/revenue?storeid=${storeId2._value}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
      }).then((response) => {
        console.log(response.data.data, 'response')
        users.value = response.data.data;
      }).catch((error) => {
        console.error(error)
      })
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
          if (error.response.data.hasOwnProperty('errors')) {
            errors.value = error.response.data.errors;
          } else {
            errors.value = error.response.data;
          }
        });
    };
    const confirmBanned = (id) => {
      ApiUser.BannedById(id).then((response) => {
        if (response.status == 200) {
          message.success("Khóa thành công!");
        } else {
          message.error("Lỗi! Tác vụ thực hiện không thành công.");
        }
        getUsers(pageParam);
      })
        .catch((error) => {
          message.error(error.message);
          if (error.response.data.hasOwnProperty('errors')) {
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
        pageParam.current = (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1;
        pageParam.pageNumber = (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1;
        pageParam.pageSize = (Object.keys(route.query).length > 0) ? route.query.PageSize : 10;
        pageParam.userName = (Object.keys(route.query).length > 0) ? route.query.UserName : '';
        pageParam.statusFilter = true;
        getUsers(pageParam);
      }
    })
    onMounted(() => {
      // chay lan dau tien
      getUsers(pageParam);
    })
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
    }
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
      confirmBanned
    };
    //
  }
});
</script>

<style scoped>
.mui-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
  padding: 16px;
  margin: 16px;
}

.mui-card-content {
  padding: 16px;
}

.mui-stack {
  display: flex;
}

.mui-stack.vertical {
  flex-direction: column;
}

.mui-stack.horizontal {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.mui-typography {
  margin: 0;
}

.mui-typography.overline {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.6);
}

.mui-typography.h4 {
  font-size: 2rem;
  font-weight: 400;
  margin: 4px 0 0 0;
}

.mui-typography.body2 {
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
}

.mui-typography.caption {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
}

.mui-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-lg {
  font-size: 2rem;
}

.icon-md {
  font-size: 1.5rem;
}
</style>