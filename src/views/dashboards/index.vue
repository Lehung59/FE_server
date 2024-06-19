<template>
    <div class="welcome-container">
      <div class="store-info">
        <img :src="store.image" alt="Store Image" class="store-image" />
        <h1 class="store-name">{{ store.storeName }}</h1>
        <p class="store-address">{{ store.address }}</p>
        <p class="store-phone">Phone: {{ store.phoneNumber }}</p>
        <p class="store-email">Email: {{ store.emailmanager }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from "vue";
  import axios from "axios";
  const token = JSON.parse(localStorage.getItem("token"));
  const apiPrefix = import.meta.env.VITE_API_PREFIX;
  const auth = localStorage.getItem("auth");
  const storeId = JSON.parse(auth).storeId;
  export default defineComponent({



    data() {
      return {
        store: {}
      };
    },



    async created() {
      try {
        const response = await axios.get(
           `${apiPrefix}/api/v1/management/${storeId}/info/view`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        
        
      
        if (response.data.status === "OK") {
          this.store = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    },
  });
  </script>
  
  <style scoped>
  .welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .store-info {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .store-image {
    width: 200px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .store-name {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  
  .store-address {
    color: #666;
    margin-bottom: 5px;
  }
  
  .store-phone, .store-email {
    color: #888;
    margin-bottom: 5px;
  }
  
  .section-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .product-list {
    list-style-type: none;
    padding: 0;
  }
  
  .product-list li {
    margin-bottom: 5px;
    color: #444;
  }
  </style>
  