<template>
  <div class="user-profile">
    <div class="card" v-if="userData">
      <div class="card-header">
        <img :src="userData.avatar" alt="User Avatar" class="avatar">
      </div>
      <div class="card-body">
        <h2 class="user-name">{{ userData.firstname }} {{ userData.lastname }}</h2>
        <div class="user-info">
          <p v-if="userNow.role == 'MANAGER'"><strong>Tên cửa hàng: </strong>{{ storeInfo != null ? storeInfo.storeName
      : 'N/A' }}</p>
          <p v-if="userNow.role != 'MANAGER'"><strong>Họ:</strong> {{ userData.firstname || 'N/A' }}</p>
          <p v-if="userNow.role != 'MANAGER'"><strong>Tên:</strong> {{ userData.lastname || 'N/A' }}</p>
          <p><strong>Số điện thoại:</strong> {{ userData.phoneNumber || 'N/A' }}</p>
          <p><strong v-if="userNow.role !== 'MANAGER'">Địa chỉ :</strong> <strong v-else>Địa chỉ cửa hàng:</strong> {{
      userData.address || 'N/A' }}</p>
          <p><strong>Mạng xã hội:</strong> {{ userData.socialContact || 'N/A' }}</p>
        </div>
      </div>
      <div class="d-flex">
        <div class="card-footer">
          <button @click="showModal" class="edit-button">Chỉnh sửa</button>
        </div>
        <div class="card-footer">
          <button @click="showModal2" class="edit-button">Đổi mật khẩu</button>
        </div>
      </div>


    </div>
    <div v-else class="loading">Loading...</div>

    <a-modal v-model:visible="isModalVisible2" title="Đổi mật khẩu" @ok="handleChangePass" @cancel="handleCancel">
      <a-form :form="form2" layout="vertical">
        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 26 }">
          <a-input-password v-model:value="formDataChangePass.oldPass" label="Mật khẩu cũ" placeholder="Mật khẩu cũ" />
        </a-form-item>
        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 26 }">
          <a-input-password v-model:value="formDataChangePass.newPass" label="Mật khẩu mới"
            placeholder="Mật khẩu mới" />
        </a-form-item>
        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 26 }">
          <a-input-password v-model:value="formDataChangePass.confirmNewPass" label="Nhập lại mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới" />
        </a-form-item>
      </a-form>
    </a-modal>


    <a-modal v-model:visible="isModalVisible" title="Chỉnh sửa thông tin" @ok="handleOk" @cancel="handleCancel">
      <a-form :form="form" layout="vertical">
        <a-form-item label="Họ">
          <a-input v-model:value="formData.firstname" @input="handleInputChange('firstname', $event)" />
        </a-form-item>
        <a-form-item label="Tên">
          <a-input v-model:value="formData.lastname" @input="handleInputChange('lastname', $event)" />
        </a-form-item>
        <a-form-item label="Số điện thoại">
          <a-input v-model:value="formData.phoneNumber" @input="handleInputChange('phoneNumber', $event)" />
        </a-form-item>

        <a-form-item label="Địa chỉ">
          <a-select v-model:value="selectedProvince" show-search placeholder="Chọn tỉnh thành"
            :options="provinceOptions" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
            @change="fetchProvinces" style="margin-bottom: 10px;"></a-select>

          <a-select v-model:value="selectedDistrict" show-search placeholder="Chọn quận huyện"
            :options="districtOptions" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
            @change="fetchDistricts" style="margin-bottom: 10px;"></a-select>


          <a-select v-model:value="selectedWard" show-search placeholder="Chọn phường xã" :options="wardOptions"
            :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="fetchWards"
            style="margin-bottom: 10px;"></a-select>

          <a-input v-model:value="houseNumber" placeholder="Số nhà" @input="updateAddress" />



        </a-form-item>




        <!-- <a-form-item label="Địa chỉ">
          <div class="css_select_div">
            <select class="css_select" v-model="selectedProvince" @change="fetchDistricts" title="Chọn Tỉnh Thành">
              <option value="0">Tỉnh Thành</option>
              <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.full_name }}
              </option>
            </select>
            <select class="css_select" v-model="selectedDistrict" @change="fetchWards" title="Chọn Quận Huyện">
              <option value="0">Quận Huyện</option>
              <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.full_name }}
              </option>
            </select>
            <select class="css_select" v-model="selectedWard" @change="updateAddress" title="Chọn Phường Xã">
              <option value="0">Phường Xã</option>
              <option v-for="ward in wards" :key="ward.id" :value="ward.id">{{ ward.full_name }}</option>
            </select>
            <input type="text" v-model="houseNumber" @input="updateAddress" placeholder="Số nhà" />
          </div>
        </a-form-item> -->
        <a-form-item label="Ảnh đại diện mới">
          <input type="file" @change="previewFiles" />
          <div class="avatar-container">
            <img v-if="newImage" :src="newImage" class="avatar" alt="avatar" />
            <img v-else :src="userData.avatar" class="avatar" alt="avatar" />
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';

