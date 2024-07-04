<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-12">
        <a-breadcrumb>
          <a-breadcrumb-item style="cursor: pointer; text-decoration: none;">
            <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item @click="navigateToProduct" style="cursor: pointer;">
  Sản phẩm
</a-breadcrumb-item>
          <a-breadcrumb-item>Thêm mới</a-breadcrumb-item>
        </a-breadcrumb>
        <h1></h1>
      </div>
      <div class="col-12 col-sm-12 mb-3">
        <!-- @submit.prevent="createUsers()" -->
        <a-form class="p-3" name="custom-validation" ref="formRef" :model="formState" :rules="rules" v-bind="layout"
          @finish="createUsers()">
          <div class="row">
            <div class="col-12 ">
              <a-form-item ref="productName" label="Tên sản phẩm" required name="productName">
                <a-input v-model:value="formState.productName" />
                <small v-if="errors && errors.price" class="text-danger">{{ errors.price[0] }}</small>
              </a-form-item>
              <a-form-item ref="price" label="Giá bán" required name="price">
                <a-input v-model:value="formState.price"
                  v-rules="[{ required: true, message: 'Giá bán là bắt buộc' }, { pattern: /^\d+$/, message: 'Chỉ được nhập số' }]" />
                <small v-if="errors && errors.price" class="text-danger">{{ errors.price[0] }}</small>
              </a-form-item>
              <a-form-item ref="description" label="Mô tả" required name="description">
                <a-input v-model:value="formState.description" />
                <small v-if="errors && errors.description" class="text-danger">{{ errors.description[0] }}</small>
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



              <a-form-item label="Ảnh đại diện mới">
                <input type="file" @change="previewFiles" />
                <div class="avatar-container">
                  <img v-if="newImage" :src="newImage" class="avatar" alt="avatar" />
                </div>
              </a-form-item>



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
import { onMounted, defineComponent, ref, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from 'ant-design-vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { useMenu } from "../../stores/use-menu.js";
import ApiViewData from '../../api/ApiViewData.js';
import BaseCommon from '../../api/BaseCommon.js';
import ApiUser from '../../api/ApiUser.js';
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";

export default defineComponent({
  components: {
    DeleteOutlined
  },
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const router = useRouter();
    const users = reactive({
      optionsLevelManage: [],
      optionsRole: [],
      optionsStatus: [],
    });
    const errors = ref({});
    const formRef = ref();
    const route = useRoute();
    const token = JSON.parse(localStorage.getItem("token"));
    const auth = JSON.parse(localStorage.getItem("auth"));

     // Lấy token từ localStorage

    const id = route.params.id
    const formState = reactive({
      productTypeId: "",

      productName: '',
      fullName: '',
      price: '',
      description: '',
      producttypename: '',
      productTypeName: '',

      avatar: '',
      avatarFile: null,
      loading: false,
    });
    const productTypes = ref([]);

    const avatarFile = ref(null); // Store the file object
    const newImage = ref('');

    const fileAvatar = ref(null)
    const handleChange = (value) => {
      console.log('Selected productTypeName:', value);
      console.log('formState.productTypeName:', this.formState.productTypeName);
    }
    const rules = {
      productName: [
        {
          required: true,
          message: 'Tên sản phẩm không để trống.',
          trigger: 'change',
        }
      ],
      description: [
        {
          required: true,
          message: 'Mô tả không để trống.',
          trigger: 'change',
        }
      ],
      productTypeName: [
        {
          required: true,
          message: 'Loại sản phẩm không để trống.',
          trigger: 'change',
        }
      ],


      price: [
        {
          required: true,
          message: 'Giá bán là bắt buộc.',
          trigger: 'change',
        },
        {
          pattern: /^\d+$/,
          message: 'Chỉ được nhập số.',
          trigger: 'change',
        }
      ]

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
    const getOptionsLevelManage = () => {
      ApiViewData.GetOptionsLevelManage().then((response) => {
        users.optionsLevelManage = response.data;
        formState.levelManage = response.data[0].value;
      })
        .catch((error) => {
          console.log(error);
        });
    };
    const navigateToProduct = () => {

      router.push({ name: "ProductByStore", params: { id: auth.storeId } });
    }

    const filterOptionLevelManage = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const getOptionsRole = () => {
      ApiViewData.GetOptionsRole().then((response) => {
        users.optionsRole = response.data;
        formState.roleID = response.data[0].value;
      })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionRole = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const getOptionsStatus = () => {
      ApiViewData.GetOptionsStatus().then((response) => {
        users.optionsStatus = response.data;
        formState.status = response.data[0].value;
      })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionStatus = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    //
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      formState.avatarFile = file;
    }
    const createUsers = () => {
      const formData = new FormData();
      formState.loading = true;

      try {
        formData.append("producttypename", formState.productTypeName);

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
        if (formState.description) {
          formData.append("description", formState.description);
        } else {
          throw new Error("Description is missing");
        }

        if (avatarFile.value) {
          formData.append('avatar', avatarFile.value);
        }

        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }




        axios.post(`${apiPrefix}/api/v1/management/${id}/product/insert`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          }
        })
          .then((response) => {
            if (response.data.status === "OK") {
              message.success("Tạo mới thành công!");
              router.push({ name: "ProductByStore", params: { id: id } });
            }
            else if (response.data.status === "FAILED") {
        message.error(response.data.message || "Có lỗi xảy ra, vui lòng thử lại.");
      }

          })
          .catch((error) => {
            message.error(error.response.data.message);
          });


      } catch (error) {

      } finally {
        formState.loading = false; // Tắt trạng thái chờ khi hoàn thành
      }




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


    onMounted(() => {
      //
      resetForm();
      fetchProduct();

    })
    const handleChangeUpload = (e) => {
      var p = BaseCommon.GetBase64(e.target.files[0]);
      p.then(value => {
        formState.urlAvatar = value;
        formState.rmavatar = 'no';
      }).catch(err => {
        console.log(err); // 👉️ "Something went wrong"
      });
    }
    const handleRemoveAvatar = () => {
      formState.urlAvatar = null;
      formState.rmavatar = 'yes';
    }
    //
    return {
      ...toRefs(users),
      authStoreClaim,
      errors,
      formState,
      fileAvatar,
      formRef,
      rules,
      layout,
      resetForm,
      productTypes,
      handleChange,
      navigateToProduct,

      handleFileUpload,
      getOptionsLevelManage,
      getOptionsStatus,
      getOptionsRole,
      filterOptionLevelManage,
      filterOptionRole,
      filterOptionStatus,
      users,
      createUsers,
      // preview
      handleChangeUpload,
      handleRemoveAvatar,
      goBack,
      newImage,
      previewFiles
    };
  },
});
</script>
<style>
.avatar {
  width: 200px;
  height: 200px;
  border: 1px solid #cbcbcb;
  margin-top: 10px;
}
</style>