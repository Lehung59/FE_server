<template>
    <a-modal
      v-model:visible="open"
      title="Xác nhận đặt hàng"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="close"
    >
      <p><strong>Khách hàng:</strong> {{ orderData.customerName }}</p>
      <p><strong>Số điện thoại:</strong> {{ orderData.phoneNumber }}</p>
      <p><strong>Địa chỉ:</strong> {{ orderData.address }}</p>
      <p><strong>Tên sản phẩm:</strong> {{ orderData.productName }}</p>
      <p><strong>Giá tiền (cho một sản phẩm):</strong> {{ formatCurrency(orderData.price) }}</p>
      <p><strong>Giảm giá của sản phẩm:</strong> {{ orderData.discount * 100 }}%</p>
      <p><strong>Giá sau giảm:</strong> {{ formatCurrency(orderData.price * (1 - orderData.discount)) }}</p>
      <p><strong>Số lượng:</strong> {{ orderData.quantity }}</p>
      <p><strong>Tổng tiền:</strong> {{ formatCurrency(orderData.price * (1 - orderData.discount) * orderData.quantity) }}</p>
      <p><strong>Phí vận chuyển:</strong> {{ formatCurrency(orderData.shippingFee) }}</p>
      <p><strong>Hình thức thanh toán:</strong> {{ orderData.paymentMethod }}</p>
    </a-modal>
  </template>
  
  <script>
  import { defineComponent, reactive, watch ,} from 'vue';
  import axios from 'axios';
  import { message } from 'ant-design-vue';
  
  export default defineComponent({
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      confirmLoading: {
        type: Boolean,
        required: true
      },
      data: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const orderData = reactive({
        customerName: props.data.customerName,
        phoneNumber: props.data.phoneNumber,
        address: props.data.address,
        productName: props.data.productName,
        price: props.data.price,
        discount: props.data.discount,
        quantity: props.data.quantityBuy,
        shippingFee: 30000,
        paymentMethod: "Thanh toán khi nhận hàng"
      });
  
      watch(() => props.data, (newData) => {
        orderData.customerName = newData.customerName;
        orderData.phoneNumber = newData.phoneNumber;
        orderData.address = newData.address;
        orderData.productName = newData.productName;
        orderData.price = newData.price;
        orderData.discount = newData.discount;
        orderData.quantity = newData.quantityBuy;
      });
  
      const apiPrefix = import.meta.env.VITE_API_PREFIX;
      const token = JSON.parse(localStorage.getItem("token"));
  
      const modalText = ref('Content of the modal');
      const open = ref(false);
      const confirmLoading = ref(false);
  
      const showModal = () => {
        console.log(123);
        open.value = true;
      };
  
      const handleOk = () => {
        modalText.value = 'The modal will be closed after two seconds';
        confirmLoading.value = true;
        setTimeout(() => {
          open.value = false;
          confirmLoading.value = false;
        }, 2000);
  
        handelByNow();
      };
  
      const handelByNow = async () => {
        const productId = props.data.productId;
        const quantityBuy = props.data.quantityBuy;
        const quantityStoke = props.data.quantityStoke;
  
        if (quantityBuy < 1) {
          alert("Số lượng tối thiểu là 1");
        } else if (quantityBuy > quantityStoke) {
          alert(`Số lượng không được vượt quá ${quantityStoke}`);
        }
  
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
            console.log(error);
          });
      };
  
      const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(value);
      };
  
      return {
        showModal,
        handleOk,
        open,
        confirmLoading,
        modalText,
        orderData,
        formatCurrency
      };
    }
  });
  </script>
  

  <style>

.btn2 i,
.btn i {
  font: 12px arial;
}

.btn2 b,
.btn b {
  display: block;
  font: bold 16px/17px arial;
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
.bcam {
  background-color: #f59023;
}

.bcam:hover {
  background-color: #ca7a0c;
}
.btnorder b {
  display: block;
}


</style>