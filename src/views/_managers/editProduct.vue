<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-12">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item @click="navigateToProduct" style="cursor: pointer;">
  Sản phẩm
</a-breadcrumb-item>
          <a-breadcrumb-item>sửa</a-breadcrumb-item>
        </a-breadcrumb>
        <h1>Sửa sản phẩm</h1>
      </div>
      <div class="col-12 col-sm-12 mb-3">
        <a-form class="p-3" name="custom-validation" ref="formRef" :model="formState" :rules="rules" v-bind="layout"
          @finish="createUsers">
          <div class="row">
            <div class="col-12">
              <a-form-item ref="productName" label="Tên sản phẩm" required name="productName">
                <a-input v-model:value="formState.productName" />
                <small v-if="errors && errors.productName" class="text-danger">{{ errors.productName[0] }}</small>
              </a-form-item>
              <a-form-item ref="price" label="Giá" required name="price">
                <a-input v-model:value="formState.price" />
                <small v-if="errors && errors.price" class="text-danger">{{
              errors.price[0]
            }}</small>
              </a-form-item>

              <a-form-item ref="discount" label="Giảm giá" required name="discount">
                <a-input v-model:value="formState.discount" />
                <small v-if="errors && errors.discount" class="text-danger">{{
              errors.discount[0]
            }}</small>
              </a-form-item>

              <a-form-item ref="quantity" label="Số lượng đăng bán" required name="quantity">
                <a-input v-model:value="formState.quantity" />
                <small v-if="errors && errors.quantity" class="text-danger">{{
              errors.quantity[0]
            }}</small>
              </a-form-item>

              <a-form-item ref="status" label="Trạng thái" name="status">
          <a-switch v-model:checked="isSelling" checked-children="Đang bán" un-checked-children="Ngừng bán" />
          <small v-if="errors && errors.status" class="text-danger">{{ errors.status[0] }}</small>
        </a-form-item>

              <a-form-item ref="description" label="Mô tả" required name="description">
                <a-textarea v-model:value="formState.description" />
                <small v-if="errors && errors.description" class="text-danger">{{ errors.description[0] }}</small>
              </a-form-item>


              <a-form-item ref="productTypeId" label="Loại sản phẩm" name="productTypeId">
          <a-select v-model:value="formState.productTypeId" style="width: 100%" placeholder="Chọn loại sản phẩm"
            @change="handleChange">
            <a-select-option v-for="typee in productTypes" :key="typee.productTypeId"
              :value="typee.productTypeId">
              {{ typee.productTypeName }}
            </a-select-option>
          </a-select>
        </a-form-item>


              <a-form-item label="Ảnh đại diện mới">
                <input type="file" @change="previewFiles" />
                <div class="avatar-container">
                  <img v-if="newImage" :src="newImage" class="avatar" alt="avatar" />
                  <img v-else :src="formState.avatarProduct" class="avatar" alt="avatar" />
                </div>
              </a-form-item>

              <!-- <a-form-item
                ref="avatarProduct"
                label="Ảnh sản phẩm"
                name="avatarProduct"
              >
                <input type="file" @change="handleFileUpload" />
                <small
                  v-if="errors && errors.avatarProduct"
                  class="text-danger"
                  >{{ errors.avatarProduct[0] }}</small
                >
              </a-form-item> -->
              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">

                <a-button @click="goBack" class="me-0 me-sm-2 mb-3 mb-sm-0">
                  <span>Quay lại</span>
                </a-button>

                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0 bg-info text-light" @click="resetForm">Reset</a-button>
                <a-button type="primary" html-type="submit" class="bg-success" :loading=formState.loading>Lưu</a-button>
              </a-form-item>
            </div>
          </div>
        </a-form>

      </div>
    </div>
  </a-card>
</template>

<script>
import { onMounted, defineComponent, ref, reactive, toRefs,watch  } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useMenu } from "../../stores/use-menu.js";
import axios from "axios";

