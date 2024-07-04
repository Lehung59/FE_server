<template>
  <div id="wrapper">

    <Header />

    <div id="main">
      <!--san pham khuyen mai-->
      <div class="f dealhot">
        <div class="wrap flexCol">
          <div class="f dhtit">
            <h2>Danh sách cửa hàng yêu thích của bạn</h2>
          </div>
          <div class="dhpro owl-carousel owl-theme" id="dealhot" style="opacity: 1; display: block">
            <div class="owl-wrapper-outer">
              <div class="owl-wrapper" style="
                  width: 3936px;
                  left: 0px;
                  display: block;
                  background-color: #bfbfbf !important;
                ">
                <div v-for="store in stores" :key="store.storeId" class="owl-item active" style="">
                  <router-link  :to="{
                name: 'trang-chu',
                params: { id: store.storeId },
              }">
                    <a class="item pi" style="height: 350px; width: 234px !important; border-radius: 5%; border: 1px solid black;">
                      <div style="padding: 10px 10px ;" >
                        <img :src="store.image" :alt="store.image" style="object-fit: fill; width: 100%;  height: 100%;"/>
                      </div>
                      <h3>{{ store.storeName }}</h3>
                      <strong style="padding-right: 5px">{{
                store.rate
              }}</strong>
                      <i class="fa-solid fa-star" style="color: #ffd43b; padding-right: 5px"></i>
                      <p>{{ store.storeType }}</p>
                    </a>
                  </router-link>
                </div>
              </div>
              <div class="col-12">
                    <a-pagination @change="onChange2" v-model:current="pageParam2.currentPage"
                        :total="pageParam2.totalItems" :pageSize="pageParam2.pageSize"
                        :show-total="(total, range) => `${range[0]}-${range[1]} của ${total} cửa hàng`"
                        class="mt-2 text-end" />
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f dealhot">
        <div class="wrap flexCol">
          <div class="f boxtit flexJus">
            <label style="font: bold 15px arial">Các cửa hàng uy tín khác</label>
            <div class=" mb-3 d-flex">
            <div class="">

                <a-input-search v-model:value="searchKeyword" placeholder="Tìm kiếm cửa hàng" size="medium"
                @search="onSearch" style="width: 300px; border: 1px solid #ccc">
                <template #enterButton>
                  <a-button type="primary" style="background-color: #ffd52f; border-color: yellow; color: #555;"
                    @click="onSearch">
                    Tìm kiếm
                  </a-button>
                </template>
              </a-input-search>



            </div>
            <div class="">

              <a-select v-model:value="selectedType" style="width: 250px; margin-left: 20px; " @change="handleChange"
                placeholder="Chọn loại sản phẩm">
                <a-select-option  :value="allType">
                  Tất cả
                </a-select-option>
                <a-select-option v-for="productType in typeStore" :key="productType.storeTypeName" :value="productType.storeTypeName">
                  {{ productType.storeTypeName }}
                </a-select-option>
              </a-select>

            </div>
          </div>
          </div>

          <div class="dhpro owl-carousel owl-theme" id="dealhot2" style="opacity: 1; display: block">
            <div class="owl-wrapper-outer">
              <div class="owl-wrapper" style="

                  left: 0px;
                  display: block;
                  background-color: #bfbfbf !important;
                  padding-left: 11px;
                  padding-bottom: 15px;
                ">
                <div v-for="store in allStores" :key="store.storeId" class="owl-item active" style="" >
                  <router-link  :to="{
                name: 'trang-chu',
                params: { id: store.storeId },
              }">
                    <a class="item pi" style="height: 350px; width: 234px !important; border-radius: 5%; border: 1px solid black;">
                      <div style="padding: 10px 10px ;" >
                        <img :src="store.image" :alt="store.image" style="object-fit: fill; width: 100%;  height: 100%;"/>
                      </div>
                      <h3>{{ store.storeName }}</h3>
                      <strong style="padding-right: 5px">{{
                store.rate
              }}</strong>
                      <i class="fa-solid fa-star" style="color: #ffd43b; padding-right: 5px"></i>
                      <p>{{ store.storeType }}</p>
                    </a>
                  </router-link>
                </div>
              </div>
              <div class="col-12"  >
                    <a-pagination @change="onChange" v-model:current="pageParam.currentPage"
                        :total="pageParam.totalItems" :pageSize="pageParam.pageSize"
                        :show-total="(total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`"
                        class="mt-2 text-end"  style="margin-right: 20px; padding-top:10px;"/>
                </div>
            </div>
          </div>
        </div>
      </div>



      <!--thuong hieu-->
    </div>
    <Footer/>


  </div>

