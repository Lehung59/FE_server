<template>
  <div id="wrapper">
    <Header />

    <div id="main">
      <div class="wrap">
        <div id="seo" class="f flexJus">
          <ul class="beadcrum" itemscope="" itemtype="https://schema.org/BreadcrumbList">
            <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
              <a itemprop="item" @click="goBack"><span itemprop="name">{{
                product.storeName ? product.storeName.toUpperCase() : ""
              }}</span></a>
              <meta itemprop="position" content="1" />
            </li>

            <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
              <p itemprop="item"><span itemprop="name">{{
                  product.productType ? product.productType.toUpperCase() : ""
                }}</span></p>
              <meta itemprop="position" content="2" />
            </li>
          </ul>
        </div>
      </div>

      <div class="f" itemscope="" itemtype="http://schema.org/Product">
        <div class="wrap flexCol">
          <div class="f bgwhite p15">
            <div id="pLeft" class="rl">
              <div class="f box-zoom flexCen">
                <div id="anhdd" class="f larimg">
                  <img :src="product.avatarProduct" itemprop="image" />
                </div>
              </div>
            </div>
            <div class="w50 fr flexC" style="padding: 0 5%">
              <h1 itemprop="name" class="pname">{{ product.productName }}</h1>
              <span class="priced">
                <u>{{ product.price?.toLocaleString() }}₫</u>
                <b v-if="product.discount && product.discount !== 0">
                  {{
                (
                  (product.price * (100 - product.discount)) /
                  100
                )?.toLocaleString()
              }}₫
                </b>
                <b v-else>
                  {{ (product.price) }}₫
                </b>
              </span>

              <!--tieu ban-->

              <div class="f gtb">
                <label>{{ product.view }} Lượt xem</label>
              </div>
              <div class="edit-number">
                <p>Số lượng:</p>
                <input id="numberItem" type="number" class="input" v-model="numberItem" :min="1"
                  style="padding: 5px 8px; border-radius: 5px; width: 70x" />
              </div>
              <!--het tieu ban-->

              <div class="dvdq flexC">
                <label>Mua ngay và thưởng thức dịch vụ độc quyền</label>
                <ul>
                  <li class="ron">Tên cửa hàng : {{ product.storeName }}</li>

                  <li class="ron">Số lượng : {{ product.quantity }}</li>

                  <li class="ron">Mô tả sản phẩm : {{ product.description }}
                  </li>

                  <li class="ron">Đổi sản phẩm lỗi trong vòng 30 ngày</li>

                  <li class="ron">Cam kết giá rẻ nhất</li>
                </ul>
              </div>

              <div @click="handelAddCart()" class="action">
                <span class="btn2 bcam btnorder"><b>THÊM VÀO GIỎ HÀNG</b>
                  <i> </i>
                </span>
              </div>


              <span class="btn2 bcam btnorder" @click="updatePurchaseData"><b>MUA NGAY</b>
                <i>Mua ngay để hưởng nhiều ưu đãi</i>
              </span>
              <template>
                <a-modal v-model:visible="open" :title="titlee" @ok="handleOk">
                  <p><strong>Khách hàng:</strong> {{ purchaseData.customerName }}</p>
                  <p><strong>Số điện thoại:</strong> {{ purchaseData.phoneNumber }}</p>
                  <p><strong>Địa chỉ:</strong> {{ purchaseData.address }}</p>
                  <p><strong>Tên sản phẩm:</strong> {{ purchaseData.productName }}</p>
                  <p><strong>Giá tiền (cho một sản phẩm):</strong> {{ formatCurrency(purchaseData.price) }}</p>
                  <p><strong>Giảm giá của sản phẩm:</strong> {{ purchaseData.discount }}%</p>
                  <p><strong>Giá sau giảm:</strong> {{ formatCurrency(purchaseData.price * (1 -
                purchaseData.discount / 100)) }}</p>
                  <p><strong>Số lượng:</strong> {{ purchaseData.quantityBuy }}</p>
                  <p><strong>Phí vận chuyển:</strong> {{ formatCurrency(purchaseData.shippingFee) }}</p>
                  <p><strong>Tổng tiền:</strong> {{ formatCurrency(purchaseData.shippingFee + purchaseData.price * (1 -
                purchaseData.discount / 100) * purchaseData.quantityBuy) }}</p>

                  <p><strong>Hình thức thanh toán:</strong> {{ purchaseData.paymentMethod }}</p>
                </a-modal>
              </template>
              <!-- <BuyButton :data="purchaseData" /> -->



              <!-- <div @click="handelByNow()" class="action">
                <span class="btn2 bcam btnorder"
                  ><b>MUA NGAY</b>
                  <i>Mua ngay để hưởng nhiều ưu đãi</i>
                </span>
              </div> -->
              <ul class="bphone">
                <li>Số điện thoại của cửa hàng <b>{{ phone }}</b></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    <!-- <div id="footer">
      <div class="f" style="padding: 40px 0">
        <div class="wrap flexJus">
          <div class="f flex">
            <div class="fotb" style="width: 30%; padding-right: 30px">
              <img src="https://denled.com/Content/img/logo-foot.png" alt="Denled.com" width="286" height="60" />
            </div>
            <div class="fotb" style="width: 50%; padding: 0 40px 0 60px">
              <label>SHOWROOM</label>
              <div class="muahang f flexC">
                <div class="showrooms">
                  <ul>
                    <li>Hệ thống hỗ trợ quản lí và bán hàng tạp hóa</li>
                    <li>
                      <span>Địa chỉ 1 : </span>21C Trần Duy Hưng, Cầu Giấy, HN
                    </li>
                    <li>
                      <span>Hotline : </span><a href="tel:0933665115">0933.66.5115</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="fotb">
              <label>THÔNG TIN - HƯỚNG DẪN</label>
              <ul>
                <li>
                  <a title="Giới Thiệu Hệ Thống" rel="nofollow" href="/">Giới Thiệu Hệ Thống</a>
                </li>

                <li>
                  <a title="Giao hàng &amp; Thanh toán" rel="nofollow" href="/">Giao hàng &amp; Thanh toán</a>
                </li>

                <li>
                  <a title="Hướng dẫn mua hàng Online" rel="nofollow" href="/">Hướng dẫn mua hàng Online</a>
                </li>

                <li>
                  <a title="Quy chế hoạt động" rel="nofollow" href="/">Quy chế hoạt động</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="f p10 cen trang copyright">
        © 2024 bản quyền thuộc về HungNL@gmail.com
        <a href="https://denled.com" title="Siêu thị đèn LED">denled.com</a>
      </div>

      <ul id="panel">
        <li>
          <img src="https://denled.com/Content/img/totop.svg" alt="To top" width="45" height="45" />
        </li>
        <li style="padding-top: 10px; padding-bottom: 10px">
          <img alt="Messenger" src="https://denled.com/Content/img/messenger.svg" width="45" height="45" />
        </li>

        <li>
          <img alt="Phone" src="https://denled.com/Content/img/phone.svg" width="45" height="45" />
        </li>
      </ul>
      <div class="zalo-chat-widget" data-oaid="2839194858446814357"
        data-welcome-message="Rất vui khi được hỗ trợ bạn!. Nếu bạn không thể chờ thì hãy gọi hoặc nhắn tin đến số điện thoại này 0973.66.5115."
        data-autopopup="1800" data-width="500" data-height="500" style="right: 12px"></div>
    </div> -->
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  defineComponent,
  ref,
  reactive,
  toRefs,
  watch
} from "vue";
import { cloneDeep } from "lodash-es";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import {
  DeleteOutlined,
  CheckOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { useMenu } from "../../stores/use-menu.js";
import ApiViewData from "../../api/ApiViewData.js";
import BaseCommon from "../../api/BaseCommon.js";
import ApiMeasuringTool from "../../api/ApiMeasuringTool.js";
import { useAuthStore } from "../../stores/auth.store.js";
import Header from "../../components/HeaderCustomer.vue";
import Footer from "../../components/footer2.vue";

export default defineComponent({
  components: {
    Header,
    Footer

  },

  setup() {
    const titlee = ref("Xác nhận đặt hàng");
    const buyButton = ref(null);
    const numberItem = ref(1)
    const product = ref({});
    const quantity = ref(0);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const route = useRoute();
    const productId = route.params.id;
    const phone = route.query.storePhone;
    const router = useRouter();
    const userLocal = JSON.parse(localStorage.getItem("auth"));
    const token = JSON.parse(localStorage.getItem("token")); // Lấy token từ localStorage
    const userData = ref(null);
    const open = ref(false);
    const confirmLoading = ref(false);

    const purchaseData = reactive({
      productId: null,
      quantityBuy: null,
      quantityStoke: null,
      customerName: null,
      phoneNumber: null,
      address: null,
      productName: null,
      price: null,
      discount: null,
      open: false,
      typee: null,
      shippingFee: 30000,
      paymentMethod: "Thanh toán khi nhận hàng"
    });

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value);
    };
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${apiPrefix}/api/v1/product/info/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        );
        if (response.data.status === "OK") {
          product.value = response.data.data;
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
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
    const handelAddCart = () => {
      const newData = Number(numberItem.value);
      if (newData < 1) {
        alert("Số lượng tối thiểu là 1");
      } else if (newData > product.value.quantity) {
        alert(`Số lượng không được vượt quá ${product.value.quantity}`);
      } else {
        addToCart(newData);
      }
    };

    const updatePurchaseData = () => {


      const quantityBuy = numberItem.value;
      const quantityStoke = product.quantity;

      if (quantityBuy < 1) {
        alert("Số lượng tối thiểu là 1");
      } else if (quantityBuy > quantityStoke) {
        alert(`Số lượng không được vượt quá ${quantityStoke}`);
      } else {
        purchaseData.productId = productId;
        purchaseData.quantityBuy = numberItem.value;
        purchaseData.quantityStoke = product.value.quantity;
        purchaseData.customerName = `${userLocal.firstname} ${userLocal.lastname}`;
        purchaseData.phoneNumber = userData.value.phoneNumber; // Set as needed
        purchaseData.address = userData.value.address; // Set as needed
        purchaseData.productName = product.value.productName;
        purchaseData.price = product.value.price;
        purchaseData.discount = product.value.discount;
        purchaseData.open = true;
        purchaseData.typee = "mua-truc-tiep";
        open.value = true
      }



    };

    watch(numberItem, (newValue) => {
      purchaseData.quantity = newValue;
    });


    const handleOk = () => {
      confirmLoading.value = true;
      titlee.value = "Đang xử lí đơn hàng của bạn";
      setTimeout(() => {
        open.value = false;
        confirmLoading.value = false;
      }, 2000);

      handelByNow();
    };

    const handelByNow = async () => {
      const productId = purchaseData.productId;
      const quantityBuy = purchaseData.quantityBuy;


      const formData = new FormData();
      formData.append("productid", productId);
      formData.append("quantity", quantityBuy);
      axios
        .post(`${apiPrefix}/api/v1/customer/order/insert`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          message.success(
            "Đặt hàng thành công, hãy xem trạng thái đơn hàng của bạn"
          );
        })
        .catch((error) => {
          if (error.response && error.response.data) {
          // Xử lý khi có lỗi từ phản hồi của API
          console.error('Lỗi khi gọi API:', error.response.data.message);
          message.error(error.response.data.message);
        } else {
          // Xử lý khi có lỗi khác, chẳng hạn mạng chập chờn
          console.error('Đã xảy ra lỗi:', error.message);
          message.error('Đã xảy ra lỗi');
        }        });
    };

    const getUserData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token")); // Lấy token từ localStorage
        const response = await axios.get(
          `${apiPrefix}/api/v1/account/profile/view`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào headers
            },
          }
        );
        userData.value = response.data.data;
      } catch (error) {
        console.error(error);
      }
    };

    const addToCart = async (q) => {
      const formData = new FormData();
      formData.append("productid", productId);
      formData.append("quantity", q);
      axios
        .post(`${apiPrefix}/api/v1/customer/cartitem/insert`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          message.success("Thêm vào giỏ hàng thành công");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onMounted(() => {
      fetchProduct();
      getUserData();

    });
    return {
      updatePurchaseData,
      formatCurrency,
      titlee,
      open,
      handleOk,
      purchaseData,
      numberItem,
      purchaseData,
      product,
      router,
      route,
      userLocal,
      handelAddCart,
      handelByNow,
      phone,
      goBack
    };
  },
});
</script>

