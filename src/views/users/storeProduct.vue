<template>
  <a-card style="width: 100%">
      <div class="row mb-3">
          <div class="col-6">
              <a-breadcrumb>
                  <a-breadcrumb-item>Sản phẩm của Cửa hàng</a-breadcrumb-item>
              </a-breadcrumb>
          </div>
          <div class="col-6 d-flex justify-content-end">
              <a-button class="me-2">
                  <router-link :to="{ name: 'product-type/them-moi', params: { id: storeId2 } }">
                      product type
                  </router-link>
              </a-button>
              <a-button type="primary" title="Thêm mới">
                  <router-link :to="{ name: 'product/them-moi', params: { id: storeId2 } }">
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
                      <template v-if="column.key === 'producName'">
                          <span>{{ record.productName }}</span>
                      </template>
                      <template v-if="column.key === 'imageSp'">
                          <img :style="{ width: '50px !important' }" :src="record.avatarProduct"
                              :alt="record.avatarProduct">
                      </template>
                      <template v-if="column.key === 'quantity'">
                          <span>{{ record.quantity }}</span>
                      </template>
                      <template v-if="column.key === 'price'">
                          <span>{{ record.price }}</span>
                      </template>
                      <template v-if="column.key === 'status'">
                          <a-tag :class="record.status ? 'status-selling' : 'status-stopped'">
                              {{ record.status ? 'Đang bán' : 'Ngừng bán' }}
                          </a-tag>
                      </template>
                      <template v-if="column.key === 'action' && authStoreClaim !== null">
                          <a-space warp>
                              <router-link :to="{ name: 'admin-product-edit', params: { id: record.productId } }">
                                  <a-button type="dashed" class="me-2 text-primary" size="small" title="Sửa">
                                      <i class="fa-solid fa-pen-to-square"></i>
                                  </a-button>
                              </router-link>
                          </a-space>
                          <router-link :to="{ name: 'admin-chi-tiet-san-pham', params: { id: record.productId } }">
                              <a-button title="Xem chi tiết" type="dashed" size="small" shape="" class="me-2 text-warning">Xem
                              </a-button>
                          </router-link>
                          <a-popconfirm title="Dữ liệu sẽ không thể phục hồi, bạn muốn xóa bản ghi này?" ok-text="Yes"
                              cancel-text="No" @confirm="confirmRemove(record.productId)">
                              <a-button title="Xóa" type="dashed" size="small" shape="" danger>
                                  <i class="fa-solid fa-trash-can"></i>
                              </a-button>
                          </a-popconfirm>
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
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useAuthStore } from "../../stores/auth.store.js";
import { message } from "ant-design-vue";

export default defineComponent({
setup() {
  const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
  const router = useRouter();
  const route = useRoute();
  const apiPrefix = import.meta.env.VITE_API_PREFIX;
  const token = JSON.parse(localStorage.getItem("token"));
  const storeId2 = ref(route.params.id);
  const users = ref([]);
  const searchKeyword = ref("");
  const pageParam = reactive({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0
  });
  const columns = [
    { title: "#", key: "index" },
    { title: "Tên sản phẩm", dataIndex: "producName", key: "producName" },
    { title: "Ảnh sản phẩm", dataIndex: "imageSp", key: "imageSp" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    { title: "Giá", key: "price" },
    { title: "Trạng thái", key: "status" },
    { title: "Tác vụ", key: "action", fixed: "right" }
  ];
  const fetchProducts = (page, size, keyword = "") => {
    axios
      .get(`${apiPrefix}/api/v1/management/${storeId2.value}/product/view`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, size, keyword }
      })
      .then((response) => {
        const data = response.data;
        users.value = data.data;
        pageParam.totalItems = data.pagination.totalItems;
        pageParam.totalPages = data.pagination.totalPages;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const confirmRemove = (id) => {
    axios
      .get(`${apiPrefix}/api/v1/management/${storeId2.value}/product/delete?productId=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        message.success("Xóa thành công!");
        fetchProducts(pageParam.currentPage, pageParam.pageSize, searchKeyword.value);
      })
      .catch((error) => {
        message.error("Xóa không thành công!");
        console.error(error);
      });
  };
  const onChange = (page, pageSize) => {
    pageParam.currentPage = page;
    pageParam.pageSize = pageSize;
    fetchProducts(page, pageSize, searchKeyword.value);
  };
  const onSearch = () => {
    pageParam.currentPage = 1;
    fetchProducts(pageParam.currentPage, pageParam.pageSize, searchKeyword.value);
  };
  onMounted(() => {
    fetchProducts(pageParam.currentPage, pageParam.pageSize);
  });
  return {
    authStoreClaim,
    users,
    columns,
    pageParam,
    storeId2,
    searchKeyword,
    onChange,
    onSearch,
    confirmRemove
  };
}
});
</script>



<style scoped>
.status-selling {
    background-color: #56b725; /* Màu xanh */
    color: black;
    border-radius: 3px;
    border: 1px solid;
}

.status-stopped {
    background-color: #f5222d; /* Màu đỏ */
    color: black;
    border-radius: 3px;
    border: 1px solid;

}
</style>

