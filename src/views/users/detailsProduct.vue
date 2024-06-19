<template>
  <a-card style="width: 100%" class="product-detail-card">
    <div class="row">
      <div class="col-md-4 text-center">
        <img
          :src="product.avatarProduct"
          alt="Product Image"
          class="product-image img-fluid rounded"
        />
      </div>
      <div class="col-md-8">
        <h2 class="my-3">{{ product.productName }}</h2>
        <p class="mb-3">{{ product.description }}</p>
        <p class="mb-1">
          <strong>Price:</strong> {{ product?.price?.toLocaleString() }} VND
        </p>
        <p class="mb-1"><strong>Discount:</strong> {{ product.discount }}%</p>
        <p class="mb-1"><strong>Quantity:</strong> {{ product.quantity }}</p>
        <p class="mb-1">
          <strong>Status:</strong>
          <span
            :class="{
              'text-success': product.status,
              'text-danger': !product.status,
            }"
          >
            {{ product.status ? " Đang bán" : " Ngừng bán" }}
          </span>
        </p>
        <p class="mb-1"><strong>Views:</strong> {{ product.view }}</p>
        <p class="mb-1"><strong>Store Name:</strong> {{ product.storeName }}</p>
        <p class="mb-1">
          <strong>Product Type:</strong> {{ product.productType }}
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

export default defineComponent({
  name: "ProductDetail",

  setup() {
    const product = ref({});
    const route = useRoute();
    const productId = route.params.id;
    const apiPrefix = import.meta.env.VITE_API_PREFIX;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          ` ${apiPrefix}/api/v1/product/info/${productId}`
        );
        if (response.data.status === "OK") {
          console.log(response.data)
          product.value = response.data.data;
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
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
    };
  },
});
</script>
<style scoped>
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
