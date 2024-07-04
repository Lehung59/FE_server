<template>
  <div id="wrapper">
    <Header />

    <div id="main">
      <!--CSS-->

      <div class="orderbox">
        <h3 style="padding: 30px">Danh sách cửa hàng yêu thích</h3>
        <div class="giohang orderhome">
          <form name="giohang" id="cart">
            <ul class="listcart">
              <li v-for="product in myFarve" :key="product.orderDetailId" class="cartitem">
                <div class="oimg">
                  <a>
                    <img :src="product.image" :alt="product.title" />
                  </a>
                </div>
                <div class="oname">
                  <h3 style="font-size: 20px;">{{ product.storeName }}</h3>
                  <label>{{ product.orderStatusName }}</label>
                  <p>{{ product.storeAddress }}</p>

                  <div style="float: right">
                    <button type="button" @click="cancelOderMyFarvor(product.storeId)" class="btn">
                      Hủy thích
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <input type="submit" name="_w_action[UpdatePOST]" style="display: none" />
            <input type="hidden" name="_w_action" value="UpdatePOST" />
          </form>
        </div>
      </div>
      <!-- <div class="col-12">
        <a-pagination
          @change="onChange"
          v-model:current="pageParam.currentPage"
          :total="pageParam.totalItems"
          :pageSize="pageParam.pageSize"
          :show-total="
            (total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`
          "
          class="mt-2 text-end"
        />
      </div> -->
    </div>
    <Footer />
    <div>
      <a-drawer title="Danh sách đơn hàng đã đặt" :visible="isDrawerVisible" :width="850" @close="handleClose"
        :destroyOnClose="true">
        <div class="giohang orderhome">
          <form name="giohang" id="cart">
            <ul class="listcart">
              <li v-for="order in myOrder" :key="order.orderDetailId" class="cartitem">
                <div class="oimg">
                  <a>
                    <img :src="order.productImg" :alt="product.title" />
                  </a>
                  <!-- <a
                    @click="deleteProduct(product.cartItemId)"
                    class="odel"
                    rel="nofollow"
                    :title="`Xóa ${product.title} khỏi đơn hàng`"
                    >xóa</a
                  > -->
                </div>
                <div class="oname">
                  <h3>{{ order.productName }}</h3>
                  <label>{{ order.orderStatusName }}</label>

                  <label style="float: left">{{ order.priceTotal?.toLocaleString() }}₫</label>
                  <div v-if="order.orderStatusName == 'Đặt hàng thành công'" style="float: right">
                    <button type="button" @click="cancelOder(order.orderDetailId)" class="btn">
                      Hủy đơn
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <!-- <div class="total flexJus">
              <div>
                <span>Tổng tiền:&nbsp;&nbsp;</span>
                <b class="total_money">{{ allTotal.toLocaleString() }}₫</b>
              </div>
            </div> -->

            <input type="submit" name="_w_action[UpdatePOST]" style="display: none" />
            <input type="hidden" name="_w_action" value="UpdatePOST" />
          </form>

          <!-- <div class="fpanel">
            <div class="da">
              <p class="state">Đơn hàng đang được gửi ...</p>
              <p @click="showDrawer" class="od" id="gui">
                Xem các đơn đã đặt
              </p>
            </div>
            <input
              type="submit"
              name="_w_action[OrderPOST]"
              style="display: none"
            />
            <input type="hidden" name="_w_action" value="OrderPOST" />
          </div> -->
        </div>
      </a-drawer>
      <a-drawer title="Danh sách cửa hàng bạn thích" :visible="isDrawerVisible2" :width="850" @close="handleClose2"
        :destroyOnClose="true">
        <div class="giohang orderhome">
          <form name="giohang" id="cart">
            <ul class="listcart">
              <li v-for="product in myFarve" :key="product.orderDetailId" class="cartitem">
                <div class="oimg">
                  <a>
                    <img :src="product.image" :alt="product.title" />
                  </a>
                </div>
                <div class="oname">
                  <h3>{{ product.storeName }}</h3>
                  <label>{{ product.orderStatusName }}</label>
                  <p>{{ product.storeAddress }}</p>

                  <div style="float: right">
                    <button type="button" @click="cancelOderMyFarvor(product.storeId)" class="btn">
                      Hủy thích
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <input type="submit" name="_w_action[UpdatePOST]" style="display: none" />
            <input type="hidden" name="_w_action" value="UpdatePOST" />
          </form>
        </div>
      </a-drawer>
    </div>
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
import Footer from "../../components/footer2.vue"

export default defineComponent({
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-drawer": Drawer,
    "a-button": Button,
    "a-input-number": InputNumber,
    Header,
    Footer

  },
  setup() {
    const route = useRoute();
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const productId = route.params.id;
    const product = ref([]);
    const myFarve = ref([]);

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
      pageSize: 100,
      totalItems: 0,
      totalPages: 0,
    });
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
            params: { page, size, keyword },
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
    const getMyfavorite = async (page, size, keyword = "") => {
      const response = await axios.get(
        `${apiPrefix}/api/v1/customer/favor/view`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, size, keyword },
        }
      );
      myFarve.value = response.data.data;
      pageParam.totalItems = response.data.pagination.totalItems;
      pageParam.totalPages = response.data.pagination.totalPages;
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
          getMyfavorite(1, pageParam.pageSize,
            searchKeyword.value);
        }, 700);
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
          getMyfavorite(1, pageParam.pageSize,
            searchKeyword.value);
        }, 700);
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
      );
      alert("Mua thành công");
      fetchProduct();
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
    const onChange = (page, pageSize) => {
      pageParam.currentPage = page;
      pageParam.pageSize = pageSize;
      getMyfavorite(page, pageSize, searchKeyword.value);
    };
    const onSearch = () => {
      pageParam.currentPage = 1;
      getMyfavorite(
        pageParam.currentPage,
        pageParam.pageSize,
        searchKeyword.value
      );
    };
    onMounted(() => {
      getMyfavorite(pageParam.currentPage, pageParam.pageSize);
      fetchProduct();
    });
    return {
      router,
      route,
      product,
      userLocal,
      deleteProduct,
      searchKeyword,
      onChange,
      onSearch,
      decrement,
      increment,
      allTotal,
      byProductCart,
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
      pageParam,
      cancelOder,
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

.btn {
  font: bold 11px/30px arial;
  padding: 0 7px;
  background-color: #fbac51;
  color: #fff;
  display: inline-block;
  text-transform: uppercase;
  cursor: pointer;
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
