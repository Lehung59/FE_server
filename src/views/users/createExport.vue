<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-12">
        <a-breadcrumb>
          <a-breadcrumb-item>
            Trang chủ
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            Hóa dơn
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
              <a-form-item ref="userName" label="Tên sản phẩm" required name="userName">
                <a-input v-model:value="formState.userName" />
                <small v-if="errors && errors.UserName" class="text-danger">{{ errors.UserName[0] }}</small>
              </a-form-item>
              <a-form-item ref="fullName" label="Giá nhập" required name="fullName">
                <a-input v-model:value="formState.fullName" />
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

              <a-form-item has-feedback label="producttypename" required name="producttypename">
                <a-input v-model:value="formState.producttypename" autocomplete="off" />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
                  <router-link :to="{ name: 'admin-users' }">
                    <span>Quay lại</span>
                  </router-link>
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
      userName: '',
      fullName: '',
      email: '',
      passWord: '',
      quantity: '',
      priceOut: '',
      roleID: '',
      status: '',
      producttypename: '',
      fileAvatar: null,
      rmavatar: "yes",
      //
      change_password: false,
    });
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
    const resetForm = () => {
      formRef.value.resetFields();
    };
    //

    //
    const createUsers = () => {
      const newDataPost = {
        productname: formState.userName,
        priceIn: formState.fullName,
        quantity: formState.quantity,
        priceOut: formState.priceOut,
        producttypename: formState.producttypename
      }
      const formData = new FormData();
      formData.append("productname", formState.userName);
      formData.append("priceIn", formState.fullName);
      formData.append("quantity", formState.quantity);
      formData.append("priceOut", formState.priceOut);
      formData.append("producttypename", formState.producttypename);
      // https://charismatic-friendship-production.up.railway.app/api/v1/management/1/import/insert
      // https://charismatic-friendship-production.up.railway.app/api/v1/management/1/import/insert
      axios.post(`https://charismatic-friendship-production.up.railway.app/api/v1/management/${id}/import/insert`, formData).then((response) => {
        message.success("Tạo mới thành công!");
        router.push({ name: "importExport", params: { id: id } });
      }).catch((error) => {
        console.log(error)
      })
    }
    onMounted(() => {
      //
      resetForm();
    })


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
      //
      users,
      createUsers,
      // preview
    };
  },
});
</script>