<style scoped>
* {
  list-style: none outside none;
  text-decoration: none;
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
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

.fa:before,
.fa:after,
.faa:after,
.ron:before,
.roff:before {
  font: 14px/1 FontAwesome;
}

.fa:before {
  padding-right: 5px;
}

.fa:after,
.faa:after {
  padding-left: 5px;
}

.oon:before,
.ooff:before {
  font: 13px/25px "FontAwesome";
  margin-right: 5px;
  color: #ea9b40;
}

.ooff:before {
  content: "\f10c";
}

.oon:before {
  content: "\f192";
}

.roff:before {
  content: "\f096";
}

.ron:before {
  content: "\f046";
}

.ilocation:before {
  content: "\f041";
}

.iphone:before {
  content: "\f095";
}

.gg:before {
  content: "\f1a0";
}

.face::before {
  content: "\f09a";
}

.ytb::before {
  content: "\f167";
}

.iplay:before {
  content: "\f04b";
}

.config:before {
  content: "\f013";
}

.igift:before {
  content: "\f06b";
}

.iwarning:before {
  content: "\f071";
}

.iseach:before {
  content: "\f002";
}

.iangright:before {
  content: "\f105";
}

.iarowdow:before {
  content: "\f107";
}

.iarowup:before {
  content: "\f106";
}

.iarowdow-af:after {
  content: "\f107";
}

.iarowup-af:after {
  content: "\f106";
}

.isort:before {
  content: "\f0dc";
}

.iclose:before,
.tag:after {
  content: "\f00d";
}

.iback:before {
  content: "\f177";
}

.isearch:before {
  content: "\f002";
}

.ihangright:before {
  content: "\f0a4";
}

.icart:before {
  content: "\f07a";
}

.icheck:before {
  content: "\f00c";
}

.iquestion:before {
  content: "\f128";
}

.fa2:before {
  font: 18px/25px FontAwesome;
}

.icircle:before {
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  float: left;
  text-align: center;
  margin-right: 10px;
}

.hide {
  display: none;
}

img {
  max-width: 100%;
  max-height: 100%;
}

a {
  border: 0 none;
  color: #06f;
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  color: #ea9b40;
  text-decoration: none;
}

a:focus {
  outline: medium none;
}

.mf {
  font-size: 11px;
  line-height: 13px;
}

.blog {
  width: 80%;
  margin: 0 auto;
  display: table;
}

.list-link a {
  padding: 0 5px;
  text-transform: uppercase;
}

/*box-shadow*/
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
  height: max-content;
}

