<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-12">
        <a-breadcrumb>
          <a-breadcrumb-item>
            Trang chủ
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            Hóa đơn
          </a-breadcrumb-item>
          <a-breadcrumb-item>Thêm mới</a-breadcrumb-item>
        </a-breadcrumb>
        <h1></h1>
      </div>
      <div class="">
        <!-- @submit.prevent="createUsers()" -->
        <a-form class="p-3" name="custom-validation" ref="formRef" :model="formState" :rules="rules" v-bind="layout"
          @finish="createUsers()">
          <div class="">
            <div class="">





              <a-form-item ref="ProductName" label="Tên sản phẩm" required name="ProductName">
                <a-auto-complete
    v-model:value="formState.ProductName"
    :options="autoCompleteOptions"
    placeholder="input here"
    :filter-option="filterOption"
  />


                <!-- <a-input v-model:value="formState.userName" />
                <small v-if="errors && errors.UserName" class="text-danger">{{ errors.UserName[0] }}</small> -->
              </a-form-item>
              <a-form-item ref="ImportPrice" label="Giá nhập" required name="ImportPrice">
                <a-input v-model:value="formState.ImportPrice" />
                <small v-if="errors && errors.FullName" class="text-danger">{{ errors.FullName[0] }}</small>
              </a-form-item>

              <a-form-item ref="quantity" label="Số lượng nhập" required name="quantity">
                <a-input v-model:value="formState.quantity" />
                <small v-if="errors && errors.quantity" class="text-danger">{{ errors.quantity[0] }}</small>
              </a-form-item>

              <a-form-item ref="priceOut" label="Giá bán" required name="priceOut">
                <a-input v-model:value="formState.priceOut" />
                <small v-if="errors && errors.priceOut" class="text-danger">{{ errors.priceOut[0] }}</small>
              </a-form-item>

              <a-form-item ref="productTypeName" label="Loại sản phẩm" required name="productTypeName">
                <a-select v-model:value="formState.productTypeName" style="width: 100%" placeholder="Chọn loại sản phẩm"
                  @change="handleChange">
                  <a-select-option v-for="typee in productTypes" :key="typee.productTypeName"
                    :value="typee.productTypeName">
                    {{ typee.productTypeName }}
                  </a-select-option>
                </a-select>
              </a-form-item>


              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button @click="goBack" class="me-0 me-sm-2 mb-3 mb-sm-0">
                  <span>Quay lại</span>
                </a-button>
                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0 bg-info text-light" @click="resetForm">Reset</a-button>
                <a-button type="primary" html-type="submit" class="bg-success">Lưu</a-button>
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
import { message, InputNumber ,Button, AutoComplete } from 'ant-design-vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { useMenu } from "../../stores/use-menu.js";
import ApiViewData from '../../api/ApiViewData.js';
import BaseCommon from '../../api/BaseCommon.js';
import ApiUser from '../../api/ApiUser.js';
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";

export default defineComponent({
  components: {
    DeleteOutlined,
    'a-input-number': InputNumber,
    'a-button': Button,
    'a-auto-complete': AutoComplete
  },
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
    const token = JSON.parse(localStorage.getItem("token")); // Lấy token từ localStorage

    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const router = useRouter();
    const users = reactive({
      optionsLevelManage: [],
      optionsRole: [],
      optionsStatus: [],
    });
    const errors = ref({});
    const formRef = ref();
    const route = useRoute()
    const id = route.params.id
    const formState = reactive({
      productTypeId: "",
      ProductName: '',
      ImportPrice: '',
      email: '',
      passWord: '',
      quantity: '',
      priceOut: '',
      roleID: '',
      status: '',
      productTypeName: '',
      fileAvatar: null,
      rmavatar: "yes",
      //
      change_password: false,
    });

    const filterOption = (input, option) => {
  return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
};
const value = ref('');
const autoCompleteOptions = ref([]);

    const productTypes = ref([]);

    const fileAvatar = ref(null)
    const rules = {
    };
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
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
    const resetForm = () => {
      // axios.post( `${apiPrefix}/api/v1/management/${id}/productType/view`, formData).then((response) => {
      //   message.success("Tạo mới thành công!");
      //   router.push({ name: "importExport", params: { id: id } });
      // }).catch((error) => {
      //   console.log(error)
      // })
      formRef.value.resetFields();
    };
    const fetchProducts = (page = 1, size = 1000, keyword = "" ,productTypeName = "") => {
            axios
                .get(`${apiPrefix}/api/v1/management/${id}/product/view`, {
                  params: { page, size, keyword,productTypeName },
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                  const data = response.data.data;
                  autoCompleteOptions.value = data.map(product => ({ value: product.productName }));
                })
                .catch((error) => {
                    console.error(error);
                });
        };

    const handleChange = (value) => {
      console.log('Selected productTypeName:', value);
      console.log('formState.productTypeName:', this.formState.productTypeName);
    }

    const fetchProduct = async () => {
      try {

        const response = await axios.get(
          `${apiPrefix}/api/v1/management/${id}/producttype/view`,
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




    //

    //
    const createUsers = () => {
      const newDataPost = {
        productname: formState.ProductName,
        priceIn: formState.ImportPrice,
        quantity: formState.quantity,
        priceOut: formState.priceOut,
        productTypename: formState.productTypename
      }
      const formData = new FormData();
      formData.append("productname", formState.ProductName);
      formData.append("priceIn", formState.ImportPrice);
      formData.append("quantity", formState.quantity);
      formData.append("priceOut", formState.priceOut);
      formData.append("producttypename", formState.productTypeName);




      axios.post(`${apiPrefix}/api/v1/management/${id}/import/insert`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          message.success("Tạo mới thành công!");
          router.push({ name: "importExport", params: { id: id } });
        }).catch((error) => {
          console.log(error)
        })
    }
    onMounted(() => {
      //
      // resetForm();
      fetchProduct();
      fetchProducts();

    })


    //
    return {
      ...toRefs(users),
      authStoreClaim,
      filterOption,
      errors,
      formState,
      autoCompleteOptions,
      fileAvatar,
      productTypes,
      formRef,
      rules,
      layout,
      resetForm,
      //
      users,
      createUsers,
      handleChange,
      goBack
      // preview
    };
  },
});
</script>