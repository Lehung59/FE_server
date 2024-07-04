<template>
  <div id="wrapper">
    <Header />

    <div id="main">
      <!--CSS-->

      <div class="orderbox">
        <h3 style="padding: 30px">Giỏ hàng của bạn</h3>

        <div class="giohang orderhome">

          <form method="post" name="giohang" id="cart">
            <ul class="listcart">
              <li v-for="product in product" :key="product.id" class="cartitem">
                <div class="oimg">
                  <a :href="product.href" :title="product.title">
                    <img :src="product.productImg" :alt="product.title" />
                  </a>
                  <a @click="deleteProduct(product.cartItemId)" class="odel" rel="nofollow"
                    :title="`Xóa ${product.title} khỏi đơn hàng`">XÓA</a>
                </div>
                <div class="oname">
                  <h3 style="font-size: 20px;">{{ product.productName }}</h3>

                  <label>{{ product.priceTotal?.toLocaleString() }}₫</label>
                  <h6>Cửa hàng: {{ product.storeName }}</h6>
                  <span class="bynow"
                    @click="updatePurchaseData(product.cartItemId, product.productId, product.quantity)"
                    style="float: right; padding-top: 10px; cursor: 'pointer'">Mua ngay</span>

                  <div class="ArrCount">
                    <span @click="decrement(product)">-</span>
                    <input type="text" :value="product.quantity" readonly />
                    <span @click="increment(product)">+</span>
                    <!-- increment -->
                  </div>
                </div>
              </li>
            </ul>
            <div class="total flexJus">
              <div>
                <span>Tổng tiền:&nbsp;&nbsp;</span>
                <b class="total_money">{{ allTotal.toLocaleString() }}₫</b>
              </div>
            </div>

            <input type="submit" name="_w_action[UpdatePOST]" style="display: none" />
            <input type="hidden" name="_w_action" value="UpdatePOST" />
          </form>
          <div class="col-12">
            <a-pagination @change="onChange" v-model:current="pageParam.currentPage" :total="pageParam.totalItems"
              :pageSize="pageParam.pageSize"
              :show-total="(total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`" class="mt-2 text-end" />
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model:visible="open" :title="titlee" @ok="handleOk(purchaseData.cartItemId)">
      <p><strong>Khách hàng:</strong> {{ purchaseData.customerName }}</p>
      <p><strong>Số điện thoại:</strong> {{ purchaseData.phoneNumber }}</p>
      <p><strong>Địa chỉ:</strong> {{ purchaseData.address }}</p>
      <p><strong>Tên sản phẩm:</strong> {{ purchaseData.productName }}</p>
      <p><strong>Giá tiền (cho một sản phẩm):</strong> {{ formatCurrency(purchaseData.price) }}</p>
      <p><strong>Giảm giá của sản phẩm:</strong> {{ purchaseData.discount }}%</p>
      <p><strong>Giá sau giảm:</strong> {{ formatCurrency(purchaseData.price * (1 - purchaseData.discount / 100)) }}</p>
      <p><strong>Số lượng:</strong> {{ purchaseData.quantityBuy }}</p>
      <p><strong>Phí vận chuyển:</strong> {{ formatCurrency(purchaseData.shippingFee) }}</p>
      <p><strong>Tổng tiền:</strong> {{ formatCurrency(purchaseData.shippingFee + purchaseData.price * (1 -
            purchaseData.discount / 100) * purchaseData.quantityBuy) }}</p>

      <p><strong>Hình thức thanh toán:</strong> {{ purchaseData.paymentMethod }}</p>
    </a-modal>


    <Footer />
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
} from "vue";

