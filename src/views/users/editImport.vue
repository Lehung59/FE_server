<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-12">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <router-link :to="{ name: 'admin-dashboards' }"
              >Trang chủ</router-link
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link :to="{ name: 'admin-users' }">Product</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>sửa</a-breadcrumb-item>
        </a-breadcrumb>
        <h1>Sửa sản phẩm</h1>
      </div>
      <div class="col-12 col-sm-12 mb-3">
        <a-form
          class="p-3"
          name="custom-validation"
          ref="formRef"
          :model="formState"
          :rules="rules"
          v-bind="layout"
          @finish="createUsers"
        >
          <div class="row">
            <div class="col-12">
              <a-form-item
                ref="productName"
                label="Số lượng"
                required
                name="productName"
              >
                <a-input v-model:value="formState.productName" />
                <small
                  v-if="errors && errors.productName"
                  class="text-danger"
                  >{{ errors.productName[0] }}</small
                >
              </a-form-item>
              <a-form-item ref="price" label="Giá" required name="price">
                <a-input v-model:value="formState.price" />
                <small v-if="errors && errors.price" class="text-danger">{{
                  errors.price[0]
                }}</small>
              </a-form-item>

              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
                  <router-link :to="{ name: 'admin-users' }">
                    <span>Quay lại</span>
                  </router-link>
                </a-button>
                <a-button
                  class="me-0 me-sm-2 mb-3 mb-sm-0 bg-info text-light"
                  @click="resetForm"
                  >Reset</a-button
                >
                <a-button type="primary" html-type="submit" class="bg-success"
                  >Lưu</a-button
                >
              </a-form-item>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </a-card>
</template>

<script>
import { onMounted, defineComponent, ref, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useMenu } from "../../stores/use-menu.js";
import axios from "axios";

export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const router = useRouter();
    const route = useRoute();
    const productId = route.params.id;
    const formRef = ref();
    const errors = ref({});
    const product = ref();
    const id = route.params.id;
    const formState = ref({
      productName: "",
      price: "",
    });

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
      productType: [
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

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      formState.avatarFile = file;
    };

    // const fetchProduct = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://charismatic-friendship-production.up.railway.app/api/v1/product/info/${productId}`
    //     );
    //     console.log(response.data.data, "response");
    //     const data = response.data.data;
    //     formState.productName = data.productName;
    //     formState.price = data.price;
    //     formState.description = data.description;
    //     formState.productType = data.productType;
    //     formState.avatarProduct = data.avatarProduct;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    const createUsers = () => {
      const formData = new FormData();
      formData.append("quantity", formState.value.productName);
      formData.append("price", formState.value.price);
      axios
        .put(
          `https://charismatic-friendship-production.up.railway.app/api/v1/management/1/import/edit/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          message.success("sửa thành công!");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // onMounted(() => {
    //   fetchProduct();
    // });

    return {
      ...toRefs(formState),
      errors,
      formRef,
      rules,
      layout,
      formState,
      resetForm,
      handleFileUpload,
      createUsers,
    };
  },
});
</script>
<style scoped>
.product-detail-card {
  padding: 20px;
}
</style>