/*background*/
.bgwhite {
  background: #fff;
}

.bgghi {
  background: #f5f9fa;
}

/*chip*/
.li,
.loiich p,
.loiich a {
  border: 1px solid #fbac51;
  color: #fbac51;
  padding: 3px;
  display: inline-block;
  border-radius: 4px;
}

.v {
  color: #333;
  font: 11px arial;
  padding: 0 10px;
}

.v span {
  display: block;
  font-size: 15px;
}

.saleoff {
  width: 40px;
  height: 25px;
  border-radius: 0 0 0 8px;
  font: bold 12px/25px arial;
  top: 0;
  right: 0;
  display: block;
  background: #d2222a;
  color: #fff;
  position: absolute;
  text-align: center;
}

.tag {
  display: inline-block;
  vertical-align: text-bottom;
  padding: 3px;
  background: #1ea9c7;
  font-size: 11px;
  color: #fff;
  border-radius: 4px;
  margin: 0 2px;
  cursor: pointer;
}

.tag2 {
  display: inline-block;
  text-indent: 0;
  padding: 3px 10px;
  border: 1px solid #1ea9c7;
  font-size: 11px;
  color: #1ea9c7;
  border-radius: 4px;
  margin: 0 2px;
  cursor: pointer;
}

.tag:hover {
  color: #fff;
}

.back {
  display: inline-block;
  vertical-align: text-bottom;
  padding: 6px;
  font-size: 12px;
  color: #288ad6;
  margin-right: 5px;
}

.tag:after {
  font: 11px/1 FontAwesome;
  padding-left: 3px;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #d0021b;
  border-radius: 100%;
  display: inline-block;
  margin-right: 15px;
}

.dot .ping {
  border: 1px solid #d0021b;
  width: 10px;
  height: 10px;
  opacity: 1;
  background-color: rgba(238, 46, 36, 0.2);
  border-radius: 100%;
  margin: -2px 0 0 -2px;
  -moz-animation: sonar 1.25s linear infinite;
  -o-animation: sonar 1.25s linear infinite;
  -webkit-animation: sonar 1.25s linear infinite;
  animation: sonar 1.25s linear infinite;
  display: block;
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

/*pading*/
.p5 {
  padding: 5px;
}

.p10 {
  padding: 10px;
}

.p10_0 {
  padding: 10px 0;
}

.p20_0 {
  padding: 20px 0;
}

.p15 {
  padding: 15px;
}

.p20 {
  padding: 20px;
}

/*margin*/
.m10 {
  margin: 10px 0;
}

/*boder*/
.bo,
.bo-samecolor,
.bov {
  border-width: 1px;
  border-style: solid;
}

.bo {
  border-color: #ddd;
}

.bov {
  border-color: #ea9b40;
}

.bo2 {
  border: 5px solid #f5f9fa;
}

.bb {
  border-bottom: 1px solid #ddd;
}

/*layout*/
.f,
.iv div {
  width: 100%;
  float: left;
}

.w10 {
  width: 10%;
}

.w20 {
  width: 20%;
}

.w25 {
  width: 25%;
}

.w30 {
  width: 30%;
}

.w40 {
  width: 40%;
}

.w50 {
  width: 50%;
}

.w60 {
  width: 60%;
}

.w70 {
  width: 70%;
}

.w80 {
  width: 80%;
}

/*color*/
.xanh {
  color: #0f839c;
}

.trang {
  color: #fff;
}

.vang {
  color: #ea9b40;
}

.red {
  color: red;
}

.green {
  color: green;
}

/*align*/
.cen,
.v {
  text-align: center;
}

.jus {
  text-align: justify;
}

.r {
  text-align: right;
}

.l {
  text-align: left;
}

.r0 {
  right: 0;
}

/*float*/
.fl,
.w10,
.w20,
.w25,
.w30,
.w40,
.w50,
.w60,
.w70,
.w80 {
  float: left;
}

.fr {
  float: right;
}

.clearfix:after {
  clear: both;
  content: " ";
  display: block;
  font-size: 0;
  height: 0;
  line-height: 0;
  visibility: hidden;
  width: 0;
}

.clearfix {
  display: block;
}

.flexJus,
.waranty {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flexCen,
.waranty {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flexL {
  display: flex;
  justify-content: start;
  align-items: center;
}

.flexE,
.bcta {
  display: flex;
  justify-content: end;
  align-items: center;
}

.flexCol {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.flexC {
  display: flex;
  flex-direction: column;
}

.flex {
  display: flex;
  justify-content: space-between;
}

/*position*/
.rl {
  position: relative;
}

.ab {
  position: absolute;
}

/*box*/
.bgtit,
.box-tit {
  background: #eee;
  color: #333;
  text-indent: 10px;
}

.bgtit a {
  color: #0f839c;
}

.bgtit a:hover {
  text-decoration: underline;
}

/*box-tit*/
.box-tit {
  height: 40px;
  padding: 0 10px;
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

.td {
  display: block;
  color: #444;
  font: 26px/30px arial;
  text-align: center;
  float: left;
  margin: 20px 0;
  width: 100%;
}

/*display*/
.db {
  display: block;
}

/*button*/
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

.bcam {
  background-color: #f59023;
}

.bcam:hover {
  background-color: #ca7a0c;
}

.bxanh {
  background-color: #0f839c;
}

.bxanh:hover {
  background-color: #0c6d82;
}

.viewcart {
  font: bold 11px/30px arial;
  padding: 0 7px;
  cursor: pointer;
}

.w250 {
  width: 250px;
}

.w280 {
  width: 280px;
}

/*more*/
.more {
  display: inline-block;
  line-height: 30px;
  padding: 5px;
  font: 12px arial;
  color: orangered;
}

.more::after {
  font: 13px/20px "FontAwesome";
  content: "\f0da";
  margin-left: 3px;
}

.imore {
  overflow: hidden;
}

.bmore {
  color: #0f839c;
  display: inline-block;
  font: 12px/30px arial;
  border: 1px solid #0f839c;
  border-radius: 5px;
  padding: 0 15px;
}

.bmore i:after {
  content: "\f0d7";
  font: 14px/1 FontAwesome;
  color: #295874;
  padding-left: 5px;
}

.moreup:after {
  content: "\f0d8" !important;
}

.truot {
  display: flex;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
}

.truot li {
  width: 100px;
  flex: 0 0 100px;
  display: inline-block;
}

/*list*/
.tiplist {
  display: table;
  border-radius: 10px;
  text-align: justify;
}

.tiplist li {
  width: 100%;
  float: left;
  margin: 4px 0;
  border: none !important;
}

.tiplist li:before {
  content: "\f111";
  font: 6px/20px "FontAwesome";
  vertical-align: top;
  margin-right: 10px;
  color: #aaa;
}

.tipcheck li:before {
  content: "\f00c" !important;
  font: 13px/16px "FontAwesome";
}

.tiplist h2,
.tiplist h3,
.tiplist h4 {
  display: inline;
}

/*phan trang*/
#phantrang {
  float: right;
  margin: 10px;
}

#phantrang li {
  display: inline-block;
  margin-right: 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: #fff;
}

#phantrang li a {
  font: bold 13px/15px arial;
  color: #333;
  display: block;
}

#phantrang li.current a {
  color: red;
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

body {
  color: #333;
  font: 15px normal Arial, Helvetica, sans-serif;
  margin: 0 auto;
  min-width: 1200px;
  line-height: 1.6em;
  background: #f8f8f8;
}

h4,
h5,
h6,
h7 {
  font: bold 12px/17px arial;
}

h1 {
  font: bold 22px/25px arial;
  margin-bottom: 15px;
}

h2 {
  font: bold 18px/20px arial;
  margin-bottom: 10px;
}

p {
  margin: 0 0 5px;
}

a img,
img a {
  border: medium none;
}

object {
  display: block;
}

select,
input,
textarea {
  font: 100% Arial, Verdana, Sans-Serif;
}

* html .clearfix {
  height: 1%;
}

.center {
  text-align: center;
}

.lg {
  float: left;
  margin: 3px 0;
  width: 100%;
}

.fb_iframe_widget {
  margin-right: 2px;
  vertical-align: top;
}

.schema {
  display: none;
}

.pselect,
.pselect a {
  color: #fff !important;
}

.morevideo {
  display: block;
  text-align: center;
  font: bold 12px/28px arial;
  color: red !important;
}

.morevideo:before {
  font: 15px/25px "FontAwesome";
  content: "\f03d";
  margin-right: 5px;
}

/*dan trang*/
#wrapper {
  float: left;
  width: 100%;
}

.wrap {
  width: 98%;
  margin: 0 auto;
  max-width: 1300px;
}

#footer {
  width: 100%;
  float: left;
  margin-top: 20px;
  background: #000;
}