import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { Form, Drawer, Button, InputNumber, message } from "ant-design-vue";
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
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-drawer": Drawer,
    "a-button": Button,
    "a-input-number": InputNumber,
    Header,
    Footer,
  },
  setup() {
    const route = useRoute();
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const productId = route.params.id;
    const product = ref([]);
    const productInfo = ref()
    const myFarve = ref([]);
    const open = ref(false);
    const titlee = ref("Xác nhận đặt hàng");
    const userData = ref(null);

    const isDrawerVisible = ref(false);
    const isDrawerVisible2 = ref(false);
    const allTotal = ref(0);
    const form = ref(null);
    const router = useRouter();
    const userLocal = JSON.parse(localStorage.getItem("auth"));
    const token = JSON.parse(localStorage.getItem("token"));
    const myOrder = ref([]);
    // https://charismatic-friendship-production.up.railway.app/api/v1/customer/cartitem/view
    const searchKeyword = ref("");
    const pageParam = reactive({
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      totalPages: 0
    });
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
      cartItemId: null,
      shippingFee: 30000,
      paymentMethod: "Thanh toán khi nhận hàng"
    });
    const fetchProductInfo = async (pid) => {
      try {
        const response = await axios.get(
          `${apiPrefix}/api/v1/product/info/${pid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );

        if (response.data.status === "OK") {
          productInfo.value = response.data.data;
        } else {
          // Xử lý khi status không thành công
          console.log('Lỗi từ server:', response.data.message);
          productInfo.value = null;
          message.error(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          // Xử lý khi có lỗi từ phản hồi của API
          productInfo.value = null;

          console.error('Lỗi khi gọi API:', error.response.data.message);
          message.error(error.response.data.message);
        } else {
          productInfo.value = null;

          // Xử lý khi có lỗi khác, chẳng hạn mạng chập chờn
          console.error('Đã xảy ra lỗi:', error.message);
          message.error('Đã xảy ra lỗi');
        }
      }
    };

    const updatePurchaseData = async (cartItemId, pId, buyQuantity) => {
      try {
        await fetchProductInfo(pId);

        if (!productInfo.value) {
          // Không có thông tin sản phẩm, có thể do lỗi trong fetchProductInfo
          return;
        }


        const quantityBuy = buyQuantity;
        const quantityStoke = productInfo.value.quantity;
        console.log(productInfo.value.quantity)
        if (quantityBuy < 1) {
          alert("Số lượng tối thiểu là 1");
        } else if (quantityBuy > quantityStoke) {
          alert(`Số lượng không được vượt quá ${quantityStoke}`);
        } else {
          purchaseData.cartItemId = cartItemId;
          purchaseData.productId = pId;
          purchaseData.quantityBuy = buyQuantity;
          purchaseData.quantityStoke = productInfo.value.quantity;
          purchaseData.customerName = `${userLocal.firstname} ${userLocal.lastname}`;
          purchaseData.phoneNumber = userData.value.phoneNumber; // Set as needed
          purchaseData.address = userData.value.address; // Set as needed
          purchaseData.productName = productInfo.value.productName;
          purchaseData.price = productInfo.value.price;
          purchaseData.discount = productInfo.value.discount;
          purchaseData.open = true;
          purchaseData.typee = "mua-qua-gio-hang";
          open.value = true
        }
      }

      catch (error) {
        // Xử lý lỗi nếu cần thiết
        console.error('Lỗi khi cập nhật dữ liệu mua hàng:', error);
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
    const showDrawer = () => {
      isDrawerVisible.value = true;
      fetchMyOrder();
    };
    const showDrawer2 = () => {
      isDrawerVisible2.value = true;
      // fetchMyOrder();
    };
    const handleClose2 = () => {
      isDrawerVisible2.value = false;
    };
    const handleClose = () => {
      isDrawerVisible.value = false;
    };

    const fetchProduct = async (page, size, keyword = "") => {
      try {
        const response = await axios.get(
          `${apiPrefix}/api/v1/customer/cartitem/view`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { page, size, keyword }
          }
        );
        console.log(response.data, "data");
        product.value = response.data.data;
        pageParam.totalItems = response.data.pagination.totalItems;
        pageParam.totalPages = response.data.pagination.totalPages;
        allTotal.value = 0;
        // allTotal.value = response.data.data.reduce((total, product) => {
        //   console.log(total, product);
        //   return total + product.priceTotal;
        // }, 0);
        await response.data.data.forEach((product) => {
          allTotal.value += product.priceTotal;
        });
      } catch (error) {
        console.error(error);
      }
    };
    const onChange = (page, pageSize) => {
      pageParam.currentPage = page;
      pageParam.pageSize = pageSize;
      fetchProduct(page, pageSize, searchKeyword.value);
    };
    const onSearch = () => {
      pageParam.currentPage = 1;
      fetchProduct(pageParam.currentPage, pageParam.pageSize, searchKeyword.value);
    };
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value);
    };
    const getMyfavorite = async () => {
      const response = await axios.get(
        `${apiPrefix}/api/v1/customer/favor/view`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      myFarve.value = response.data.data;
    };
    const cancelOder = async (id) => {
      try {
        await axios.get(`${apiPrefix}/api/v1/customer/order/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        message.success("Hủy thành công");
        setTimeout(() => {
          window.location.reload();
        }, 350);
      } catch (error) {
        console.error(error);
      }
    };
    const cancelOderMyFarvor = async (id) => {
      const formData = new FormData();
      formData.append("storeid", id);
      try {
        await axios({
          method: "delete",
          url: `${apiPrefix}/api/v1/customer/favor/remove`,
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        message.success("Hủy thành công");
        setTimeout(() => {
          window.location.reload();
        }, 350);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchMyOrder = async () => {
      try {
        const response = await axios.get(
          `${apiPrefix}/api/v1/customer/orderdetail/view`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data, "data");
        myOrder.value = response.data.data;
      } catch (error) {
        console.error(error);
      }
    };


    const handleOk = (idCart) => {
      console.log(idCart)
      confirmLoading.value = true;
      titlee.value = "Đang xử lí đơn hàng của bạn";
      setTimeout(() => {
        open.value = false;
        confirmLoading.value = false;
      }, 2000);

      byProductCart(idCart);
    };

    // https://charismatic-friendship-production.up.railway.app/api/v1/customer/orderdetail/view
    const byProductCart = async (idCart) => {
      const formData = new FormData();
      // cartitemid
      formData.append("cartitemid", idCart);

      await axios.post(
        `${apiPrefix}/api/v1/customer/order/insert/cartitem`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        message.success(
          "Đặt hàng thành công, hãy xem trạng thái đơn hàng của bạn"
        );
        fetchProduct();
      })
        .catch((error) => {
          if (error.response && error.response.data) {
            // Xử lý khi có lỗi từ phản hồi của API
            console.error('Lỗi khi gọi API:', error.response.data.message);
            message.error(error.response.data.message);
          } else {
            // Xử lý khi có lỗi khác, chẳng hạn mạng chập chờn
            console.error('Đã xảy ra lỗi:', error.message); StringUtils.isEmpty(profileDetail.getAddress()) || StringUtils.isEmpty(profileDetail.getPhoneNumber())
            message.error('Đã xảy ra lỗi');
          }
        });

    };
    console.log(allTotal, "1");
    const deleteProduct = async (id) => {
      const formData = new FormData();
      try {
        const response = await axios.get(
          `${apiPrefix}/api/v1/customer/cartitem/delete?cartitemid=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchProduct();
      } catch (error) {
        console.error(error);
      }
    };

    const decrement = async (pr) => {
      try {
        if (pr.quantity <= 1) {
          const formData = new FormData();
          formData.append("cartitemid", pr.cartItemId);
          const response = await axios.get(
            `${apiPrefix}/api/v1/customer/cartitem/delete?cartitemid=${pr.cartItemId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          const formData = new FormData();
          const newQuantity = pr.quantity - 1;
          formData.append("quantity", newQuantity);
          formData.append("cartitemid", pr.cartItemId);
          console.log(newQuantity);
          const response = await axios.put(
            `${apiPrefix}/api/v1/customer/cartitem/update`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        fetchProduct();
      } catch (error) {
        console.error(error);
      }
    };
    const increment = async (pr) => {
      try {
        const formData = new FormData();
        const newQuantity = pr.quantity + 1;
        formData.append("quantity", newQuantity);
        formData.append("cartitemid", pr.cartItemId);
        console.log(newQuantity);
        const response = await axios.put(
          `${apiPrefix}/api/v1/customer/cartitem/update`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchProduct();
      } catch (error) {
        console.error(error);
      }
    };
    const handleSubmit = () => {
      form.value.validateFields((err) => {
        if (!err) {
          message.success("Quantity submitted successfully!");
          handleClose();
        } else {
          message.error("Please input the correct quantity!");
        }
      });
    };


    onMounted(() => {
      fetchProduct(pageParam.currentPage, pageParam.pageSize);
      getMyfavorite();
      getUserData();

      const channel = new window.BroadcastChannel("sw-messages");
      channel.addEventListener('message', (event) => {
        console.log(123);
        message.success(event);
      });

    });
    return {
      titlee,
      formatCurrency,
      purchaseData,
      router,
      route,
      product,
      handleOk,
      open,
      updatePurchaseData,

      userLocal,
      deleteProduct,
      decrement,
      increment,
      allTotal,
      byProductCart,
      goBack,
      isDrawerVisible,
      showDrawer,
      handleClose,
      handleSubmit,
      isDrawerVisible2,
      handleClose2,
      showDrawer2,
      cancelOderMyFarvor,
      myOrder,
      myFarve,
      cancelOder,
      searchKeyword,
      pageParam,
      onChange,
      onSearch,
    };
  },
});
</script>

<style scoped>
#wrapper {
  float: left;
  width: 100%;
}
#main {
  float: left;
  width: 100%;
}

#main:before {
  clear: both;
}
.orderbox {
  display: table;
  width: 800px;
  margin: 0 auto;
}


.dieuhuong {
  margin: 0;
  float: left;
  width: 100%;
  background: #fafafa;
}

.dieuhuong a {
  text-align: right;
  font: bold 13px/40px arial;
  text-indent: 20px;
}

.dieuhuong a:before {
  font: normal 14px/1 FontAwesome;
  margin: 0 5px;
  content: "\f104";
}

.dieuhuong label {
  float: right;
  display: inline-block;
  font: 13px/40px arial;
  color: #666;
}
.giohang {
  padding: 10px 20px;
  display: table;
}

.orderhome {
  float: left;
  width: 800px;
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: 0 0 5px #ccc;
}
#cart,
#fod {
  float: left;
  width: 100%;
}

#cart {
  margin-bottom: 20px;
}

