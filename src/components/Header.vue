<template>
  <div class="MuiBox-root jss261" id="header">
    <h3 >
    </h3>
    <div class="MuiBox-root  jss262">
      <div class="MuiBox-root  jss263 ">
        <div  style="
            display: inline-block;
            vertical-align: middle;
            width: 30px;
            height: 30px;
            border-radius: 20px;
            font-family: Helvetica, Arial, sans-serif;
          ">
          <div style="
              width: 30px;
              height: 30px;
              line-height: initial;
              text-align: center;
              color: rgb(255, 255, 255);
              background: rgb(215, 61, 50);
              border-radius: 20px;
            ">
            <div style="
                display: table;
                table-layout: fixed;
                width: 100%;
                height: 100%;
                font-size: 10px;
              ">
              <span style="
                  display: table-cell;
                  vertical-align: middle;
                  white-space: nowrap;
                "><span>{{ userLocal && userLocal.lastname ? userLocal.lastname.charAt(0) : '' }}</span></span>
            </div>
          </div>
        </div>
        <p class="MuiTypography-root  ">
          <a-dropdown>
            <span class="ant-dropdown-link d-block" style="height: 40px; 
            margin-top:25px;  
            margin-left: 5px;  
            text-align: center;
    color: white;
    font: bold 15px arial;
    display: block;
    " @click.prevent>
                  <span class="me-1 " style="padding-top: 14px;" >Xin chào {{ userLocal?.lastname }}</span>
                  <i class="fa-solid "></i>
                </span>
            <template #overlay>
              <a-menu>

                <a-menu-item>
                  <router-link :to="{ name: 'profile-user' }">
                    <span v-if=" userLocal.role == 'MANAGER' ">Thông tin cửa hàng</span>
                    <span v-else >Trang cá nhân</span>
                  </router-link>
                </a-menu-item>

                <!-- <a-menu-item v-if="userLocal.role === 'MANAGER'">
                  <router-link :to="{ name: 'profile-store' }">
                    <span>Thông tin cửa hàng</span>
                  </router-link>
                </a-menu-item> -->


                <a-menu-item>
                  <a @click="handleClickLogout" style="color: red;">Đăng xuất</a>
                </a-menu-item>

              </a-menu>
            </template>
          </a-dropdown>
        </p>
        <svg class="MuiSvgIcon-root" focusable="false" aria-hidden="true">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        </svg>
      </div>
      <div class="">
        <div>
          <div>
            <a-button style="background-color: #182537;border-color: #182537;" type="primary" @click="showDrawer">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                font-size="24" style="color: rgb(0, 136, 255)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M18 10.5c0-3.07-1.14-5.64-4-6.32V2h-4v2.18c-2.87.68-4 3.24-4 6.32V16l-2 1v2h16v-2l-2-1v-5.5Zm-5.6 11.46A2.014 2.014 0 0 1 9.99 20h4c0 .28-.05.54-.15.78-.26.6-.79 1.04-1.44 1.18Z"
                  fill="currentColor"></path>
              </svg>
              <a-badge :count="unreadCount" offset="[10, 0]">
              </a-badge>
            </a-button>
          </div>
          <a-drawer title="Thông báo của bạn" placement="right" :closable="false" :visible="open" :get-container="false"
            :style="{ position: 'absolute' }" @close="onClose">
            <a-list item-layout="horizontal" :data-source="sortedNotiList">
              <template #renderItem="{ item }">
                <a-list-item :style="{ 
                  border: '1px solid ' ,
                                  marginTop: '10px',
                                  backgroundColor: item.notiStatus ?  '#ffffff' :'#d3d3d3' }">
                  <a-list-item-meta style="padding-left: 10px;">
                    <template #title>
                      <h6>{{ item.description }}</h6>
                    </template>
                    <template #description>
                      {{ item.description }}
                    </template>
                  </a-list-item-meta>
                  <a-button type="link" @click="deleteNoti(item.notiId)" style="color: red;">Delete</a-button>
                </a-list-item>
              </template>
            </a-list>
          </a-drawer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, ref, reactive } from "vue";
import "ant-design-vue/dist/antd.min.css";
import { useAuthStore } from "../stores/auth.store.js";
import { useRoute } from "vue-router";
import { onUpdated, onMounted } from "vue";
import { message, Badge, Button, Drawer, List, Avatar } from "ant-design-vue";


