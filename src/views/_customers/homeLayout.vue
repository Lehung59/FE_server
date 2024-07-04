<template>
  <div id="wrapper">
    <Header />
    <div id="">
      <!--san pham khuyen mai-->
      <div class="f box-tit">
        <div class="flexJus wrap" style="height: 40px">
          <label @click="addMyFarvors()" class="btn" style="font: 15px arial">Thêm vào yêu thích</label>
          
        </div>
      </div>
      <div class="f dealhot">
        <div class="wrap flexCol">
          <div class="f dhtit">
            <h2>TOP 5 sản phẩm trong cửa hàng</h2>
          </div>




          <div class="dhpro owl-carousel" id="" style="opacity: 1; display: block">
            <div class="owl-wrapper-outer">
              <div class="owl-wrapper" style="
                  width: 3936px;
                  left: 0px;
                  display: block;
                  background-color: #bfbfbf !important;
                  padding-left: 15px;
                  padding-bottom: 15px;
                ">
                <div v-for="user in users" :key="user.id" class="owl-item"
                  >
                  <router-link :to="{
            name: 'trang-chu-chi-tiet-san-pham',
            params: { id: user.productId },
            query: { storePhone: phone }
          }">
                    <!-- /trang-chu/chi-tiet-san-pham -->
                    <a class=" pi" :title="user.title" :href="user.href"  style="height: 350px; width: 235px !important; border-radius: 5%; border: 1px solid black;">
                      <div style="padding: 10px 10px ;">
                        <img :src="user.avatarProduct" :alt="user.avatarProduct" style="object-fit: fill; width: 100%;  height: 100%;"/>
                      </div>
                      <h3>{{ user.productName }}</h3>
                      <strong>
                        {{
            (
              (user.price * (100 - user.discount)) /
              100
            )?.toLocaleString()
          }}₫
                        <u>{{ user.price?.toLocaleString() }}₫</u>
                      </strong>

                      <span class="s">{{ user.view }}(Lượt xem)</span>
                    </a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f dealhot">
        <div class="wrap flexCol">
          <div class="f boxtit flexJus">
            <label style="font: bold 15px arial">Các sản phẩm khác</label>
            <div class=" mb-3 d-flex">
            <div class="">



                <a-input-search v-model:value="searchKeyword2" placeholder="Tìm kiếm sản phẩm" size="medium"
                @search="onSearch2" style="width: 300px; border: 1px solid #ccc">
                <template #enterButton>
                  <a-button type="primary" style="background-color: #ffd52f; border-color: yellow; color: #555;"
                    @click="onSearch2">
                    Tìm kiếm
                  </a-button>
                </template>
              </a-input-search>



            </div>
            <div class="">

              <a-select v-model:value="selectedType" style="width: 150px; margin-left: 20px; " @change="handleChange"
                placeholder="Chọn loại sản phẩm">
                <a-select-option  :value="allType">
                  Tất cả
                </a-select-option>
                <a-select-option v-for="productType in typeStore" :key="productType" :value="productType">
                  {{ productType }}
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
                  padding-left: 15px;
                  padding-bottom: 15px;
                ">
                <div v-for="user in users2" :key="user.id" class="owl-item active"
                  >
                  <router-link :to="{
            name: 'trang-chu-chi-tiet-san-pham',
            params: { id: user.productId },
            query: { storePhone: phone }
          }">
                    <!-- /trang-chu/chi-tiet-san-pham -->
                    <a class=" pi" :title="user.title" :href="user.href"  style="height: 350px; width: 235px !important; border-radius: 5%; border: 1px solid black;">
                      <div style="padding: 10px 10px ;">
                        <img :src="user.avatarProduct" :alt="user.avatarProduct" style="object-fit: fill; width: 100%;  height: 100%;"/>
                      </div>
                      <h3>{{ user.productName }}</h3>
                      <strong>
                        {{
            (
              (user.price * (100 - user.discount)) /
              100
            )?.toLocaleString()
          }}₫
                        <u>{{ user.price?.toLocaleString() }}₫</u>
                      </strong>

                      <span class="s">{{ user.view }}(Lượt xem)</span>
                    </a>
                  </router-link>
                </div>
              </div>
              <div style="margin-top: 10px;" >
          <a-pagination @change="onChange2" v-model:current="pageParam2.currentPage" :total="pageParam2.totalItems"
            :pageSize="pageParam2.pageSize" :show-total="(total, range) =>
            `${range[0]}-${range[1]} của ${total} sản phẩm`
            " class="mt-2 text-end" />
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>