#header {
  width: 100%;
  float: left;
  position: relative;
}

#main {
  float: left;
  width: 100%;
}

#main:before {
  clear: both;
}

#center {
  width: 100%;
  display: block;
  margin: 0 10px;
}

#module {
  width: 82%;
  float: left;
}

/*header*/
.bi {
  background: url("/Content/img/i/icon-logo.png") no-repeat;
}

.head1 {
  padding: 15px 0;
  background: #000;
}

.head2 {
  background: #ffd52f;
}

.head1 {
  position: relative;
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

.open span b {
  color: white;
  font-weight: normal;
}

.hl:before,
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

.hl:before {
  background-position: -50px -0px;
}

.open label span {
  text-align: left;
  color: #ffd52f;
  font: bold 15px arial;
  display: block;
}

/*menu*/
.nav li,
.nav li .c1 {
  display: inline-block;
}

.nav li .c1 span {
  font: bold 13px/13px arial;
  padding: 0 10px;
  color: #000;
  display: inline-block;
  padding: 10px 8px;
}

.nav li:nth-last-child(1) .c1 span {
  border-right: none;
}

.nav li .c1:hover,
.active {
  color: #ea9b40 !important;
}

.nav li {
  position: static;
}

.nav li figure {
  display: none;
  position: absolute;
  left: 0;
  width: 100%;
  padding: 30px;
  background: #fff;
  z-index: 2;
  box-shadow: 0 2px 5px #aaa;
}

.nav li div a {
  float: left;
  width: 160px;
  height: 190px;
  margin: 5px 23px 15px;
}

.nav li div a b {
  text-transform: uppercase;
  display: block;
  font: bold 12px/14px arial;
  margin: 10px 0 0;
  color: #444;
  text-align: center;
}

.close {
  float: left;
  width: 100%;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
}

.close label {
  display: inline-block;
  border: 1px solid #aaa;
  font: 13px/35px arial;
  border-radius: 5px;
  padding: 0 20px;
  color: #aaa;
}

.list li {
  border-bottom: 1px solid #ddd;
}

.list li:nth-last-child(1) {
  border-bottom: none;
}

.search-box form {
  width: 300px;
  position: relative;
}

.search-box .textbox {
  height: 32px;
  width: 100%;
  border-radius: 25px;
  padding: 0 10px;
}

.search-box button {
  position: absolute;
  right: 0;
  top: 3px;
  text-align: center;
  width: 28px;
  height: 24px;
  background: transparent;
  color: #888;
}

.vcart2:before {
  font: 21px/1 FontAwesome;
  padding-right: 2px;
}

.vcart2 {
  color: #000;
  padding-left: 14px;
  cursor: pointer;
  position: relative;
  font-size: 18px;
}

/*end header*/
#seo {
  margin: 10px 0;
}

.content {
  font-size: 14px;
  line-height: 22px;
  text-align: justify;
  color: rgba(0, 0, 0, 0.7);
}

.content h2 {
  font: bold 20px/22px arial;
  margin: 30px 0 5px;
}

.content h3 {
  font: bold 20px/22px arial;
  display: inline-block;
}

/*beadcrum*/
.beadcrum {}

.beadcrum li {
  display: inline-block;
  font: 11px/32px arial;
}

.beadcrum li a {
  color: #232f3e;
}

.beadcrum li span,
.beadcrum li h1 {
  font: 11px/32px arial;
  margin: 0;
}

.beadcrum span:after,
.beadcrum h1:after {
  font: 14px/1 FontAwesome;
  content: "\f105";
}

.beadcrum span:after,
.beadcrum h1:after {
  padding: 0 5px;
}

/*banner*/
.sapobanner {
  position: relative;
}

.sapobanner figure {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
}

.sapobanner .sapold {
  padding: 20px 50px;
  margin: 0 auto;
  max-width: 800px;
  border-radius: 15px;
  font-size: 18px;
}

.sapobanner h1 {
  font: bold 42px/35px arial;
  margin-bottom: 15px;
  text-align: center;
  padding-bottom: 10px;
}

.sapobanner {
  font-size: 14px;
  text-align: justify;
}

.sapobanner a {
  color: #eee;
}

.sapobanner h3 {
  text-align: center;
  display: block;
  font: bold 15px arial;
  margin: 10px 0;
}

.sapobanner img {
  display: block;
  margin: 0 auto;
  width: auto;
  height: auto;
}

.sapobanner .beadcrum a {
  color: orange;
}

.sapobanner .beadcrum span {
  font-size: 13px;
}

/*thuoc tinh*/
.property {
  background: #f8f8f8;
  padding: 0 0 20px;
}

.prol {
  width: 60%;
}

.pror {
  width: 40%;
}

.prol img {}

.propertyhead label {
  font: bold 18px/60px arial;
  display: inline-block;
}

.propertyhead label:nth-child(1) {
  width: 60%;
}

.propertyhead label:nth-child(2) {
  width: 40%;
}

.pl {
  height: 280px;
}

.prol figure a {
  margin-right: 2%;
  float: left;
  width: 100%;
  text-align: center;
}

.prol figure a span {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 214px;
  padding: 5px;
}

.plnoslide figure a span {
  width: 130px;
}

.prol figure a h2 {
  font: 14px arial;
  margin-top: 10px;
}

.hang {
  width: 100%;
  overflow-y: auto;
  text-align: center;
}

.hang h2 {
  float: left;
  margin: 5px;
  font: 14px/35px arial;
  padding: 0 10px;
  border-radius: 10px;
  background: #000;
  color: orange;
}

.cur {
  border-color: orange !important;
}

.othpro {
  margin-left: 20px;
}

.othpro label {
  padding: 0 10px;
  font: 13px/33px arial;
  color: #000;
}

.othpro label::after {
  content: "\f0d7";
  font: 15px FontAwesome;
  padding-left: 8px;
  color: #000;
}

.othpro div {
  display: none;
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px 15px;
  min-width: 310px;
  z-index: 1;
}

.othpro li {
  position: relative;
  background: #ffd52f;
  margin-right: 5px;
  border-radius: 5px;
}