.listcart {
  width: 100%;
  float: left;
  padding: 0;
}

.listcart .cartitem {
  float: left;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  position: relative;
}

.listcart .cartitem .oimg {
  width: 10%;
  height: 70%;
  position: relative;
  float: left;
  margin: 0 5% 0 0;
  text-align: center;
  font-size: medium;
}

.listcart .cartitem .oimg img {
  max-width: 100%;
}

.listcart .cartitem .oname {
  width: 85%;
  float: left;
  margin-bottom: 5px;
}

.listcart .cartitem h3 {
  float: left;
  width: 70%;
  margin: 0 3% 0 0;
  line-height: 15px;
}

.listcart .cartitem h3 a {
  font: bold 12px/15px arial;
  color: #444;
}

.listcart .cartitem label {
  color: red;
  font: bold 12px/15px arial;
  display: inline-block;
  width: 27%;
  text-align: right;
}

.odel {
  color: #666;
  display: block;
  margin-top: 10px;
}

.odel:before {
  content: "\f056";
  font: normal 11px/1 FontAwesome;
  margin-right: 3px;
}


.bynow {
  background: -webkit-linear-gradient(top, #ffa103, #fb7d0f);
  padding: 8px 2px;
  font: bold 16px/27px Arial;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  /* Thêm con trỏ dạng bàn tay */
  transition: background 0.3s ease;
  /* Thêm hiệu ứng chuyển đổi mượt */
}

.bynow:hover {
  background: -webkit-linear-gradient(top,
      #fb7d0f,
      #ffa103);
  /* Thay đổi màu khi trỏ chuột vào */
}


.ArrCount {
  float: left;
  width: 100%;
  margin: 5px 0;
}

.ArrCount span,
.ArrCount input {
  display: inline-block;
  width: 40px;
  text-align: center;
  border: 1px solid #ddd;
  height: 30px;
  line-height: 30px;
  border-right: none;
}

.ArrCount span:nth-last-child(1) {
  border-right: 1px solid #ddd;
}

.ArrCount span {
  font: bold 15px/30px arial;
}

.ArrCount input {
  vertical-align: top;
}




.total {
  float: left;
  width: 100%;
  margin: 12px 0;
  font-size: 13px;
}

.total span {
  float: left;
  font-weight: bold;
}

.total b {
  float: right;
  color: red;
}
.flexJus,
.waranty {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