export default {
  setup() {
    const userData = ref(null);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const isModalVisible = ref(false);
    const isModalVisible2 = ref(false);
    const userNow = JSON.parse(localStorage.getItem('auth'));
    const token = JSON.parse(localStorage.getItem('token'));  // Lấy token từ localStorage

    // Lấy token từ localStorage
    const storeInfo = ref();
    const getStoreInfo = async () => {
      if (userNow.role == 'MANAGER') {
        const response = await axios.get(
          `${apiPrefix}/api/v1/management/${userNow.storeId}/info/view`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        storeInfo.value = response.data.data;

      }
    }

    const form = ref(null);
    const form2 = ref(null);
    const formData = ref({
      firstname: '',
      lastname: '',
      phoneNumber: '',
      address: '',
      avatar: ''
    });
    const formDataChangePass = ref({
      oldPass: '',
      newPass: '',
      confirmNewPass: '',
    });
    const options = ref([
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
      {
        value: 'tom',
        label: 'Tom',
      },
    ]);


    const handleChange = value => {
      console.log(`selected ${value}`);
    };
    const handleBlur = () => {
      console.log('blur');
    };
    const handleFocus = () => {
      console.log('focus');
    };
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const value = ref(undefined);

    const avatarFile = ref(null); // Store the file object
    const newImage = ref(''); // Store the base64 URL
    const provinces = ref([]);
    const districts = ref([]);
    const wards = ref([]);
    const selectedProvince = ref(null);
    const selectedDistrict = ref(null);
    const selectedWard = ref(null);
    const houseNumber = ref(null);
    const isOldPassVisible = ref(false);
    const isNewPassVisible = ref(false);
    const isConfirmNewPassVisible = ref(false);

    const handleInputChange = (fieldName, event) => {
      formData.value[fieldName] = event.target.value;
    };

    // const handleInputChange2 =(fieldName, event) => {
    //   formDataChangePass.value[fieldName] = event.target.value;
    // };


    // const togglePasswordVisibility = (field) => {
    //   if (field === 'oldPass') {
    //     isOldPassVisible.value = !isOldPassVisible.value;
    //   } else if (field === 'newPass') {
    //     isNewPassVisible.value = !isNewPassVisible.value;
    //   } else if (field === 'confirmNewPass') {
    //     isConfirmNewPassVisible.value = !isConfirmNewPassVisible.value;
    //   }
    // };


    // const validateForm = () => {
    //   if (formDataChangePass.value.newPass.length < 8) {
    //     message.error('Mật khẩu mới phải có tối thiểu 8 ký tự');
    //     return false;
    //   }
    //   if (formDataChangePass.value.newPass === formDataChangePass.value.oldPass) {
    //     message.error('Mật khẩu mới phải khác mật khẩu cũ');
    //     return false;
    //   }
    //   if (formDataChangePass.value.newPass !== formDataChangePass.value.confirmNewPass) {
    //     message.error('Xác nhận mật khẩu mới không khớp');
    //     return false;
    //   }
    //   return true;
    // };

    // const getOldPassStatus = computed(() => {
    //   return formDataChangePass.value.oldPass.length >= 8 ? 'success' : 'error';
    // });

    // const oldPassHelpMessage = computed(() => {
    //   return formDataChangePass.value.oldPass.length >= 8 ? '' : 'Mật khẩu phải có tối thiểu 8 ký tự';
    // });

    // const getNewPassStatus = computed(() => {
    //   if (formDataChangePass.value.newPass.length < 8) {
    //     return 'error';
    //   }
    //   if (formDataChangePass.value.newPass === formDataChangePass.value.oldPass) {
    //     return 'error';
    //   }
    //   return 'success';
    // });

    // const newPassHelpMessage = computed(() => {
    //   if (formDataChangePass.value.newPass.length < 8) {
    //     return 'Mật khẩu phải có tối thiểu 8 ký tự';
    //   }
    //   if (formDataChangePass.value.newPass === formDataChangePass.value.oldPass) {
    //     return 'Mật khẩu mới phải khác mật khẩu cũ';
    //   }
    //   return '';
    // });

    // const getConfirmNewPassStatus = computed(() => {
    //   if (formDataChangePass.value.confirmNewPass.length < 8) {
    //     return 'error';
    //   }
    //   if (formDataChangePass.value.newPass !== formDataChangePass.value.confirmNewPass) {
    //     return 'error';
    //   }
    //   return 'success';
    // });

    // const confirmNewPassHelpMessage = computed(() => {
    //   if (formDataChangePass.value.confirmNewPass.length < 8) {
    //     return 'Mật khẩu phải có tối thiểu 8 ký tự';
    //   }
    //   if (formDataChangePass.value.newPass !== formDataChangePass.value.confirmNewPass) {
    //     return 'Xác nhận mật khẩu mới không khớp';
    //   }
    //   return '';
    // });
    const provinceOptions = ref([]);
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
        if (response.data.error === 0) {
          // provinces.value = response.data.data;
          // provinces.value = data.map(province => ({ value: province.full_name }));
          provinceOptions.value = response.data.data.map(province => ({
            value: province.id,
            label: province.full_name,
          }));
          fetchDistricts();
        }
      } catch (error) {
        console.error(error);
      }
    };
    const districtOptions = ref([]);
    const fetchDistricts = async () => {
      if (selectedProvince.value !== '0') {
        try {
          const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince.value}.htm`);
          if (response.data.error === 0) {
            districtOptions.value = response.data.data.map(district => ({
              value: district.id,
              label: district.full_name,
            }));
            // wards.value = [];
            // selectedDistrict.value = '0';
            // selectedWard.value = '0';
            fetchWards();
            updateAddress();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    const wardOptions = ref([]);

    const fetchWards = async () => {
      if (selectedDistrict.value !== '0') {
        try {
          const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict.value}.htm`);
          if (response.data.error === 0) {
            wardOptions.value = response.data.data.map(ward => ({
              value: ward.id,
              label: ward.full_name,
            }));

            updateAddress();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    const updateAddress = () => {
      const provinceName = provinceOptions.value.find(p => p.value === selectedProvince.value)?.label || '';


      const districtName = districtOptions.value.find(d => d.value === selectedDistrict.value)?.label || '';
      const wardName = wardOptions.value.find(w => w.value === selectedWard.value)?.label || '';
      formData.value.address = `${houseNumber.value}, ${wardName}, ${districtName}, ${provinceName}`.trim();
    };

    const getUserData = async () => {
      try {
        const response = await axios.get(`${apiPrefix}/api/v1/account/profile/view`, {
          headers: {
            Authorization: `Bearer ${token}`  // Thêm token vào headers
          }
        });
        userData.value = response.data.data;
        formData.value = { ...response.data.data }; // Sao chép dữ liệu người dùng vào formData
        newImage.value = response.data.data.avatar; // Assuming avatar URL is part of the user data
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


    const showModal = () => {
      isModalVisible.value = true;
    };
    const showModal2 = () => {
      isModalVisible2.value = true;
    };
    const handleChangePass = async () => {
      const oldPass = formDataChangePass.value.oldPass;
      const newPass = formDataChangePass.value.newPass;
      const confirmNewPass = formDataChangePass.value.confirmNewPass;
      console.log(oldPass);
      if (newPass === oldPass) {
        message.error('Mật khẩu mới phải khác mật khẩu cũ');
        return;
      }
      if (newPass !== confirmNewPass) {
        message.error('Mật khẩu nhập lại không khớp với mật khẩu mới');
        return;
      }
      // Kiểm tra mật khẩu mới có ít nhất 6 ký tự và có ít nhất một chữ số
      if (newPass.length < 6 || !/[a-zA-Z]/.test(newPass) || !/\d/.test(newPass)) {
        message.error('Mật khẩu mới phải có ít nhất 6 ký tự và chứa ít nhất một chữ số và một chữ cái');
        return;
      }

      try {

        const token = JSON.parse(localStorage.getItem('token'));
        const newValue = {
          oldPassword: formDataChangePass.value.oldPass,
          newPassword: formDataChangePass.value.newPass,
        };

        await axios.post(`${apiPrefix}/api/v1/auth/changepassword`, newValue, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        message.success('Đổi mật khẩu thành công');
        isModalVisible2.value = false;
        formDataChangePass.value.oldPass = '';
        formDataChangePass.value.newPass = '';

        formDataChangePass.value.confirmNewPass = '';


      } catch (error) {
        if (error.response && error.response.data) {
          message.error(error.response.data);
        } else {
          message.error('Đã xảy ra lỗi');
        }
      }
    };



    const handleOk = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const formData2 = new FormData();
        formData2.append('firstname', formData.value.firstname);
        formData2.append('lastname', formData.value.lastname);
        formData2.append('phoneNumber', formData.value.phoneNumber);
        formData2.append('address', formData.value.address);
        if (avatarFile.value) {
          formData2.append('avatar', avatarFile.value); // Include the file in the form data
        }

        await axios.put(`${apiPrefix}/api/v1/account/profile/update`, formData2, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        message.success('Cập nhật thông tin thành công');
        isModalVisible.value = false;
        getUserData(); // Tải lại dữ liệu sau khi cập nhật thành công
      } catch (error) {
        console.error(error);
        message.error('Có lỗi xảy ra khi cập nhật thông tin');
      }
    };

    const handleCancel = () => {
      isModalVisible.value = false;
      isModalVisible2.value = false;
    };

    onMounted(() => {
      getStoreInfo();
      getUserData();
      fetchProvinces();

    });

    return {
      userData,
      handleChange,
      provinceOptions,
      wardOptions,
      districtOptions,
      storeInfo,
      options,
      value,
      handleBlur,
      handleFocus,
      filterOption,
      isModalVisible,
      isModalVisible2,
      form,
      form2,
      formData,
      formDataChangePass,
      isOldPassVisible,
      isNewPassVisible,
      isConfirmNewPassVisible,
      showModal,
      showModal2,
      handleOk,
      userNow,
      handleChangePass,
      handleCancel,
      handleInputChange,
      provinces,
      districts,
      wards,
      selectedProvince,
      selectedDistrict,
      selectedWard,
      houseNumber,
      fetchProvinces,
      fetchDistricts,
      fetchWards,
      updateAddress,
      newImage,
      previewFiles,

    };
  }
};
</script>

<style scoped>
.user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Roboto', sans-serif;
}

.css_select_div {
  display: flex;
  flex-direction: column;
}

.css_select {
  margin-bottom: 10px;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 300px;
  text-align: center;
}

.card-header {
  background: #007bff;
  padding: 16px;
}

.avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  border: 4px solid #fff;
}

.card-body {
  padding: 16px;
}

.user-name {
  font-size: 1.5rem;
  margin: 16px 0;
  color: #333;
}

.user-info {
  text-align: left;
  padding: 0 16px;
}

.user-info p {
  margin: 8px 0;
  color: #555;
}

.user-info strong {
  color: #333;
}

.card-footer {
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

.edit-button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: #0056b3;
}

.loading {
  font-size: 1.5rem;
  color: #007bff;
}
</style>