.othpro li:hover>div {
  display: block;
}

.othpro div a {
  width: 100%;
  float: left;
  font: 13px/30px arial;
  color: #555;
  cursor: pointer;
}

.othpro div a h2 {
  font: 13px/30px arial;
  color: #555;
  margin: 0;
  display: inline-block;
}

.othpro div a:before,
.prol h2:before {
  font: 14px/1px FontAwesome;
  margin-right: 5px;
  color: #999;
}

.on:before,
.plon h2:before {
  content: "\f192" !important;
}

.othpro div a:before,
.ploff h2:before {
  content: "\f10c";
}

#pLeft {
  width: 48%;
  float: left;
  margin: 1% 2% 0 0;
}

#pFull {
  width: 100%;
  float: left;
  padding-bottom: 10px;
}

.pname {
  font: 22px/28px arial;
  margin: 20px 0 10px;
}

.btnorder b {
  display: block;
}

.uudiem {
  margin: 15px 0 0;
  padding: 30px;
  background: #fff;
}

.uudiem li {
  font: 15px/20px arial;
  margin-bottom: 8px;
  text-align: justify;
}

.uudiem li:before {
  content: "\f00c";
  font: 13px FontAwesome;
  padding-right: 10px;
  color: #0f839c;
  vertical-align: top;
  line-height: 21px;
}

.btn2 {
  display: block;
  color: #fff;
  padding: 5px 10px;
  text-align: center;
  cursor: pointer;
}

.btn2:hover {
  color: #fff;
}

.btn2 b,
.btn b {
  display: block;
  font: bold 16px/17px arial;
}

.btn2 i,
.btn i {
  font: 12px arial;
}

.larimg {
  height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listimg li {
  padding: 2px;
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  margin: 2px;
}

.box-zoom:hover>.zoom {
  display: block;
}

.zoom {
  border-radius: 4px;
}

#anhts img,
#anhtt img {
  height: 400px;
}

.cm label {
  background: #ffd52f;
  color: #000;
  padding: 10px 20px;
  display: block;
  margin-top: 30px;
}

.cmw {
  background: #eee;
  padding: 40px 20px;
  margin-bottom: 50px;
}

.gs {
  padding: 0 0 15px;
}

.gs span {
  display: inline-block;
  width: 50%;
  font-weight: bold;
}

.gs b {
  color: red;
  font-weight: normal;
}

.gh {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 25px 0;
  margin: 20px 0;
}

.gh ul {
  display: flex;
  width: 33.33%;
  float: left;
}

.gh ul li:nth-child(1) {
  width: 130px;
}

.gh li:nth-child(1):before {
  content: "\f098";
  font: 14px FontAwesome;
  padding-right: 5px;
  color: red;
}

.gh a {
  display: block;
  color: red;
}

.gc b {
  color: red;
}

.gc li {
  width: 50%;
  float: left;
}

.gc li:before {
  content: "\f101";
  font: 14px FontAwesome;
  padding-right: 5px;
  color: red;
}

.contenttab img {
  display: block;
}

.contenttab h2 {
  float: left;
  width: 100%;
  margin: 20px 0 10px;
  font: bold 18px/1.5 arial;
  text-align: left;
}

.contenttab h3 {
  float: left;
  width: 100%;
  margin: 15px 0 5px;
  font: bold 16px/1.5 arial;
  text-align: left;
}

.lts li:before {
  font: 6px/23px "FontAwesome";
  padding-right: 5px;
  color: #0f839c;
  vertical-align: top;
  content: "\f111";
}

.lts li {
  padding: 4px 10px;
  float: left;
  width: 100%;
}

.lts a {
  color: #0f839c;
}

.lts li:nth-child(2n + 1) {
  background: #f5f9fa;
}

.list-text {
  line-height: 25px;
}

.list-text li {
  padding: 5px;
}

.list-text li:nth-child(2n) {
  background: #fafafa;
}

.priced {
  font: 16px/35px arial;
  display: block;
  position: relative;
  color: #666;
  margin: 10px 0;
}

.priced b {
  color: #e64b4b;
  font-size: 30px;
  padding: 0 20px;
}

.priced u {
  font-size: 16px;
  text-decoration: line-through;
}

.priced i {
  color: #fff;
  font: bold 13px arial;
  background: #d0011b;
  padding: 0 10px;
}

.gift {
  border: 1px solid #0f839c;
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
}

.gift li {}

.gift li:before {
  content: "\f111";
  font: 4px FontAwesome;
  padding-right: 10px;
  vertical-align: top;
  line-height: 20px;
}

.gift li a {
  color: #333;
}

@-webkit-keyframes my {
  0% {
    color: #333;
  }

  50% {
    color: #e12828;
  }
}

@-moz-keyframes my {
  0% {
    color: #333;
  }

  50% {
    color: #e12828;
  }
}

@-o-keyframes my {
  0% {
    color: #333;
  }

  50% {
    color: #e12828;
  }
}

@keyframes my {
  0% {
    color: #333;
  }

  50% {
    color: #e12828;
  }
}

.dvdq {
  margin-top: 25px;
}

.dvdq label {
  display: block;
  text-align: center;
  color: #0f839c;
  margin-bottom: 10px;
  font: bold 17px arial;
  text-transform: uppercase;
}

.dvdq ul li {
  float: left;
  width: 100%;
  line-height: 23px;
}

.dvdq li:before {
  padding-right: 10px;
  color: #666;
}

.dvdq ul li b {
  float: right;
  display: inline-block;
}

.dvdq p {
  display: block;
  border-top: 1px solid #ddd;
  margin: 10px 0 0;
  text-align: center;
  padding-top: 10px;
}

.dvdq p b {
  color: #0f839c;
  font-size: 16px;
}

.action {
  margin-top: 10px;
}

.action span {
  margin-bottom: 10px;
}

.action .bxanh {
  margin-bottom: 10px;
}

.contenttab {
  float: left;
}

.contenttab {
  width: 100%;
  padding: 15px 0;
  margin: 15px auto;
  line-height: 22px;
  text-align: justify;
}

li#ct1,
li#ct2 {
  padding: 10px;
  float: left;
  min-height: 250px;
}

.star0,
.star1,
.star2,
.star3,
.star4,
.star5 {
  font-weight: 700;
  height: 15px;
  display: inline-block;
  width: 70px;
}

.star0 {
  background: url(/Content/img/sao.png) no-repeat scroll 0 -72px;
}

.star1 {
  background: url(/Content/img/sao.png) no-repeat scroll 0 0;
}

.star2 {
  background: url(/Content/img/sao.png) no-repeat scroll 0 -18px;
}

.star3 {
  background: url(/Content/img/sao.png) no-repeat scroll 0 -38px;
}

.star4 {
  background: url(/Content/img/sao.png) no-repeat scroll 0 -55px;
}

.star5 {
  background: url(/Content/img/sao.png) no-repeat scroll 0 -85px;
}

table {
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
  width: 100% !important;
  margin: 0 auto !important;
}

table tr {
  border: 1px solid #aaa;
}

table th {
  background: #777 none repeat scroll 0 0;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  padding: 12px;
}

table td {
  color: #333;
  padding: 5px 8px;
  border-right: 1px solid #aaa;
  text-indent: 15px;
}

table tr td:nth-child(2n) {
  font-weight: bold;
}

table tbody>tr:nth-child(2n + 1)>td {
  background: #f9f9f9;
}

.tab {
  background: #f8f8f8;
}