</template>

<script>
import { defineComponent, computed, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { useMenu } from "../../stores/use-menu.js";
import { onUpdated, onMounted } from "vue";
import ApiViewData from "../../api/ApiViewData.js";
import ApiUser from "../../api/ApiUser.js";
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";
import Header from "../../components/HeaderCustomer.vue";
import Footer from "../../components/footer.vue"

export default defineComponent({
  components: {
    Header,
    Footer
  },
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const userLocal = JSON.parse(localStorage.getItem("auth"));
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
    const router = useRouter();
    const route = useRoute();
    const errors = ref([]);
    const users = ref([]);
    const typeStore = ref([]);
    const token = JSON.parse(localStorage.getItem("token"));
    const storeId = route.params.id;
    const storeId2 = ref(route.params.id);
    const searchKeyword = ref("");
    const selectedType = ref("");
    const allType = ref("")
    const phone = ref("")
    const pageParam = reactive({
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      totalPages: 0,
    });
    const users2 = ref([]);
    const searchKeyword2 = ref("");
    const pageParam2 = reactive({
      currentPage: 1,
      pageSize: 8,
      totalItems: 0,
      totalPages: 0,
    });
    const getUsers = (page, size, keyword = "") => {
      axios
        .get(`${apiPrefix}/api/v1/customer/store/view/${storeId}`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, size, keyword },
        })
        .then((response) => {

          users.value = response.data.data.sort((a, b) => b.view - a.view).slice(0,5);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const getUsers2 = (page, size, keyword = "",productTypeName="") => {
      axios
        .get(`${apiPrefix}/api/v1/customer/store/view/${storeId}`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, size, keyword, productTypeName },
        })
        .then((response) => {
          const data = response.data;
          users2.value = response.data.data;
          // users.value = response.data.data.sort((a, b) => b.view - a.view).slice(0,5);

          pageParam2.totalItems = data.pagination.totalItems;
          pageParam2.totalPages = data.pagination.totalPages;
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const addMyFarvors = async () => {
      const formData = new FormData();
      formData.append("storeid", storeId);
      try {
        await axios.post(`${apiPrefix}/api/v1/customer/favor/add`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        message.success("Đã thêm yêu thích");
      } catch (error) {


        if (error.response && error.response.data) {
          // Xử lý khi có lỗi từ phản hồi của API
          console.error('Lỗi khi gọi API:', error.response.data.message);
          message.success(error.response.data.message);
        } else {
          // Xử lý khi có lỗi khác, chẳng hạn mạng chập chờn
          console.error('Đã xảy ra lỗi:', error.message);StringUtils.isEmpty(profileDetail.getAddress()) || StringUtils.isEmpty(profileDetail.getPhoneNumber())
          message.error('Đã xảy ra lỗi');

        }
        console.error(error);
      }
    };
    const getTypeStore = () => {
      axios
        .get(`${apiPrefix}/api/v1/customer/${storeId}/info/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          typeStore.value = response.data.data.productTypeName;
          phone.value = response.data.data.phoneNumber;
          console.log(typeStore.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const filteredProducts = computed(() => {
      if (!selectedType.value) {
        return users2.value;
      }
      return users2.value.filter(product => product.productType === selectedType.value);
    });
    const handleChange = (value) => {


      console.log('Selected productTypeName:', value);
            selectedType.value = value;

            pageParam2.currentPage = 1;
            getUsers2(pageParam2.currentPage, pageParam2.pageSize, searchKeyword2.value,value);
      console.log(value);
    };

    const onSearch2 = () => {
      pageParam2.currentPage = 1;
      getUsers2(pageParam2.currentPage, pageParam2.pageSize, searchKeyword2.value);
    };
    const onChange2 = (page, pageSize) => {
      pageParam2.currentPage = page;
      pageParam2.pageSize = pageSize;
      getUsers2(page, pageSize, searchKeyword2.value);
    };
    onMounted(() => {
      getUsers2(pageParam2.currentPage, pageParam2.pageSize);
      getUsers();
      getTypeStore();
    });

    return {
      route,
      selectedType,
      allType,
      router,
      users,
      users2,
      phone,
      filteredProducts,
      handleChange,
      storeId2,
      userLocal,
      typeStore,
      addMyFarvors,
      pageParam,
      searchKeyword,
      onSearch2,
      pageParam2,

      searchKeyword2,
      onChange2,
    };
    //
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

</style>