export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const router = useRouter();
    const route = useRoute();
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const productId = route.params.id;
    const formRef = ref();
    const errors = ref({});
    const token = JSON.parse(localStorage.getItem("token")); // Lấy token từ localStorage
    const auth = JSON.parse(localStorage.getItem("auth")); 

    let storeId;
    let productTypeId;
    const product = ref();
    const formState = reactive({
      productName: "",
      price: "",
      description: "",
      productType: "",

      productTypeId: "",
      productTypeName: '',
      status: 0,
      avatarProduct: "",
      avatarFile: null,
      discount: "",
      quantity: "",
      loading: false,

    });
    const isSelling = ref(false);

    watch(isSelling, (newVal) => {
      formState.status = newVal ? 1 : 0;
    });

    const productTypes = ref([]);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      this.formState.avatarFile = file; // Store the file object in formState
    };

    const avatarFile = ref(null); // Store the file object
    const newImage = ref(''); // Store the base64 URL
    const rules = {
      productName: [
        {
          required: true,
          message: "Tên sản phẩm không để trống.",
          trigger: "change",
        },
      ],
      price: [
        {
          required: true,
          message: "Giá không để trống.",
          trigger: "change",
        },
      ],
      description: [
        {
          required: true,
          message: "Mô tả không để trống.",
          trigger: "change",
        },
      ],
      productTypeId: [
        {
          required: true,
          message: "Loại sản phẩm không để trống.",
          trigger: "change",
        },
      ],
    };

    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const handleChange = (value) => {
      console.log('Selected productTypeName:', value);
      console.log('formState.productTypeName:', this.formState.productTypeId);
    }

    const resetForm = () => {
      formRef.value.resetFields();
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

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${apiPrefix}/api/v1/product/info/${productId}`
        );
        console.log(response.data.data, "response");
        const data = response.data.data;
        storeId = data.storeId;
        formState.productName = data.productName;
        formState.price = data.price;
        formState.quantity = data.quantity;
        formState.discount = data.discount;
        formState.status = data.status;
        isSelling.value = data.status === 1;

        formState.description = data.description;
        formState.productTypeId = data.productTypeId;
        formState.avatarProduct = data.avatarProduct;
        formState.loading = false
      } catch (error) {
        console.error(error);
      }
      try {

        const response = await axios.get(
          `${apiPrefix}/api/v1/management/${storeId}/producttype/view`,
          {
            headers: {

              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,

            },
          });
        if (response.data.status === "OK") {
          console.log(response.data)
          productTypes.value = response.data.data;
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }

    };
    const navigateToProduct = () => {

router.push({ name: "ProductByStore", params: { id: auth.storeId } });
}
    const previewFiles = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        newImage.value = reader.result; // Set the base64 string for preview
        avatarFile.value = file; // Store the file object for submission
      };
      reader.readAsDataURL(file);
    };

    const createUsers = async () => {
      const formData = new FormData();
      formState.loading = true;
      try {
        if (productId) {
          formData.append("productId", productId);
        } else {
          throw new Error("Product ID is missing");
        }

        if (formState.price) {
          formData.append("price", formState.price);
        } else {
          throw new Error("Price is missing");
        }

        if (formState.productName) {
          formData.append("name", formState.productName);
        } else {
          throw new Error("Product Name is missing");
        }
        formData.append("discount", formState.discount);
        formData.append("quantity", formState.quantity);


        if (formState.description) {
          formData.append("description", formState.description);
        } else {
          throw new Error("Description is missing");
        }

        formData.append("productType", formState.productTypeId);


        if (avatarFile.value) {
          formData.append('avatar', avatarFile.value);
        } else {
          formData.append('avatar', formState.avatarProduct);
        }
        formData.append("status", isSelling.value);

        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        const response = await axios.put(
          `${apiPrefix}/api/v1/management/${storeId}/product/edit`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        message.success("Sửa thành công!");
        formState.loading = false;
        router.push({ name: "ProductByStore", params: { id: storeId } });
      } catch (error) {
        console.error("Error during form submission:", error);
        message.error(error.response.data.message);
      } finally {
        formState.loading = false; // Tắt trạng thái chờ khi hoàn thành
      }
    };

    onMounted(() => {
      fetchProduct();
    });

    return {
      ...toRefs(formState),
      errors,
      isSelling,
      route,
      router,
      formRef,
      rules,
      layout,
      formState,
      resetForm,
      createUsers,
      previewFiles,
      productTypes,
      handleChange,
      navigateToProduct,
      goBack,
      newImage,
      handleFileUpload
    };
  },
});
</script>
<style scoped>
.product-detail-card {
  padding: 20px;
}

.avatar {
  width: 200px;
  height: 200px;
  border: 1px solid #cbcbcb;
  margin-top: 10px;
}
</style>