.tab li {
  font: 15px/55px arial;
  border-bottom: 4px solid #f8f8f8;
  padding: 0 30px;
  cursor: pointer;
}

.tab li.selec,
.tab li:hover {
  border-bottom-color: orange;
  color: #0f839c;
}

/*dac diem*/
.dacdiem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.dacdiem img,
.dacdiem object {
  max-width: 100%;
  display: block;
}

.dacdiem h2 {
  font: 25px/30px arial;
  margin: 20px 0;
  color: #555;
}

.dacdiem p {
  font: 16px/25px arial;
  color: #666;
}

.dacdiem:nth-last-child(1) {
  border-bottom: none;
}

.ddimg,
.ddinfo {
  width: 50%;
  float: left;
}

.ddinfo {
  padding: 0 80px;
  text-align: justify;
  font-size: 16px;
}

#formvote {
  float: left;
  margin: 10px 0;
}

#formvote div {
  width: 30%;
  padding-left: 20px;
}

#formvote div p {
  margin: 10px 0;
}

#formvote div input[type="text"] {
  font: 14px/30px arial;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
  text-indent: 5px;
}

#formvote textarea {
  font: 14px/30px arial;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 70%;
  text-indent: 5px;
}

#formvote div input[type="radio"] {
  font: bold 14px/30px arial;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
}

#formvote div input[type="submit"] {
  font: bold 14px/30px arial;
  color: #fff;
  border: 1px solid #ddd;
  padding: 0 5px;
  background: orange;
  cursor: pointer;
}

.review {
  float: left;
  width: 100%;
  padding: 15px 10px;
  border-bottom: 1px solid #ddd;
}

.rava {
  background: #bababa;
  float: left;
  font: 700 12px/40px arial;
  height: 40px;
  margin-right: 10px;
  text-align: center;
  width: 40px;
  color: #fff;
  border-radius: 4px;
}

.rcom {
  display: table-cell;
  margin-left: 20px;
  box-sizing: border-box;
  width: 2000px;
}

.rcom strong {
  font: bold 13px/25px arial;
  color: #666;
}

.rcom strong i {
  padding-left: 5px;
  font: 12px/10px arial;
  display: inline-block;
  color: #666;
  border-radius: 4px;
}

.rcom p {
  font: 13px/20px arial;
  text-align: justify;
}

.review .time {
  font-weight: normal;
}

.review .s {
  width: 100px;
  margin: 0;
  display: block;
}

.procop {
  float: left;
  width: 100%;
  margin: 10px 0 5px;
  border-radius: 4px;
  text-align: center;
}

.dpromo {
  border: 1px solid #ddd;
}

.dpromo label {
  font: bold 15px/40px arial;
  background: #e12828;
  color: #fff;
  float: left;
  width: 100%;
  border-radius: 4px 4px 0 0;
}

.dpromo figure {
  display: flex;
  justify-content: center;
  padding: 5px 0;
  align-items: center;
  background: #eee;
  float: left;
  width: 100%;
}

.dpromo figure b {
  font: bold 26px/40px arial;
  color: #e12828;
  margin-right: 15px;
}

.dcou div {
  float: left;
  text-align: left;
}

.dcou div:nth-child(1) {
  border-right: 1px solid #ddd;
  padding-right: 15px;
  margin-right: 15px;
}

.dcou i {
  display: block;
  background: #0f839c;
  color: #fff;
  font: bold 13px/25px arial;
  padding: 0 15px;
}

.dcou b {
  display: block;
  font: bold 22px/25px arial;
  color: #e12828;
}

.s {
  background-image: url(/Content/img/sao.png);
  background-repeat: no-repeat;
  height: 20px;
  padding-left: 100px;
  display: block;
  font-size: 12px;
}

.s1 {
  background-position: 0 0;
}

.s2 {
  background-position: 0 -26px;
}

.s3 {
  background-position: 0 -53px;
}

.s4 {
  background-position: 0 -80px;
}

.s0 {
  background-position: 0 -101px;
}

.s5 {
  background-position: 0 -123px;
}

.bphone {
  float: left;
  width: 100%;
}

.bphone li {
  margin: 10px 0;
  width: 100%;
  float: left;
  padding: 10px 0;
  border: 1px dashed #ddd;
  text-align: center;
  background: #f5f9fa;
}

.bphone li b {
  display: block;
  font-size: 22px;
  color: red;
  margin-top: 5px;
}

.bphone li:nth-child(1) b {
  color: #0f839c;
}

.catalogue {
  margin: 10px 0;
  font-size: 16px;
  width: 100%;
  float: left;
  padding: 10px 0;
  border: 1px dashed #ddd;
  text-align: center;
  background: #f5f9fa;
}

.catalogue:before {
  font: 16px/1 FontAwesome;
  content: "\f019";
  padding-right: 8px;
}

.listimg {
  display: none;
  margin: 0 5px;
}

.listimg:nth-child(2) {
  display: block;
}

.listimg li {
  float: left;
}

.ttnext,
.ttback {
  display: none;
  float: left;
  height: 100%;
  width: 20px;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.ttnext:before,
.ttback:before {
  font: 34px/1 FontAwesome;
  color: #000;
}

.ttnext:before {
  content: "\f105";
}

.ttback:before {
  content: "\f104";
}

.gtb {
  margin-bottom: 5px;
}

.gtb label {
  display: block;
  line-height: 32px;
  color: #666;
  padding-bottom: 5px;
}

.tieuban {}

.tieuban li {
  border: 1px solid #ddd;
  margin: 3px;
  line-height: 30px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 2px;
  float: left;
}

.tieuban li:hover,
.tbsel {
  border-color: red !important;
  color: red !important;
}

.tuvan {
  margin-top: 20px;
}

.tuvan label {
  font: 18px arial;
  margin-bottom: 10px;
}

.tuvan a {
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 10px;
  color: #333;
}

.tuvan img {
  width: 100px;
}

.tuvan span {
  width: 90%;
  padding-left: 15px;
  font: 16px arial;
}

.parentnode {
  float: left;
  height: 310px;
  width: 100%;
}

.psnext,
.psback {
  display: block;
  float: left;
  height: 100%;
  width: 3%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.psnext:before,
.psback:before {
  font: 34px/1 FontAwesome;
  color: #999;
}

.psnext:before {
  content: "\f105";
}

.psback:before {
  content: "\f104";
}

.pspanel {
  float: left;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 94%;
}

.pswrap {
  position: absolute;
  width: 9900px;
  height: 100%;
}

.pswrap .psitem {
  float: left;
  height: 100%;
  position: relative;
  padding: 5px 10px;
  margin: 5px;
  background: #fff;
}

/**/
.psitem a {
  width: 100%;
  height: 100%;
  float: left;
  margin: 0.5%;
  display: flex;
  flex-direction: column;
  color: #333;
}

.psitem div {
  height: 190px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.psitem div img {
  max-height: 90%;
  max-width: 100%;
}

.psitem strong {
  display: block;
  color: #333;
  font: bold 21px/18px arial;
  margin-top: 5px;
  margin: 10px 0;
}

.psitem strong i {
  color: #666;
  font: 13px/18px arial;
  padding-left: 10px;
}

.psitem strong u {
  color: #666;
  font: 13px/18px arial;
  text-decoration: line-through;
  display: block;
}

.psitem h3 {
  margin-top: 10px;
  font-weight: normal;
}

.combox {
  padding: 5px;
}

.comment {
  position: relative;
  display: flex;
}

.repbox {
  padding-left: 50px;
}

.comment textarea {
  display: inline-block;
  width: 100%;
  height: 60px;
  padding: 6px 15% 6px 6px;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.comment textarea:focus {
  border: 1px solid #f59023;
}

.comment button {
  width: 14%;
  border-radius: 5px;
  border: 1px solid #ccc;
  border-left: none;
  background: #f59023;
  font: bold 13px/40px arial;
  color: #fff;
  position: absolute;
  top: 10px;
  right: 1%;
}

.media {
  float: left;
  width: 100%;
  padding: 15px 0;
}

.media:nth-last-child(1) {
  border: none;
}

.combox label {
  background: #bababa;
  float: left;
  font: 700 12px/40px arial;
  height: 40px;
  margin-right: 10px;
  text-align: center;
  width: 40px;
  color: #fff;
  border-radius: 4px;
}

.qtv {
  background: red !important;
}

.combox section {
  display: table-cell;
  margin-left: 20px;
  width: 2000px;
  text-align: left;
}

.combox section b {
  font: bold 13px/25px arial;
  color: #333;
}

.combox section b i {
  padding: 3px 5px;
  border: 1px solid #ffa63e;
  font: 12px/10px arial;
  display: inline-block;
  margin-left: 10px;
  color: #ffa63e;
  border-radius: 4px;
}

.combox section p {
  text-align: justify;
}

.combox figure {
  float: left;
  width: 100%;
  margin: 0 0 15px;
}

.combox figure * {
  display: inline-block;
}

.combox figure i {
  float: left;
  color: #666;
  font: 12px arial;
}

.combox figure u {
  float: right;
  color: #0f839c;
  cursor: pointer;
  font: 12px arial;
}

.combox ol {
  padding-left: 50px;
}

.combox .l {
  background: #eee;
  padding: 15px;
  border-radius: 4px;
}

.combox ul {
  padding-left: 15px;
  text-align: left;
}

.combox ul li {
  list-style: disc;
}

/*com pop*/
#commentstep2 {
  color: #333;
  padding: 10px;
  clear: both;
  width: 400px;
}

#commentstep2 label {
  display: block;
  border-bottom: 1px solid #ddd;
  font: 700 13px/35px arial;
}

#commentstep2 span {
  display: block;
  margin-top: 10px;
}

#commentstep2 input[type="text"] {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 25px;
  margin-top: 10px;
  text-indent: 10px;
}

