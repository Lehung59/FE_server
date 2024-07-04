<template>
  <a-card style="width: 100%" class="product-detail-card">
    <div class="row">
      <div class="col-md-4 text-center">
        <img :src="product.avatarProduct" alt="Ảnh sản phẩm" class="product-image img-fluid rounded" />
      </div>
      <div class="col-md-8">
        <h2 class="my-3">{{ product.productName }}</h2>
        <p class="mb-3">{{ product.description }}</p>
        <p class="mb-1">
          <strong>Giá:</strong> {{ product?.price?.toLocaleString() }} VND
        </p>
        <p class="mb-1"><strong>Giảm giá:</strong> {{ product.discount }}%</p>
        <p class="mb-1"><strong>Số lượng bán:</strong> {{ product.quantity }}</p>
        <p class="mb-1">
          <strong>Trạng thái: </strong>
          <a-tag :class="getStatusClass(product.status)">
        {{ getStatusText(product.status) }}
        
    </a-tag>
          <!-- <span :class="{
          'text-success': product.status,
          'text-danger': !product.status,
        }">
            {{ product.status ? " Đang bán" : " Ngừng bán" }}
          </span> -->
        </p>
        <p class="mb-1" v-if="product.status === 2"><strong>Lý do bị cấm: </strong><span class="text-danger">{{ product.banReason }}</span></p>

        <p class="mb-1"><strong>Số lượt xem sản phẩm:</strong> {{ product.view }}</p>
        <p class="mb-1">
          <strong>Loại sản phẩm:</strong> {{ product.productType }}
        </p>
        <a-button @click="goBack" class="me-0 me-sm-2 mb-3 mb-sm-0">
          <span>Quay lại</span>
        </a-button>
      </div>
    </div>
  </a-card>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { message,Space, Tag } from "ant-design-vue";

export default defineComponent({
  name: "ProductDetail",
  components: {
    'a-space': Space,
    'a-tag': Tag,
  },

  setup() {
    const product = ref({});
    const route = useRoute();
    const productId = route.params.id;
    const apiPrefix = import.meta.env.VITE_API_PREFIX;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${apiPrefix}/api/v1/product/info/${productId}`
        );
        if (response.data.status === "OK") {
          console.log(response.data);
          product.value = response.data.data;
        } else if (response.data.status === "FAILED") {
          // Hiển thị thông báo lỗi từ response
          message.error(response.data.message);
          console.error(response.data.message);
        } else {
          // Xử lý các trạng thái khác nếu có
          message.error("Unexpected response status");
          console.error("Unexpected response status:", response.data);
        }
      } catch (error) {
        if (error.response) {
          // Lỗi phản hồi từ server
          message.error(error.response.data.message || "Server error occurred");
          console.error(error.response.data);
        } else if (error.request) {
          // Lỗi khi thực hiện yêu cầu
          message.error("No response received from server");
          console.error(error.request);
        } else {
          // Lỗi khác
          message.error(error.message);
          console.error('Error:', error.message);
        }
      }
    };
    
    const getStatusClass = (status)=> {
            if (status === 0) {
                return 'status-stopped';
            } else if (status === 1) {
                return 'status-selling';
            } else if (status === 2) {
                return 'status-locked';
            }
        };
    const getStatusText = (status) => {
            if (status === 0) {
                return 'Ngừng bán';
            } else if (status === 1) {
                return 'Đang bán';
            } else if (status === 2) {
                return 'Bị khóa';
            }
        };
    const goBack = () => {
      // Navigate back to the previous page
      if (history.length > 1) {
        // If there's history available, go back
        history.go(-1);
      } else {
        // Otherwise, fallback to home or another default route
        this.$router.push("/");
      }
    };

    onMounted(() => {
      fetchProduct();
    });

    return {
      product,
      goBack,
      getStatusText,
      getStatusClass
    };
  },
});
</script>
<style scoped>

.status-selling {
    background-color: #56b725;
    /* Màu xanh */
    color: black;
    border-radius: 3px;
    border: 1px solid;
}

.status-stopped {
    background-color: #eaa50f;
    /* Màu đỏ */
    color: black;
    border-radius: 3px;
    border: 1px solid;

}

.status-locked {
    background-color: #f11010;
    /* Màu đỏ */
    color: black;
    border-radius: 3px;
    border: 1px solid;

}

.product-detail-card {
  padding: 20px;
}

.product-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #f0f0f0;
  padding: 10px;
}

.product-detail-card .col-md-8 {
  padding-left: 30px;
}

.product-detail-card h2 {
  font-size: 1.75rem;
}

.product-detail-card p {
  font-size: 1rem;
}
</style>
