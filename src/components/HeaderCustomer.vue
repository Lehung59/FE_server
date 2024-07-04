<template>
  <div id="header">
    <div class="head1">

      <div class="wrap flexJus">
        <router-link to="/trang-chu-stores">
          <div class="logo-container">
      <div class="logo-icon">
        <img src="https://res.cloudinary.com/dqvr7kat6/image/upload/v1720022364/yyqubml5cvkswkuqxcfd.webp" alt="Logo Icon">
      </div>
    </div>
        </router-link>
        <div class="d-flex align-items-center">
          <div class="open">
            <label style="cursor: pointer" class="oh">
              <router-link v-if="!userLocal" to="/login">
                <span> Đăng nhập </span>
              </router-link>
              <a-dropdown>
                <span class="ant-dropdown-link d-block" style="height: 40px;" @click.prevent>
                  <span class="me-1 " style="padding-top: 14px;">Xin chào {{ userLocal?.lastname }}</span>
                  <i class="fa-solid "></i>
                </span>
                <template #overlay>
                  <a-menu>

                    <a-menu-item>
                      <router-link :to="{ name: 'profile-client' }">
                        <span>Trang cá nhân</span>
                      </router-link>
                    </a-menu-item>

                    <a-menu-item>
                      <a @click="handleClickLogout" style="color: red;">Đăng xuất</a>
                    </a-menu-item>

                  </a-menu>
                </template>
              </a-dropdown>
              <!-- <router-link to="/profile-client" v-else class="me-1">
                            <span>Xin chào {{ userLocal.lastname }}</span>
                        </router-link> -->
            </label>
          </div>


          <div class="">
            <div>
              <div>
                <a-button style="background-color: #1a1d2a;border-color: #1a1d2a;" type="primary" @click="showDrawer">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    font-size="24" style="color: #ffd52f">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M18 10.5c0-3.07-1.14-5.64-4-6.32V2h-4v2.18c-2.87.68-4 3.24-4 6.32V16l-2 1v2h16v-2l-2-1v-5.5Zm-5.6 11.46A2.014 2.014 0 0 1 9.99 20h4c0 .28-.05.54-.15.78-.26.6-.79 1.04-1.44 1.18Z"
                      fill="currentColor"></path>
                  </svg>
                  <a-badge :count="unreadCount">
                  </a-badge>
                </a-button>
              </div>
              <a-drawer title="Thông báo của bạn" placement="right" :closable="false" :visible="open"
                :get-container="false" :style="{ position: 'absolute', height: '900px' }" @close="onClose">
                <a-list item-layout="horizontal" :data-source="notiLists">
                  <template #renderItem="{ item }">
                    <a-list-item :style="{
                border: '1px solid',
                marginTop: '10px',
                backgroundColor: item.notiStatus ? '#ffffff' : '#d3d3d3',
              }"> <a-list-item-meta style="padding-left: 10px;">
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
    </div>
    <div class="head2">
      <div class="wrap flexJus">
        <div>
          <span style="font: bold 15px arial">Hãy cùng mua sắm nào!</span>
        </div>
        <div class="flexJus">
          <router-link to="/favstore" title="Cửa hàng yêu thích của bạn">
            <div class="vcart2">
              <i class="fa-solid fa-store"></i>
            </div>
          </router-link>

          <router-link to="/trang-chu/gio-hang" title="Giỏ hàng của bạn">
            <div class="vcart2">
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </router-link>

          <router-link to="/ordered" title="Đơn hàng của bạn">
            <div class="vcart2">
              <i class="fa-regular fa-rectangle-list"></i>
            </div>
          </router-link>




        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
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
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const userLocal = JSON.parse(localStorage.getItem("auth"));
    const token = JSON.parse(localStorage.getItem("token"));
    const handleClickLogout = () => {
      localStorage.removeItem("auth");
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      window.location.href = "http://localhost:5173/login"

    };
    const notiLists = ref([]);
    const open = ref(false);
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
          unreadCount = 0;
        })
        .catch((error) => {
          console.error(error);
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
      open.value = false;

    };



    onMounted(() => {
      getNoti();
    });

    const unreadCount = computed(() => {
      return notiLists.value.filter(item => !item.notiStatus).length;
    });

    return {
      handleClickLogout,
      userLocal,
      userLocal,
      showDrawer,
      onClose,
      open,
      notiLists,
      unreadCount,
      deleteNoti,
    };
  },
});
</script>

<style scoped>
a {
  text-decoration: none;
  /* Bỏ gạch chân */
}
.logo-container {
      display: flex;
      align-items: center;
    }
    .logo-icon img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }


    a {
      text-decoration: none; /* Bỏ gạch chân */
    }

#header {
  width: 100%;
  float: left;
  position: relative;
}

.head1 {
  padding: 15px 0;
  background: #1a1d2a;
  position: relative;
}

.head2 {
  background: #ffcc00;
}

.wrap {
  width: 98%;
  margin: 0 auto;
  max-width: 1300px;
}

.flexJus {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.open {
  color: #fff;
  display: flex;
}

.open label {
  font-size: 13px;
  padding-left: 48px;
  position: relative;
}

.open label:nth-child(1) {
  margin-right: 30px;
}

.open label span {
  text-align: center;
  color: #ffd52f;
  font: bold 15px arial;
  display: block;
}

.open span b {
  color: white;
  font-weight: normal;
}

.vcart2:before {
  font: 21px/1 FontAwesome;
  padding-right: 2px;
}

.vcart2 {
  color: #1a1d2a;
  padding-left: 14px;
  cursor: pointer;
  position: relative;
  font-size: 18px;
}

.oh:before {
  background: url("/Content/img/i/icon-logo.png") no-repeat;
  width: 40px;
  display: inline-block;
  height: 40px;
  padding-right: 5px;
  content: " ";
  position: absolute;
  left: 0;
  top: -5px;
}

@media screen and (max-width: 769px) {
  .owl-wrapper-outer {
    padding-bottom: 40px;
  }

  .owl-pagination {
    text-align: center;
    width: 100%;
  }

  #mslidedetail .owl-pagination {
    bottom: 0;
  }

  .owl-page {
    display: inline-block;
  }

  .owl-page span {
    display: block;
    width: 22px;
    height: 14px;
    border: 0;
    margin: 0 3px 0 0;
    float: left;
    text-align: center;
    background: none !important;
  }

  .owl-page span:before {
    content: "\f111";
    font: 6px/1px FontAwesome;
    color: #ccc;
    display: inline-block;
    width: 8px;
    height: 8px;
  }

  .active span:before {
    color: #666;
  }
}

@media screen and (max-width: 415px) {

  .tiplist h2,
  .tiplist h3,
  .tiplist h4 {
    font-size: 13px;
  }

  .blog {
    width: 96%;
  }
}

@keyframes sonar {
  0% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  100% {
    -webkit-transform: scale(4);
    transform: scale(4);
    opacity: 0;
  }
}

@font-face {
  font-family: "FontAwesome";
  src: url("/Content/awesome/fontawesome-webfont.eot?v=4.4.0");
  src: url("/Content/awesome/fontawesome-webfont.eot?#iefix&v=4.4.0") format("embedded-opentype"),
    url("/Content/awesome/fontawesome-webfont.woff2?v=4.4.0") format("woff2"),
    url("/Content/awesome/fontawesome-webfont.woff?v=4.4.0") format("woff"),
    url("/Content/awesome/fontawesome-webfont.ttf?v=4.4.0") format("truetype"),
    url("/Content/awesome/fontawesome-webfont.svg?v=4.4.0#fontawesomeregular") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>