#commentstep2 button {
  display: block;
  clear: both;
  float: right;
  margin-top: 10px;
  background: #db0404;
  color: #fff;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
}

.pswp {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  -ms-touch-action: none;
  touch-action: none;
  z-index: 1500;
  -webkit-text-size-adjust: 100%;
  -webkit-backface-visibility: hidden;
  outline: none;
}

.pswp * {
  box-sizing: border-box;
}

.pswp img {
  max-width: none;
}

.pswp--animate_opacity {
  opacity: 0.001;
  will-change: opacity;
  transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
}

.pswp--open {
  display: block;
}

.pswp--zoom-allowed .pswp__img {
  cursor: -webkit-zoom-in;
  cursor: -moz-zoom-in;
  cursor: zoom-in;
}

.pswp--zoomed-in .pswp__img {
  cursor: grab;
}

.pswp--dragging .pswp__img {
  cursor: grabbing;
}

.pswp__bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0;
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  will-change: opacity;
}

.pswp__scroll-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.pswp__container,
.pswp__zoom-wrap {
  -ms-touch-action: none;
  touch-action: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.pswp__container,
.pswp__img {
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

.pswp__zoom-wrap {
  position: absolute;
  width: 100%;
  transform-origin: left top;
  transition: transform 333ms cubic-bezier(0.4, 0, 0.22, 1);
}

.pswp__bg {
  will-change: opacity;
  transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
}

.pswp--animated-in .pswp__bg,
.pswp--animated-in .pswp__zoom-wrap {
  transition: none;
}

.pswp__container,
.pswp__zoom-wrap {
  -webkit-backface-visibility: hidden;
}

.pswp__item {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.pswp__img {
  position: absolute;
  width: auto;
  height: auto;
  top: 0;
  left: 0;
}

.pswp__img--placeholder {
  -webkit-backface-visibility: hidden;
}

.pswp__img--placeholder--blank {
  background: #222;
}

.pswp--ie .pswp__img {
  width: 100% !important;
  height: auto !important;
  left: 0;
  top: 0;
}

.pswp__error-msg {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  margin-top: -8px;
  color: #ccc;
}

.pswp__error-msg a {
  color: #ccc;
  text-decoration: underline;
}

.pswp__button {
  width: 44px;
  height: 44px;
  position: relative;
  background: none;
  cursor: pointer;
  overflow: visible;
  -webkit-appearance: none;
  display: block;
  border: 0;
  padding: 0;
  margin: 0;
  float: right;
  opacity: 0.75;
  transition: opacity 0.2s;
  box-shadow: none;
}

.pswp__button:focus,
.pswp__button:hover {
  opacity: 1;
}

.pswp__button:active {
  outline: none;
  opacity: 0.9;
}

.pswp__button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.pswp__ui--over-close .pswp__button--close {
  opacity: 1;
}

.pswp__button,
.pswp__button--arrow--left:before,
.pswp__button--arrow--right:before {
  background: url(/Content/photoswipe/default-skin.png) 0 0 no-repeat;
  background-size: 264px 88px;
  width: 44px;
  height: 44px;
}

@media (-webkit-min-device-pixel-ratio: 1.1),
(-webkit-min-device-pixel-ratio: 1.09375),
(min-resolution: 105dpi),
(min-resolution: 1.1dppx) {

  .pswp--svg .pswp__button,
  .pswp--svg .pswp__button--arrow--left:before,
  .pswp--svg .pswp__button--arrow--right:before {
    background-image: url(/Content/photoswipe/default-skin.svg);
  }

  .pswp--svg .pswp__button--arrow--left,
  .pswp--svg .pswp__button--arrow--right {
    background: none;
  }
}

.pswp__button--close {
  background-position: 0 -44px;
}

.pswp__button--share {
  background-position: -44px -44px;
}

.pswp__button--fs {
  display: none;
}

.pswp--supports-fs .pswp__button--fs {
  display: block;
}

.pswp--fs .pswp__button--fs {
  background-position: -44px 0;
}

.pswp__button--zoom {
  display: none;
  background-position: -88px 0;
}

.pswp--zoom-allowed .pswp__button--zoom {
  display: block;
}

.pswp--zoomed-in .pswp__button--zoom {
  background-position: -132px 0;
}

.pswp--touch .pswp__button--arrow--left,
.pswp--touch .pswp__button--arrow--right {
  visibility: hidden;
}

.pswp__button--arrow--left,
.pswp__button--arrow--right {
  background: none;
  top: 50%;
  margin-top: -50px;
  width: 70px;
  height: 100px;
  position: absolute;
}

.pswp__button--arrow--left {
  left: 0;
}

.pswp__button--arrow--right {
  right: 0;
}

.pswp__button--arrow--left:before,
.pswp__button--arrow--right:before {
  content: "";
  top: 35px;
  background-color: rgba(0, 0, 0, 0.3);
  height: 30px;
  width: 32px;
  position: absolute;
}

.pswp__button--arrow--left:before {
  left: 6px;
  background-position: -138px -44px;
}

.pswp__button--arrow--right:before {
  right: 6px;
  background-position: -94px -44px;
}

.pswp__counter,
.pswp__share-modal {
  user-select: none;
}

.pswp__share-modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 10px;
  position: absolute;
  z-index: 1600;
  opacity: 0;
  transition: opacity 0.25s ease-out;
  -webkit-backface-visibility: hidden;
  will-change: opacity;
}

.pswp__share-modal--hidden {
  display: none;
}

.pswp__share-tooltip {
  z-index: 1620;
  position: absolute;
  background: #fff;
  top: 56px;
  border-radius: 2px;
  display: block;
  width: auto;
  right: 44px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  transform: translateY(6px);
  transition: transform 0.25s;
  -webkit-backface-visibility: hidden;
  will-change: transform;
}

.pswp__share-tooltip a {
  display: block;
  padding: 8px 12px;
  color: #000;
  text-decoration: none;
  font-size: 14px;
  line-height: 18px;
}

.pswp__share-tooltip a:hover {
  text-decoration: none;
  color: #000;
}

.pswp__share-tooltip a:first-child {
  border-radius: 2px 2px 0 0;
}

.pswp__share-tooltip a:last-child {
  border-radius: 0 0 2px 2px;
}

.pswp__share-modal--fade-in {
  opacity: 1;
}

.pswp__share-modal--fade-in .pswp__share-tooltip {
  transform: translateY(0);
}

.pswp--touch .pswp__share-tooltip a {
  padding: 16px 12px;
}

a.pswp__share--facebook:before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  top: -12px;
  right: 15px;
  border: 6px solid transparent;
  border-bottom-color: #fff;
  pointer-events: none;
}

a.pswp__share--facebook:hover {
  background: #3e5c9a;
  color: #fff;
}

a.pswp__share--facebook:hover:before {
  border-bottom-color: #3e5c9a;
}

a.pswp__share--twitter:hover {
  background: #55acee;
  color: #fff;
}

a.pswp__share--pinterest:hover {
  background: #ccc;
  color: #ce272d;
}

a.pswp__share--download:hover {
  background: #ddd;
}

.pswp__counter {
  position: absolute;
  left: 0;
  top: 0;
  height: 44px;
  font-size: 13px;
  line-height: 44px;
  color: #fff;
  opacity: 0.75;
  padding: 0 10px;
}

.pswp__caption {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 44px;
}

.pswp__caption small {
  font-size: 11px;
  color: #bbb;
}

.pswp__caption__center {
  text-align: center;
  max-width: 420px;
  margin: 0 auto;
  font-size: 13px;
  padding: 10px;
  line-height: 20px;
  color: #ccc;
}

.pswp__caption__center a {
  font: bold 12px/30px arial;
  padding: 0 10px;
  background: #fb7710;
  color: #fff;
  border-radius: 4px;
  display: inline-block;
}

.pswp__caption--empty {
  display: none;
}

.pswp__caption--fake {
  visibility: hidden;
}

.pswp__preloader {
  width: 44px;
  height: 44px;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -22px;
  opacity: 0;
  transition: opacity 0.25s ease-out;
  will-change: opacity;
  direction: ltr;
}

.pswp__preloader__icn {
  width: 20px;
  height: 20px;
  margin: 12px;
}

.pswp__preloader--active {
  opacity: 1;
}

.pswp__preloader--active .pswp__preloader__icn {
  background: url(preloader.gif) 0 0 no-repeat;
}

.pswp--css_animation .pswp__preloader--active {
  opacity: 1;
}

.pswp--css_animation .pswp__preloader--active .pswp__preloader__icn {
  animation: clockwise 500ms linear infinite;
}

.pswp--css_animation .pswp__preloader--active .pswp__preloader__donut {
  animation: donut-rotate 1000ms cubic-bezier(0.4, 0, 0.22, 1) infinite;
}

.pswp--css_animation .pswp__preloader__icn {
  background: none;
  opacity: 0.75;
  width: 14px;
  height: 14px;
  position: absolute;
  left: 15px;
  top: 15px;
  margin: 0;
}

.pswp--css_animation .pswp__preloader__cut {
  position: relative;
  width: 7px;
  height: 14px;
  overflow: hidden;
}

.pswp--css_animation .pswp__preloader__donut {
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  border: 2px solid #fff;
  border-radius: 50%;
  border-left-color: transparent;
  border-bottom-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  background: none;
  margin: 0;
}

@media screen and (max-width: 1024px) {
  .pswp__preloader {
    position: relative;
    left: auto;
    top: auto;
    margin: 0;
    float: right;
  }
}

@media screen and (max-width: 768px) {
  .pswp__caption__center a {
    font: bold 12px/38px arial;
    padding: 0 15px;
  }
}

@-webkit-keyframes clockwise {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes clockwise {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes donut-rotate {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(-140deg);
  }

  100% {
    transform: rotate(0);
  }
}

@keyframes donut-rotate {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(-140deg);
  }

  100% {
    transform: rotate(0);
  }
}

.pswp__ui {
  -webkit-font-smoothing: auto;
  visibility: visible;
  opacity: 1;
  z-index: 1550;
}

.pswp__top-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 44px;
  width: 100%;
}

