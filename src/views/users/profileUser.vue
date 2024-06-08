<template>
    <div class="user-profile">
      <div class="card" v-if="userData">
        <div class="card-header">
          <img :src="userData.avatar" alt="User Avatar" class="avatar">
        </div>
        <div class="card-body">
          <h2 class="user-name">{{ userData.firstname }} {{ userData.lastname }}</h2>
          <div class="user-info">
            <p><strong>User ID:</strong> {{ userData.userId }}</p>
            <p><strong>First Name:</strong> {{ userData.firstname || 'N/A' }}</p>
            <p><strong>Last Name:</strong> {{ userData.lastname || 'N/A' }}</p>
            <p><strong>Phone Number:</strong> {{ userData.phoneNumber || 'N/A' }}</p>
            <p><strong>Social Contact:</strong> {{ userData.socialContact || 'N/A' }}</p>
          </div>
        </div>
        <div class="card-footer">
          <button @click="showModal" class="edit-button">Chỉnh sửa</button>
        </div>
      </div>
      <div v-else class="loading">Loading...</div>
  
      <a-modal v-model:visible="isModalVisible" title="Chỉnh sửa thông tin" @ok="handleOk" @cancel="handleCancel">
        <a-form :form="form" layout="vertical">
            <a-form-item label="First Name">
  <a-input v-model:value="formData.firstname" @input="handleInputChange('firstname', $event)" />
</a-form-item>
<a-form-item label="Last Name">
  <a-input v-model:value="formData.lastname" @input="handleInputChange('lastname', $event)" />
</a-form-item>
<a-form-item label="Phone Number">
  <a-input v-model:value="formData.phoneNumber" @input="handleInputChange('phoneNumber', $event)" />
</a-form-item>
<a-form-item label="Social Contact">
  <a-input v-model:value="formData.address" @input="handleInputChange('address', $event)" />
</a-form-item>
        </a-form>
      </a-modal>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { message } from 'ant-design-vue';
  
  export default {
    setup() {
      const userData = ref(null);
      const isModalVisible = ref(false);
      const form = ref(null);
      const formData = ref({
        firstname: '',
        lastname: '',
        phoneNumber: '',
        address :''
      });
      const handleInputChange = (fieldName, event) => {
  formData[fieldName] = event.target.value;
};
      const getUserData = async () => {
        try {
          const token = JSON.parse(localStorage.getItem('token'));  // Lấy token từ localStorage
          const response = await axios.get('https://charismatic-friendship-production.up.railway.app/api/v1/account/profile/view', {
            headers: {
              Authorization: `Bearer ${token}`  // Thêm token vào headers
            }
          });
          userData.value = response.data.data;
          formData.value = { ...response.data.data }; // Sao chép dữ liệu người dùng vào formData
        } catch (error) {
          console.error(error);
        }
      };
  
      const showModal = () => {
        isModalVisible.value = true;
      };
  
      const handleOk = async () => {
        try {
          const token = JSON.parse(localStorage.getItem('token'));
          const formData2 = new FormData();
          console.log(formData.value.firstname,"cc")
          formData2.append('firstname', formData.value.firstname);
          formData2.append('lastname', formData.value.lastname);
          formData2.append('phoneNumber', formData.value.phoneNumber);
          formData2.append('address', formData.value.address);

          await axios.put('https://charismatic-friendship-production.up.railway.app/api/v1/account/profile/update', formData2, {
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
      };
  
      onMounted(() => {
        getUserData();
      });
  
      return {
        userData,
        isModalVisible,
        form,
        formData,
        showModal,
        handleOk,
        handleCancel,
        handleInputChange
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
  