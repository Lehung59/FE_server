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
              Loại sản phẩm
          
          </a-breadcrumb-item>
          <a-breadcrumb-item>Thêm mới</a-breadcrumb-item>
        </a-breadcrumb>
        <h1></h1>
      </div>
      <div class="col-12 col-sm-12 mb-3">
        <!-- @submit.prevent="createUsers()" -->
        <a-form
          class="p-3"
          name="custom-validation"
          ref="formRef"
          :model="formState"
          :rules="rules"
          v-bind="layout"
          @finish="createUsers()"
        >
          <div class="row">
            <div class="col-12 col-sm-9">
              <a-form-item ref="productType" label="Loại sản phẩm" required name="productType">
                <a-input v-model:value="formState.productType" />
                <small v-if="errors && errors.productType" class="text-danger">{{ errors.productType[0] }}</small>
              </a-form-item>

              <a-form-item label="Hình ảnh">
                <input type="file" @change="previewFiles" />
                <div class="avatar-container">
                  <img v-if="newImage" :src="newImage" class="avatar" alt="avatar" />
                </div>
              </a-form-item>
<!-- 
              <a-form-item ref="fullName" label="avatar" name="fullName">
                <input type="file" @change="handleFileUpload" />
                <small v-if="errors && errors.FullName" class="text-danger">{{
                  errors.FullName[0]
                }}</small>
              </a-form-item> -->
              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button @click="goBack" class="me-0 me-sm-2 mb-3 mb-sm-0">
                    <span>Quay lại</span>
                </a-button>
                <a-button
                  class="me-0 me-sm-2 mb-3 mb-sm-0 bg-info text-light"
                  @click="resetForm"
                  >Reset</a-button
                >
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
import { message } from "ant-design-vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useMenu } from "../../stores/use-menu.js";
import BaseCommon from "../../api/BaseCommon.js";
import ApiUser from "../../api/ApiUser.js";
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";

export default defineComponent({
  components: {
    DeleteOutlined,
  },
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const router = useRouter();
    const token = JSON.parse(localStorage.getItem("token")); // Lấy token từ localStorage
    const users = reactive({
      optionsLevelManage: [],
      optionsRole: [],
      optionsStatus: [],
    });
    const errors = ref({});
    const formRef = ref();
    const route = useRoute();
    let productTypeId;

    const id = route.params.id;
    const formState = reactive({
      producttypeName: "",
      loading: false,
      avatarFile: null,
      avatarProduct: "",
      productType: "",


    });
    const fileAvatar = ref(null);


    const rules = {
      productType: [
        {
          required: true,
          message: "không để trống.",
          trigger: "change",
        },
      ],
      fullName: [
        {
          required: false,
          message: " không để trống.",
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
      formRef.value.resetFields();
    };
    //

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



    //
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      formState.avatarFile = file; // Store the file object in formState
    };

    const avatarFile = ref(null); // Store the file object
    const newImage = ref('');



    const createUsers = () => {
      const formData = new FormData();
      formState.loading = true;
      formData.append("name", formState.productType);
      formData.append("avatar", newImage); // avatarFile will hold the file object
      axios
        .post(
           `${apiPrefix}/api/v1/management/${id}/producttype/insert`,
          formData,
          {
            headers: {

              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,

            },
          }
        )
        .then((response) => {
          formState.loading = false;
          message.success("Tạo mới thành công!");
          router.push({
            name: "ProductByStore",
            params: {
              id: id,
            },
          });
        })
        .catch((error) => {
          formState.loading = false;
          if (error.response && error.response.data) {
          // Xử lý khi có lỗi từ phản hồi của API
          console.error('Lỗi khi gọi API:', error.response.data.message);
          message.error(error.response.data.message);
        } else {

          // Xử lý khi có lỗi khác, chẳng hạn mạng chập chờn
          console.error('Đã xảy ra lỗi:', error.message);
          message.error('Đã xảy ra lỗi');
        }
        });
    };
    onMounted(() => {
      //

      resetForm();

    });
    const handleChangeUpload = (e) => {
      var p = BaseCommon.GetBase64(e.target.files[0]);
      console.log(e.target.files[0], "e.target.files[0]");
      p.then((value) => {
        formState.urlAvatar = value;
        formState.rmavatar = "no";
      }).catch((err) => {
        console.log(err); 
      });
    };
    const handleRemoveAvatar = () => {
      formState.urlAvatar = null;
      formState.rmavatar = "yes";
    };
    //
    return {
      ...toRefs(users),
      authStoreClaim,
      errors,
      formState,
      fileAvatar,
      formRef,
      rules,
      newImage,
      layout,
      resetForm,
      previewFiles,
      //
      handleFileUpload,
      users,
      createUsers,
      // preview
      handleChangeUpload,
      handleRemoveAvatar,
      goBack
    };
  },
});
</script>
<style scoped>

.avatar {
  width: 200px;
  height: 200px;
  border: 1px solid #cbcbcb;
  margin-top: 10px;
}
</style>