export default defineComponent({
  components: {
    'a-button': Button,
    'a-badge': Badge,
    'a-drawer': Drawer,
    'a-list': List,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
    'a-avatar': Avatar,
  },
  setup() {

    const notiLists = ref([]);
    const open = ref(false);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const userLocal = JSON.parse(localStorage.getItem("auth"));
    const token = JSON.parse(localStorage.getItem("token"));
    const showDrawer = () => {
      open.value = true;
      getNoti();
    };
    const onClose = () => {
      open.value = false;
      notiLists.value.forEach(item => {
        item.notiStatus = true; // Mark all notifications as read
      });
      axios
        .get(`${apiPrefix}/api/v1/notifications/seen`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((response) => {
          console.log(response.data.data, "noti");
        })
        .catch((error) => {
          console.error(error);
        });


    };
    const authStore = useAuthStore();
    const route = useRoute();


    const handleClickLogout = () => {
      localStorage.removeItem("auth");
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      window.location.href = "http://localhost:5173/login"

    };
    const addNotification = (payload) => {
      notiLists.value.push({
        id: Date.now(),
        title: payload.notification.title,
        body: payload.notification.body,
        notiStatus: false
      });
    };

    const getNoti = () => {
      axios
        .get(`${apiPrefix}/api/v1/notifications/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((response) => {
          notiLists.value = response.data.data;
          console.log(response.data.data, "noti");

        })
        .catch((error) => {
          console.error(error);
        });
    };

    const deleteNoti = (notiId) => {
      // Perform deletion logic here
      console.log(`Deleting notification with id ${notiId}`);

      axios
        .get(`${apiPrefix}/api/v1/notifications/delete/${notiId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((response) => {
          notiLists.value = response.data.data;
          console.log(response.data.data, "noti");
          getNoti();

        })
        .catch((error) => {
          console.error(error);
        });
      // Example: Remove notification from sortedNotiList
      // sortedNotiList.value = sortedNotiList.value.filter(item => item.notiId !== notiId);
      open.value = false;

    };

    const sortedNotiList = computed(() => {
      return notiLists.value.slice().sort((a, b) => b.notiId - a.notiId);
    });

    const unreadCount = computed(() => {
      return notiLists.value.filter(item => !item.notiStatus).length;
    });

    onMounted(() => {
      // chay lan dau tien
      getNoti();
      window.addEventListener('new-notification', (event) => {
        // Add new notification to notiLists
        console.log('co tin moi')
      });
    });


    return {
      authStore,
      userLocal,
      handleClickLogout,
      showDrawer,
      onClose,
      open,
      sortedNotiList,
      unreadCount,
      deleteNoti

    };
  },
});
</script>
<style scoped>


.MuiSvgIcon-root {
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
}

.MuiSvgIcon-colorPrimary {
  color: #0088ff;
}

.MuiSvgIcon-colorSecondary {
  color: #747c87;
}

.MuiSvgIcon-colorAction {
  color: rgba(0, 0, 0, 0.54);
}

.MuiSvgIcon-colorError {
  color: #f44336;
}

.MuiSvgIcon-colorDisabled {
  color: rgba(0, 0, 0, 0.26);
}

.MuiSvgIcon-fontSizeInherit {
  font-size: inherit;
}

.MuiSvgIcon-fontSizeSmall {
  font-size: 1.25rem;
}

.MuiSvgIcon-fontSizeLarge {
  font-size: 2.1875rem;
}
.MuiTypography-root {
  margin: 0;
}

.jss263 {
  cursor: pointer;
  height: 100%;
  display: flex;
  padding: 16px 13px;
  align-items: center;
}

.jss263 svg {
  color: #a2a8af;
}

.jss263:hover {
  background: #a2a8af;
}

.jss263:hover svg {
  color: #0088ff;
}

.jss263:hover p {
  color: #0088ff;
}
.jss262 {
  height: inherit;
  display: flex;
  align-items: center;
}
.jss261 {
  top: 0;
  height: 52px;
  display: flex;
  padding: 0 32px;
  z-index: 1001;
  background: #182537 !important;
  box-shadow: 0px 2px 4px rgba(168, 168, 168, 0.25);
  align-items: center;
  justify-content: space-between;
}

.jss261 .open svg {
  fill: #0088ff;
}
</style>
