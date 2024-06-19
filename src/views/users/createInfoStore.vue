<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-12">
        <h1>Hãy bắt đầu tạo thông tin về cửa hàng của bạn</h1>
      </div>
      <div class="col-12 col-sm-12 mb-3">
        <!-- @submit.prevent="createUsers()" -->
        <a-form class="p-3" name="custom-validation" ref="formRef" :model="formState" :rules="rules" v-bind="layout"
          @finish="createUsers()">
          <div class="row">
            <div class="col-12 col-sm-9">
              <a-form-item ref="name" label="Tên cửa hàng" required name="name">
                <a-input v-model:value="formState.name" />
                <small v-if="errors && errors.name" class="text-danger">{{
              errors.name[0]
            }}</small>
              </a-form-item>

              <a-form-item ref="address" label="Địa chỉ" required name="address">
                <a-input v-model:value="formState.address" />
                <small v-if="errors && errors.address" class="text-danger">{{
              errors.UserName[0]
            }}</small>
              </a-form-item>

              <a-form-item ref="phonenumber" label="Số điện thoại" required name="phonenumber">
                <a-input v-model:value="formState.phonenumber" />
                <small v-if="errors && errors.phonenumber" class="text-danger">{{
              errors.phonenumber[0]
            }}</small>
              </a-form-item>



              <a-form-item ref="storeTypeId" label="Loại cửa hàng" required name="storeTypeId">
                <a-select v-model:value="formState.storeTypeId" style="width: 100%" placeholder="Chọn loại cửa hàng"
                  @change="handleChange">
                  <a-select-option v-for="typee in storeTypes" :key="typee.storeTypeId" :value="typee.storeTypeId">
                    {{ typee.storeTypeName }}
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
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useMenu } from "../../stores/use-menu.js";
import ApiViewData from "../../api/ApiViewData.js";
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
    console.log(apiPrefix)
    const router = useRouter();
    const token = JSON.parse(localStorage.getItem("token")); // Lấy token từ localStorage
    const users = reactive({
      optionsLevelManage: [],
      optionsRole: [],
      optionsStatus: [],
    });
    const errors = ref({});
    const formRef = ref();
    const formState = reactive({

      storeTypeId: "",
      address: "",
      phonenumber: "",
      name: "",
      image: "",
      loading: false,
      avatarProduct: "",
      avatarFile: null,

      //
    });
    const avatarFile = ref(null); // Store the file object
    const newImage = ref(''); // Store the base64 URL
    const handleChange = value => {
      console.log(`selected ${value}`);
    };
    const storeTypes = ref([]);
    const rules = {


      address: [
        {
          required: true,
          message: "Địa chỉ không để trống.",
          trigger: "change",
        },
      ],
      phonenumber: [
        {
          required: true,
          message: "Điện thoại không để trống.",
          trigger: "change",
        },
      ],
      name: [
        {
          required: true,
          message: "Tên cửa hàng không để trống.",
          trigger: "change",
        },
      ],
    };
    const fetchProduct = async () => {
      try {
        console.log(13132223)

        const response = await axios.get(
          ` ${apiPrefix}/api/v1/auth/storetype/view`
        );
        if (response.data.status === "OK") {
          console.log(response.data)
          storeTypes.value = response.data.data;
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };


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
      const response = "";
      try {

        if (formState.name) {
          formData.append("name", formState.name);
        } else {
          throw new Error("Store name is missing");
        }

        if (formState.address) {
          formData.append("address", formState.address);
        } else {
          throw new Error("address is missing");
        }

        if (formState.phonenumber) {
          formData.append("phonenumber", formState.phonenumber);
        } else {
          throw new Error("phonenumber is missing");
        }

        formData.append("storetypeid", formState.storeTypeId);


        if (avatarFile.value) {
          formData.append('image', avatarFile.value);
        } else {
          formData.append('image', formState.avatarProduct);
        }

        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        const response = await axios.post(
          `${apiPrefix}/api/v1/management/info/insert`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        message.success("Thêm thông tin thành công!");
        formState.loading = false;
        console.log(response.data.data)
        console.log(response.data)

        let auth = localStorage.getItem("auth");
        if (auth) {
          auth = JSON.parse(auth); // Chuyển đổi thành đối tượng JavaScript
          auth.storeId = response.data.data.storeId; // Cập nhật storeId
          localStorage.setItem("auth", JSON.stringify(auth)); // Lưu lại vào localStorage
        }

        window.location.href = '/dashboards';
      } catch (error) {
        console.error("Error during form submission:", error);
        if (error.response && error.response.data && error.response.data.message) {
          message.error("Có lỗi xảy ra: " + error.response.data.message);
        } else {
          message.error("Có lỗi xảy ra: " + error.message);
        }
      } finally {
        formState.loading = false; // Tắt trạng thái chờ khi hoàn thành
      }
    };




    const fileAvatar = ref(null);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      this.formState.avatarFile = file; // Store the file object in formState
    };
    let validatePass2 = async (rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else if (value !== formState.passWord) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
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
    //
    const getOptionsLevelManage = () => {
      ApiViewData.GetOptionsLevelManage()
        .then((response) => {
          users.optionsLevelManage = response.data;
          formState.levelManage = response.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionLevelManage = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const getOptionsRole = () => {
      ApiViewData.GetOptionsRole()
        .then((response) => {
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
      ApiViewData.GetOptionsStatus()
        .then((response) => {
          users.optionsStatus = response.data;
          formState.status = response.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
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

    const filterOptionStatus = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    //
    onMounted(() => {
      //
      fetchProduct();


      resetForm();
      getOptionsLevelManage();
      getOptionsStatus();
      getOptionsRole();
    });
    const handleChangeUpload = (e) => {
      var p = BaseCommon.GetBase64(e.target.files[0]);
      p.then((value) => {
        formState.urlAvatar = value;
        formState.rmavatar = "no";
      }).catch((err) => {
        console.log(err); // 👉️ "Something went wrong"
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
      handleChange,
      previewFiles,
      errors,
      formState,
      storeTypes,
      fileAvatar,
      formRef,
      rules,
      layout,
      resetForm,
      handleFileUpload,
      //
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
      goBack

    };
  },
});
</script>