</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import Header from "../../components/HeaderCustomer.vue";
import Footer from "../../components/footer.vue"

import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { useMenu } from "../../stores/use-menu.js";
import { onUpdated, onMounted } from "vue";
import ApiViewData from "../../api/ApiViewData.js";
import ApiUser from "../../api/ApiUser.js";
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
export default defineComponent({
  components: {
    Header,
    Footer
  },
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const userLocal = JSON.parse(localStorage.getItem("auth"));
    let token;
    try {
      token = JSON.parse(localStorage.getItem("token"));
    } catch {
      (error) => {
        console.error(error);
      }
    };
    const userNOW = JSON.parse(localStorage.getItem("auth"));
const selectedType = ref("") ;
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    console.log(token);
    const typeStore = ref([]);
    const allType = ref("")
    const searchKeyword = ref("");


    // try {
      // const eventSource = new EventSource(`${apiPrefix}/notifications?userId=${userLocal.userId}`);
      //     // Tạo arr 
      //     //notificomp
      // eventSource.onmessage = function(event) {
      //   console.log(event.data);
      // };

      // eventSource.addEventListener('message', function(event) {
      //   console.log("Received message: ", event.data);
      // });

      // eventSource.onerror = function(err) {
      //   console.error("EventSource failed: ", err);
      //   eventSource.close();
      // };
      // } catch (e) {
      //   console.error(e);
      // }



      const router = useRouter();
      const route = useRoute();
      const errors = ref([]);
      const stores = ref([]);
      const allStores = ref([]);
      const pageParam = reactive({
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0
        });
        const pageParam2 = reactive({
            currentPage: 1,
            pageSize: 5,
            totalItems: 0,
            totalPages: 0
        });

      const getTypeStore = () => {
      axios
        .get(`${apiPrefix}/api/v1/auth/storetype/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          typeStore.value = response.data.data;
          // phone.value = response.data.data.phoneNumber;
          console.log(typeStore.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const onSearch = () => {
            pageParam.currentPage = 1;
            getAllStores(pageParam.currentPage, pageParam.pageSize, searchKeyword.value,selectedType.value);
        };
      const getAllStores = (page, size, keyword = "" ,storeTypeName = "") => {
        console.log(token);
        axios
          .get(`${apiPrefix}/api/v1/customer/store/view`, {
            params: { page, size, keyword,storeTypeName },
            headers: {
              Authorization: `Bearer ${token}`,
               // Thêm token vào headers
            },
          })
          .then((response) => {
            console.log(response.data.data, "response");
            allStores.value = response.data.data;
            pageParam.totalItems = response.data.pagination.totalItems;
            pageParam.totalPages = response.data.pagination.totalPages;
          })
          .catch((error) => {
            console.error(error);
          });
      };
      const handleChange = (value) => {
            console.log('Selected productTypeName:', value);
            selectedType.value = value;

            pageParam.currentPage = 1;
            getAllStores(pageParam.currentPage, pageParam.pageSize, searchKeyword.value,value);
        }

        const onChange = (page, pageSize) => {
            pageParam.currentPage = page;
            pageParam.pageSize = pageSize;
            getAllStores(page, pageSize, searchKeyword.value,selectedType.value);
        };
        const onChange2 = (page, pageSize) => {
            pageParam2.currentPage = page;
            pageParam2.pageSize = pageSize;
            getUsers(page, pageSize);
        };
      const getUsers = (page, size, keyword = "") => {
        axios
          .get(`${apiPrefix}/api/v1/customer/favor/view`, {
            params: { page, size },
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào headers
            },
          })
          .then((response) => {
            console.log(response.data.data, "response");
            stores.value = response.data.data;
            pageParam2.totalItems = response.data.pagination.totalItems;
            pageParam2.totalPages = response.data.pagination.totalPages;
          })
          .catch((error) => {
            console.error(error);
          });
      };
      const fetchFireBase = () => {

        console.log(123)
        const firebaseConfig = {
          apiKey: "AIzaSyAYfnQlKBxt8LbgX3zBcsTSUT2qVhiNiA0",
          authDomain: "be-for-gr-49b88.firebaseapp.com",
          projectId: "be-for-gr-49b88",
          storageBucket: "be-for-gr-49b88.appspot.com",
          messagingSenderId: "531339012617",
          appId: "1:531339012617:web:29675eb397477856eae6d8",
          measurementId: "G-KH9RSMYBBZ"
        };
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);


        getToken(messaging, { vapidKey: 'BEjH694CDnh2Hx__9CFs3bTo9v4Ti7uJq4ohSgN3LN8EVrfn9-dY8m7vTcsiLycQsH8Q9JyKQ0jZeu71fwblmEQ' })
          .then((currentToken) => {
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              console.log("Token is:", currentToken);
              // alert(currentToken);
              const formData = new FormData();
              formData.append("userId", userNOW.userId);

              formData.append("firebaseId", currentToken);
              axios.post(
                `${apiPrefix}/api/v1/notifications/subscribe/device`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              ).then((response) => {
                message.success(" thành công!");
              }).catch((error) => {
                console.log(error)
              })

              // ...
            } else {
              // Show permission request UI
              console.log('No registration token available. Request permission to generate one.');
              // ...
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
          });

      };
      onMounted(() => {
        getAllStores(pageParam.currentPage, pageParam.pageSize);
        getTypeStore();
        // fetchFireBase();
        getUsers(pageParam2.currentPage, pageParam2.pageSize);
        if (!token) {
          // Xóa localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("auth");
          // Redirect đến trang login
          router.push("/login");
        }
      });
      return {
        typeStore,
        onChange2,
        searchKeyword,
        onSearch,
        selectedType,
        allType,
        route,
        router,
        allStores,
        stores,
        userLocal,
        pageParam,
        pageParam2,
        handleChange,
        onChange
      };
    },
  });
</script>

<style scoped>

.f,
.iv div {
  width: 100%;
  float: left;
}

.box-tit {
  height: 40px;
  padding: 0 10px;
}
.flexJus,
.waranty {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-tit .tit {
  font: bold 14px/25px arial;
  display: block;
}

.box-tit .tit:after {
  font: 15px/25px "FontAwesome";
  content: "\f0da";
  margin-left: 5px;
}


.bgtit,
.box-tit {
  background: #eee;
  color: #333;
  text-indent: 10px;
}

.wrap {
  width: 98%;
  margin: 0 auto;
  max-width: 1300px;
}

#wrapper {
  float: left;
  width: 100%;
}


.dhtit {
  padding: 13px 0 8px;
  background: #bf2121;
  margin: 5px 0 0;
  text-align: center;
  border-radius: 4px 4px 0 0;
}

.dhtit h2 {
  font: bold 17px arial;
  color: #555;
  display: block;
  color: #fff;
  text-transform: uppercase;
}
.owl-carousel .owl-wrapper-outer {
  overflow: hidden !important;
  position: relative;
  width: 100%;
}


.owl-carousel .owl-wrapper-outer.autoHeight {
  -webkit-transition: height 500ms ease-in-out;
  -moz-transition: height 500ms ease-in-out;
  -ms-transition: height 500ms ease-in-out;
  -o-transition: height 500ms ease-in-out;
  transition: height 500ms ease-in-out;
}

.owl-carousel .owl-item {
  float: left;
}















.box-shadow,
.btn,
.iv,
.saleof,
.psitem label,
.fone,
#header,
.btn2 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.btn {
  font: bold 11px/30px arial;
  padding: 0 7px;
  background-color: #fbac51;
  color: #fff;
  display: inline-block;
  text-transform: uppercase;
  cursor: pointer;
}
.btn:hover {
  color: #fff;
}

.dealhot {
  margin-top: 30px;
  margin-bottom: 30px;
}

.dealhot a {
  padding: 10px;
  color: #333;
  width: auto !important;
}

.dealhot a div {
  height: 240px;
}

.dealhot a h3 {
  font-size: 15px;
}

.dealhot figure img {
  width: auto !important;
  clear: both;
  margin: 0 auto;
}

.dealhot .bq u {
  font: 13px/14px arial;
}
.dhpro {
  background: #fff;
  border: 5px solid #bf2121;
  border-radius: 0 0 4px 4px;
}





.owl-carousel {
  display: none;
  position: relative;
  width: 100%;
  -ms-touch-action: pan-y;
}






.owl-carousel .owl-controls {
  margin: 0 !important;
  position: absolute;
  width: 100%;
  top: 48%;
  left: 0;
  height: 50%;
}

.owl-carousel .owl-controls .owl-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.owl-carousel .owl-controls .owl-buttons div {
  font-size: 26px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  margin: 0 10px !important;
  opacity: 0;
}

.owl-carousel:hover .owl-controls .owl-buttons div {
  opacity: 1;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #fff;
  font-family: -webkit-body;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.owl-carousel .owl-controls .owl-buttons div i:before {
  font: 36px/20px FontAwesome;
  color: #444;
}

.owl-carousel .owl-controls .owl-buttons .owl-prev i:before {
  content: "\f104";
}

.owl-carousel .owl-controls .owl-buttons .owl-next i:before {
  content: "\f105";
}
.owl-carousel .owl-wrapper,
.owl-carousel .owl-item img {
  width: 100%;
  display: block;
  float: left;
}

.owl-carousel .owl-wrapper:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}


.pi {
  width: 19%;
  height: 350px;
  float: left;
  padding: 10px;
  position: relative;
  margin: 0.5%;
  background: #fff;
  color: #333;
  border-radius: 5%;
  border: 1px solid #333;
}

.pi a {
  color: #333;
}

.pi div {
  height: 222px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.pi div img {
  max-height: 90%;
  max-width: 100%;
  width: auto;
  height: auto;
}

.pi label {
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  display: block;
  cursor: pointer;
  color: #333;
  border-radius: 0 0 0 8px;
  background: #eee;
  width: 70px;
  height: 25px;
  font: 12px/25px arial;
}

.pi label:before {
  font: 12px/24px "FontAwesome";
  content: "\f055";
  padding-right: 5px;
  vertical-align: top;
}

.pi figure {
  height: 40px;
  float: left;
  width: 100%;
  margin-bottom: 15px;
  text-align: center;
}

.pi figure img {
  height: 40px;
}

.pi strong {
  display: block;
  color: red;
  font: bold 16px/18px arial;
  margin-top: 5px;
  float: left;
}

.pi strong i {
  color: #666;
  font: 13px/18px arial;
  padding-left: 10px;
}

.pi strong u {
  color: #666;
  font: 13px/18px arial;
  text-decoration: line-through;
  display: block;
}

.pi h3 {
  font: 17px/18px arial;
  float: left;
  width: 100%;
  margin: 5px 0;
}

.pi p {
  color: #fff;
  font: 12px/20px arial;
  padding: 0 5px;
  background: #06f;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 5px;
  display: inline-block;
  margin-bottom: 5px;
}

.pi ul {
  max-height: 70px;
  font: 12px/16px arial;
  color: #888;
  float: left;
  overflow: hidden;
  width: 100%;
  margin: 8px 0 10px;
}

.pi ul li {
  display: inline-block;
  padding-right: 3px;
}

.pi ul li:before {
  font: 12px/16px "FontAwesome";
  content: "\f046";
  vertical-align: top;
  color: #06f;
  padding-right: 2px;
}

.pi ol {
  display: flex;
  align-items: center;
  margin-top: 10px;
  float: left;
  width: 100%;
}

.pi ol li:nth-child(1) {
  border-right: 1px solid #ddd;
  padding-right: 5px;
  margin-right: 5px;
}

.pi ol li b {
  font: bold 12px/26px arial;
  display: block;
  background: #0c5a87;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 0 5px;
}

.pi ol li i {
  font: bold 16px/26px arial;
  color: red;
  display: block;
}
.flexCol {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

#category .img-responsive {
  width: 100%;
}



.owl-theme .owl-controls {
  margin-top: 40px;
  text-align: center;
  margin-bottom: 60px;
}

.owl-theme .owl-controls .owl-buttons div {
  color: #fff;
  display: inline-block;
  margin: 5px;
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 30px;
  background: #869791;
  opacity: 0.5;
}

.owl-theme .owl-controls.clickable .owl-buttons div:hover {
  filter: Alpha(Opacity=100);
  opacity: 1;
  text-decoration: none;
}

.owl-theme .owl-controls .owl-page {
  display: inline-block;
}

.owl-theme .owl-controls .owl-page span {
  display: block;
  width: 12px;
  height: 12px;
  margin: 5px 7px;
  opacity: 0.5;
  border-radius: 20px;
  background: #869791;
}

.owl-theme .owl-controls .owl-page.active span,
.owl-theme .owl-controls.clickable .owl-page:hover span {
  opacity: 1;
}

.owl-theme .owl-controls .owl-page span.owl-numbers {
  height: auto;
  width: auto;
  color: #fff;
  padding: 2px 10px;
  font-size: 12px;
  border-radius: 30px;
}


.nav li .c1:hover,

.s {
  height: 20px;
  padding-left: 110px;
  display: block;
  float: left;
  width: 100%;
  font-weight: normal;
}


.fotb {
  float: left;
  width: 30%;
  color: #fff;
}

.fotb a {
  color: #fff;
}

.fotb:nth-last-child(1) {
  margin-right: 0;
}

.fotb label {
  display: block;
  margin-bottom: 10px;
  font: bold 13px/25px arial;
  text-transform: uppercase;
}

.fotb label:before {
  font: 14px/18px FontAwesome;
  margin-right: 5px;
}

.fotb:nth-last-child(1) label:before {
  content: "\f095";
}

.fotb:nth-last-child(2) label:before {
  content: "\f129";
}

.fotb:nth-last-child(3) label:before {
  content: "\f0f6";
}

.social {
  margin-bottom: 20px;
}

.social a {
  margin-right: 10px;
  background: #8ab6e3;
  padding: 5px 10px;
  border-radius: 50%;
  color: #fff;
}

.social a:hover {
  background: #498ed4;
}

.social a i:before {
  padding-right: 0;
}

.muahang p a {
  color: #ffb229;
  min-width: 105px !important;
  display: inline-block;
  padding-left: 5px;
}

.muahang p span {
  width: 70px;
  display: inline-block;
}

.showrooms {
  float: left;
  width: 100%;
}

.showrooms ul {
  float: left;
  width: 100%;
  margin-bottom: 10px;
}

.showrooms li {
  float: left;
  width: 100%;
}

.showrooms li:nth-child(1) {
  font-weight: bold;
  text-transform: uppercase;
}

.showrooms li:nth-child(1):before {
  font: 14px/18px FontAwesome;
  margin-right: 5px;
  content: "\f041";
}

.showrooms span {
  display: inline-block;
  width: 80px;
  color: #aaa;
}

.showrooms li i {
  font: 12px arial;
  color: red;
}

* {
  list-style: none outside none;
  text-decoration: none;
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
}
.boxtit {
  background: #fff;
  border-bottom: 2px solid #ffd52f;
}

.boxtit label {
  font: 16px/30px arial;
  color: #555;
  background: #ffd52f;
  display: inline-block;
  clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
  padding: 9px 60px 9px 13px;
}
.owl-wrapper {
  background-color: #bfbfbf;
  padding: 15px 10px;
}
</style>