.pswp__caption,
.pswp__top-bar,
.pswp--has_mouse .pswp__button--arrow--left,
.pswp--has_mouse .pswp__button--arrow--right {
  -webkit-backface-visibility: hidden;
  will-change: opacity;
  transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
}

.pswp--has_mouse .pswp__button--arrow--left,
.pswp--has_mouse .pswp__button--arrow--right {
  visibility: visible;
}

.pswp__top-bar,
.pswp__caption {
  background-color: rgba(0, 0, 0, 0.5);
}

.pswp__ui--fit .pswp__top-bar,
.pswp__ui--fit .pswp__caption {
  background-color: rgba(0, 0, 0, 0.3);
}

.pswp__ui--idle .pswp__top-bar {
  opacity: 0;
}

.pswp__ui--idle .pswp__button--arrow--left,
.pswp__ui--idle .pswp__button--arrow--right {
  opacity: 0;
}

.pswp__ui--hidden .pswp__top-bar,
.pswp__ui--hidden .pswp__caption,
.pswp__ui--hidden .pswp__button--arrow--left,
.pswp__ui--hidden .pswp__button--arrow--right {
  opacity: 0.001;
}

.pswp__ui--one-slide .pswp__button--arrow--left,
.pswp__ui--one-slide .pswp__button--arrow--right,
.pswp__ui--one-slide .pswp__counter {
  display: none;
}

.pswp__element--disabled {
  display: none !important;
}

.pswp--minimal--dark .pswp__top-bar {
  background: none;
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

.showrooms li a {
  color: orange !important;
}

.coson {
  color: yellow;
}

.copyright {
  border-top: 1px solid #111;
}

.copyright a {
  color: #fff;
}

#panel {
  position: fixed;
  z-index: 999;
  right: 20px;
  bottom: 10px;
  height: 250px;
  width: 45px;
  display: flex;
  flex-direction: column;
}

#panel img {
  width: 80px;
}

#panel img:hover {
  opacity: 0.9;
}

.zalo-chat-widget {
  right: 12px !important;
}

.increase {
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
  background-color: lightgray;
  width: 35px;
}

.decrease {
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
  background-color: lightgray;
  width: 35px;
}

.input {
  min-height: 100%;
  border: 1px solid black;
  margin: 0 10px;
  border-radius: 5px;
  text-align: center;
  width: 60px;
}

.edit-number {
  display: flex;
}
</style>
