<template>
  <div id="wrapper">
    <div id="header">
      <div
        class="f head1"
        itemscope=""
        itemtype="http://schema.org/WebSite"
        itemid="https://denled.com/#website"
      >
        <meta itemprop="url" content="https://denled.com" />
        <meta itemprop="name" content="Siêu thị đèn LED" />
        <div
          class="wrap flexJus"
          itemscope=""
          itemtype="https://schema.org/Organization"
          itemid="https://denled.com/#organization"
        >
          <router-link to="/trang-chu-stores">
            <a
              title="Siêu thị Agogo"
              itemprop="logo"
              itemscope=""
              itemtype="http://schema.org/ImageObject"
            >
              <meta itemprop="url" content="/Content/img/logo.png" />
              <img
                width="60"
                height="60"
                src="https://res.cloudinary.com/dqvr7kat6/image/upload/v1718287579/ftld80xpfribbbfhp1qu.png"
                alt="Siêu thị đèn LED"
              />
            </a>
          </router-link>

          <div class="open">
            <label style="cursor: pointer" class="oh">
              <router-link v-if="!userLocal" to="/login">
                <span> Đăng nhập </span>
              </router-link>
              <router-link to="/profile-client" v-else class="me-1">
                <span>Xin chào {{ userLocal.lastname }}</span>
              </router-link>
            </label>
          </div>
        </div>
      </div>
      <div class="f head2">
        <div class="wrap flexJus">
          <div>
            <span style="font: bold 15px arial">Hãy cùng mua sắm nào!</span>
          </div>
          <div class="flexJus">
            <router-link to="/trang-chu/gio-hang">
              <div id="vcart">
                <fieldset>
                  <u>x</u>
                  <figure>
                    <p>Chưa có sản phẩm nào trong giỏ hàng !</p>
                  </figure>
                </fieldset>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <input type="hidden" id="LocaCode" value="hn" />
    </div>
    <div id="main">
      <div class="user-profile">
        <div class="card" v-if="userData">
          <div class="card-header">
            <img :src="userData.avatar" alt="User Avatar" class="avatar" />
          </div>
          <div class="card-body">
            <h2 class="user-name">
              {{ userData.firstname }} {{ userData.lastname }}
            </h2>
            <div class="user-info">
              <p><strong>Họ:</strong> {{ userData.firstname || "N/A" }}</p>
              <p><strong>Tên:</strong> {{ userData.lastname || "N/A" }}</p>
              <p>
                <strong>Số điện thoại:</strong>
                {{ userData.phoneNumber || "N/A" }}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {{ userData.phoneNumber || "N/A" }}
              </p>
              <p>
                <strong>Mạng xã hội:</strong>
                {{ userData.socialContact || "N/A" }}
              </p>
            </div>
          </div>
          <div class="card-footer">
            <button @click="showModal" class="edit-button">Chỉnh sửa</button>
          </div>
        </div>
        <div v-else class="loading">Loading...</div>

        <a-modal
          v-model:visible="isModalVisible"
          title="Chỉnh sửa thông tin"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <a-form :form="form" layout="vertical">
            <a-form-item label="Họ">
              <a-input
                v-model:value="formData.firstname"
                @input="handleInputChange('firstname', $event)"
              />
            </a-form-item>
            <a-form-item label="Tên">
              <a-input
                v-model:value="formData.lastname"
                @input="handleInputChange('lastname', $event)"
              />
            </a-form-item>
            <a-form-item label="Số điện thoại">
              <a-input
                v-model:value="formData.phoneNumber"
                @input="handleInputChange('phoneNumber', $event)"
              />
            </a-form-item>
            <a-form-item label="Địa chỉ">
    <div class="css_select_div">
      <select class="css_select" v-model="selectedProvince" @change="fetchDistricts" title="Chọn Tỉnh Thành">
        <option value="0">Tỉnh Thành</option>
        <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.full_name }}</option>
      </select>
      <select class="css_select" v-model="selectedDistrict" @change="fetchWards" title="Chọn Quận Huyện">
        <option value="0">Quận Huyện</option>
        <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.full_name }}</option>
      </select>
      <select class="css_select" v-model="selectedWard" @change="updateAddress" title="Chọn Phường Xã">
        <option value="0">Phường Xã</option>
        <option v-for="ward in wards" :key="ward.id" :value="ward.id">{{ ward.full_name }}</option>
      </select>
      <input type="text" v-model="houseNumber" @input="updateAddress" placeholder="Số nhà" />
    </div>
  </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
    <div id="footer">
      <div class="f" style="padding: 40px 0">
        <div class="wrap flexJus">
          <div class="f flex">
            <div class="fotb" style="width: 30%; padding-right: 30px">
              <img
                src="https://denled.com/Content/img/logo-foot.png"
                alt="Denled.com"
                width="286"
                height="60"
              />
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
                      <span>Hotline : </span
                      ><a href="tel:0933665115">0933.66.5115</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="fotb">
              <label>THÔNG TIN - HƯỚNG DẪN</label>
              <ul>
                <li>
                  <a title="Giới Thiệu Hệ Thống" rel="nofollow" href="/"
                    >Giới Thiệu Hệ Thống</a
                  >
                </li>

                <li>
                  <a title="Giao hàng &amp; Thanh toán" rel="nofollow" href="/"
                    >Giao hàng &amp; Thanh toán</a
                  >
                </li>

                <li>
                  <a title="Hướng dẫn mua hàng Online" rel="nofollow" href="/"
                    >Hướng dẫn mua hàng Online</a
                  >
                </li>

                <li>
                  <a title="Quy chế hoạt động" rel="nofollow" href="/"
                    >Quy chế hoạt động</a
                  >
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
          <img
            src="https://denled.com/Content/img/totop.svg"
            alt="To top"
            width="45"
            height="45"
          />
        </li>
        <li style="padding-top: 10px; padding-bottom: 10px">
          <img
            alt="Messenger"
            src="https://denled.com/Content/img/messenger.svg"
            width="45"
            height="45"
          />
        </li>

        <li>
          <img
            alt="Phone"
            src="https://denled.com/Content/img/phone.svg"
            width="45"
            height="45"
          />
        </li>
      </ul>
      <div
        class="zalo-chat-widget"
        data-oaid="2839194858446814357"
        data-welcome-message="Rất vui khi được hỗ trợ bạn!. Nếu bạn không thể chờ thì hãy gọi hoặc nhắn tin đến số điện thoại này 0973.66.5115."
        data-autopopup="1800"
        data-width="500"
        data-height="500"
        style="right: 12px"
      ></div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { useMenu } from "../../stores/use-menu.js";
import { onUpdated, onMounted } from "vue";
import ApiViewData from "../../api/ApiViewData.js";
import ApiUser from "../../api/ApiUser.js";
import { useAuthStore } from "../../stores/auth.store.js";
import axios from "axios";
import ProfileUser from "./profileUser.vue";

export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);
    const userLocal = JSON.parse(localStorage.getItem("auth"));
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const router = useRouter();
    const route = useRoute();
    const errors = ref([]);
    const stores = ref([]);
    const allStores = ref([]);
    const userData = ref(null);
    const isModalVisible = ref(false);
    const form = ref(null);
    const formData = ref({
      firstname: "",
      lastname: "",
      phoneNumber: "",
      address: "",
    });
    const handleInputChange = (fieldName, event) => {
      formData[fieldName] = event.target.value;
    };

    const provinces = ref([]);
    const districts = ref([]);
    const wards = ref([]);
    const selectedProvince = ref('0');
    const selectedDistrict = ref('0');
    const selectedWard = ref('0');
    const houseNumber = ref('');

    const fetchProvinces = async () => {
      try {
        const response = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
        if (response.data.error === 0) {
          provinces.value = response.data.data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDistricts = async () => {
      if (selectedProvince.value !== '0') {
        try {
          const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince.value}.htm`);
          if (response.data.error === 0) {
            districts.value = response.data.data;
            wards.value = [];
            selectedDistrict.value = '0';
            selectedWard.value = '0';
            updateAddress();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchWards = async () => {
      if (selectedDistrict.value !== '0') {
        try {
          const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict.value}.htm`);
          if (response.data.error === 0) {
            wards.value = response.data.data;
            selectedWard.value = '0';
            updateAddress();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    const updateAddress = () => {
      const provinceName = provinces.value.find(p => p.id === selectedProvince.value)?.full_name || '';
      const districtName = districts.value.find(d => d.id === selectedDistrict.value)?.full_name || '';
      const wardName = wards.value.find(w => w.id === selectedWard.value)?.full_name || '';
      formData.value.address = `${houseNumber.value} ${wardName} ${districtName} ${provinceName}`.trim();
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
        const token = JSON.parse(localStorage.getItem("token"));
        const formData2 = new FormData();
        console.log(formData.value.firstname, "cc");
        formData2.append("firstname", formData.value.firstname);
        formData2.append("lastname", formData.value.lastname);
        formData2.append("phoneNumber", formData.value.phoneNumber);
        formData2.append("address", formData.value.address);

        await axios.put(
          `${apiPrefix}/api/v1/account/profile/update`,
          formData2,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        message.success("Cập nhật thông tin thành công");
        isModalVisible.value = false;
        getUserData(); // Tải lại dữ liệu sau khi cập nhật thành công
      } catch (error) {
        console.error(error);
        message.error("Có lỗi xảy ra khi cập nhật thông tin");
      }
    };

    const handleCancel = () => {
      isModalVisible.value = false;
    };

    const getAllStores = () => {
      axios
        .get(
           `${apiPrefix}/api/v1/admin/store/view`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào headers
            },
          }
        )
        .then((response) => {
          console.log(response.data.data, "response");
          allStores.value = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getUsers = () => {
      axios
        .get(
           `${apiPrefix}/api/v1/customer/favor/view`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào headers
            },
          }
        )
        .then((response) => {
          console.log(response.data.data, "response");
          stores.value = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    };
    onMounted(() => {
      getAllStores();
      getUserData();

      getUsers();
      if (!token) {
        // Xóa localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
        // Redirect đến trang login
        router.push("/login");
      }
    });
    return {
      route,
      router,
      allStores,
      stores,
      userLocal,
      userData,
      isModalVisible,
      form,
      formData,
      showModal,
      handleOk,
      handleCancel,
      handleInputChange,
    };
  },
});
</script>

<style scoped>
.user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: #f0f2f5;
  font-family: "Roboto", sans-serif;
}
.ant-input {
  /* Example styles */
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

/* Optional: Specific styling for input labels */
.ant-form-item-label {
  font-weight: bold;
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
  src: url("/Content/awesome/fontawesome-webfont.eot?#iefix&v=4.4.0")
      format("embedded-opentype"),
    url("/Content/awesome/fontawesome-webfont.woff2?v=4.4.0") format("woff2"),
    url("/Content/awesome/fontawesome-webfont.woff?v=4.4.0") format("woff"),
    url("/Content/awesome/fontawesome-webfont.ttf?v=4.4.0") format("truetype"),
    url("/Content/awesome/fontawesome-webfont.svg?v=4.4.0#fontawesomeregular")
      format("svg");
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

/*Global*/
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
  background: url("https://denled.com/Content/img/i/icon-logo.png") no-repeat;
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

#vcart:before {
  font: 21px/1 FontAwesome;
  content: "\f07a";
  padding-right: 2px;
}

#vcart {
  color: #000;
  padding-left: 14px;
  cursor: pointer;
  position: relative;
  font-size: 18px;
}

#vcart b {
  font: 18px/30px arial;
}

#vcart p {
  padding: 20px 0;
  display: block;
  text-align: center;
}

#vcart {
  position: relative;
}

#vcart fieldset {
  position: absolute;
  display: none;
  width: 400px;
  right: 0;
  top: 41px;
  border: 1px solid #ddd;
  background: #fff;
  padding: 10px;
  color: #666;
  font: 13px arial;
  border-radius: 4px;
  z-index: 2;
}

#vcart fieldset:after,
#vcart p:before {
  width: 0;
  height: 0;
  content: "";
  position: absolute;
  bottom: 100%;
}

#vcart fieldset:after {
  border: 10px solid transparent;
  border-bottom-color: #fff;
  left: 361px;
}

#vcart fieldset:before {
  border: 11px solid transparent;
  border-bottom-color: #ddd;
  left: 360px;
}

#vcart fieldset u {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: #eee;
  font: 11px/20px arial;
  text-align: center;
  border-radius: 4px;
  display: block;
}

#vcart label {
  display: block;
  float: left;
  width: 100%;
  font: 15px/15px arial;
  color: green;
}

#vcart ul {
  float: left;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px 0;
}

#vcart li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 0;
  cursor: pointer;
}

#vcart li img {
  width: 50px;
  margin-right: 10px;
  padding: 2px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

#vcart li div {
  width: 90%;
  display: flex;
  justify-content: space-between;
}

#vcart li span {
  margin-left: 40px;
}

#vcart i {
  display: block;
  font: bold 12px/35px arial;
  color: #fff;
  background: #be2020;
  float: left;
  width: 100%;
  text-align: center;
  border-radius: 4px;
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
.beadcrum {
}

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

body {
  background: #f8f8f8;
}

.homebanner {
  position: relative;
}

.homebanner figure {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.homebanner figure div {
  color: #fff;
  text-align: center;
  width: 56%;
}

.homebanner figure h1 {
  font: bold 33px/40px arial;
  margin-bottom: 50px;
}

.homebanner figure a {
  font: bold 15px/40px arial;
  width: 138px;
  border: 1px solid #ffd800;
  color: #fff;
  display: inline-block;
  margin: 0 3px;
  padding: 0 5px;
}

.homebanner figure a:hover {
  background: #ffd800;
}

.homebox2 {
  margin: 20px 0;
}

.homebox2 img {
  height: 100%;
}

.homebox2 figure {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  width: 100%;
  height: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
}

.camhung,
.uudai {
  overflow: hidden;
  position: relative;
}

.uudai figure {
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
}

.uudai figure label {
  font: bold 35px/50px arial;
}

.uudai figure p {
  font: bold 25px/30px arial;
}

.uudai figure a {
  display: block;
  color: #fff;
  margin: 10px auto 0;
  width: 120px;
  font: 16px/30px arial;
  padding: 0 15px;
  border: 1px solid #ffd800;
}

.uudai figure a:hover {
  background: #ffd800;
}

.camhung {
  padding-left: 20px;
  width: 534px;
}

.camhung figure {
  background-color: #deb887;
  padding: 0 25px;
  left: 20px;
  width: auto !important;
}

.camhung label {
  font: bold 25px/30px arial;
  margin-bottom: 15px;
  text-align: center;
}

.camhung p {
  text-align: justify;
  font-size: 15px;
}

.topic li {
  position: relative;
  padding: 0 5px;
}

.topic img {
  display: block;
  width: 100%;
}

.topic figure {
  height: 30px;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 0 10px;
}

.topic figure p {
  display: inline-block;
  margin: 0 0 0 4px;
}

.topic figure a {
  color: #fff;
  font: 12px/12px arial;
  padding: 0 5px;
  border-right: 1px solid #ddd;
}

.topic figure a:nth-last-child(1) {
  border-right: none;
}

.topic figure h2 {
  border-bottom: 2px solid #ffd800;
  color: #fff;
  font: bold 16px/20px arial;
  text-transform: uppercase;
  display: inline-block;
  padding: 0;
  margin: 0;
}

.topic1 li,
.topic2 li {
  width: 34%;
  overflow: hidden;
}

.topic2 {
  margin: 10px 0;
}

.topic2 li:nth-child(1) {
  width: 66.66%;
}

.topic2 li:nth-child(2) {
  width: 33.33%;
}

.topic1 img:hover,
.topic2 img:hover {
  opacity: 0.9;
}

.htit {
  display: block;
  font: bold 28px/30px arial;
  color: #6e5a41;
  margin: 50px 0 30px;
}

.dichvu {
  padding: 20px 0;
  background: #fff;
}

.dichvu ul {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.dichvu li {
  margin: 0 10px;
  border: 4px solid #eee;
  padding: 50px 15px;
  text-align: center;
  color: #666;
  width: 234px;
  position: relative;
}

.dichvu li span {
  font: 16px arial;
  margin-bottom: 20px;
  display: block;
  text-transform: uppercase;
}

.dichvu li i {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #fff;
  top: -20px;
  left: calc(50% - 20px);
  text-align: center;
}

.dichvu li i:before {
  font: 26px/40px FontAwesome;
}

.ihoi:before {
  content: "\f128";
}

.itimsp:before {
  content: "\f002";
}

.itoshop:before {
  content: "\f07a";
}

.imyser:before {
  content: "\f013";
}

.brands {
  background: url("https://denled.com/Data/upload/files/Home/BG-hang.jpg")
    no-repeat 0 0;
  padding: 40px 0;
  color: #fff;
  margin-top: 50px;
}

.brands figure {
  width: 50%;
  padding-right: 40px;
}

.brands figure label {
  font: bold italic 28px/28px arial;
  margin-bottom: 30px;
  display: block;
}

.brands div {
  width: 50%;
  text-align: center;
}

.brands div p a {
  float: left;
  width: 31.33%;
  height: 66px;
  margin: 1%;
  padding: 1%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 4px;
}

.moreb {
  border: 1px solid #f36e16;
  color: #fff;
  font: 14px/35px arial;
  padding: 0 20px;
  display: inline-block;
  margin-top: 30px;
}

.owl-carousel .owl-wrapper:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}

#category .img-responsive {
  width: 100%;
}

.owl-carousel {
  display: none;
  position: relative;
  width: 100%;
  -ms-touch-action: pan-y;
}

.owl-carousel .owl-wrapper {
  display: none;
  position: relative;
  -webkit-transform: translate3d(0px, 0px, 0px);
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

.owl-controls .owl-page,
.owl-controls .owl-buttons div {
  cursor: pointer;
}

.grabbing {
  cursor: url(grabbing.png) 8 8, move;
}

.owl-carousel .owl-wrapper,
.owl-carousel .owl-item {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
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

.owl-pagination {
  position: absolute;
  bottom: -40px;
  width: 100%;
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

#home .owl-wrapper-outer {
  padding-bottom: 0 !important;
}

#category .owl-wrapper-outer {
  padding-bottom: 25px !important;
}

#category2 .owl-wrapper-outer {
  padding-bottom: 0 !important;
}

#sync2 .owl-wrapper-outer {
  overflow: inherit;
}

#sync2 {
  border-top: none;
}

#sync2 .item {
  display: table;
  vertical-align: middle;
  position: relative;
  background: #fff;
  text-align: center;
  cursor: pointer;
  height: 79px;
  font-size: 13px;
  width: 100%;
  border-right: 1px solid #d4d4d4;
  border-bottom: 1px solid #d4d4d4;
  color: #656565;
}

#sync2 .owl-item.synced .item:before {
  content: "";
  position: absolute;
  top: -8px;
  left: calc((100% - 10px) / 2);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 5px 8px;
  border-color: transparent transparent #d6321c;
  z-index: 9;
}

#sync2 .owl-item.synced .item {
  background-color: #ff6000;
  color: #fff;
}

#sync2 .owl-item.synced .item h3 {
  font-size: 13px;
  font-weight: 700;
}

#sync2.c2 .owl-item:first-child .item {
  border-left: 1px solid #d4d4d4;
}

#sync2 .item h3,
#sync2 .item span {
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  padding: 0 15px;
}

#sync2 .item h3 i,
#sync2 .item span i {
  font: 13px/18px arial;
  display: block;
}

.img-responsive {
  max-width: 100%;
}

.owl-carousel .owl-wrapper,
.owl-carousel .owl-item img {
  width: 100%;
  display: block;
  float: left;
}

#mslidedetail .owl-item {
  display: table-cell;
  float: none;
  vertical-align: middle;
}

#mslidedetail .owl-controls {
  top: 90% !important;
  height: 10% !important;
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

.owl-item.loading {
  min-height: 150px;
  background: url(AjaxLoader.gif) no-repeat center center;
}

.Product {
  width: 100%;
  float: left;
}

.pi {
  width: 19%;
  height: 510px;
  float: left;
  padding: 10px;
  position: relative;
  margin: 0.5%;
  background: #fff;
  color: #333;
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

.s {
  background-image: url(/Content/img/sao.png);
  background-repeat: no-repeat;
  height: 20px;
  padding-left: 110px;
  display: block;
  float: left;
  width: 100%;
  font-weight: normal;
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

.bq {
  padding-top: 10px;
  float: left;
  width: 100%;
  display: flex;
  height: 100px;
}

.bq b {
  width: 38%;
  border-right: 1px solid #ddd;
}

.bq img {
  height: 100%;
}

.bq u {
  padding-left: 10px;
  line-height: 15px;
  width: 60%;
}

.bq i {
  font: 16px/16px arial;
  display: block;
  color: red;
  margin-top: 5px;
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

/*deal hot*/
.dealhot {
  margin-top: 30px;
  margin-bottom: 30px;
}

.dealhot2 {
  margin-top: 30px;
  margin-bottom: 30px;
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

.dhpro {
  background: #fff;
  border: 5px solid #bf2121;
  border-radius: 0 0 4px 4px;
}

.dealhot a {
  padding: 10px;
  color: #333;
  width: auto !important;
}

.dealhot2 a {
  padding: 10px;
  color: #333;
  width: auto !important;
}

.dealhot a div {
  height: 240px;
}

.dealhot2 a div {
  height: 240px;
}

.dealhot a h3 {
  font-size: 15px;
}

.dealhot2 a h3 {
  font-size: 15px;
}

.dealhot figure img {
  width: auto !important;
  clear: both;
  margin: 0 auto;
}

.dealhot2 figure img {
  width: auto !important;
  clear: both;
  margin: 0 auto;
}

.dealhot .bq u {
  font: 13px/14px arial;
}

.dealhot2 .bq u {
  font: 13px/14px arial;
}

.boxtit ul {
  display: flex;
  justify-content: flex-end;
}

.boxtit li {
  margin: 0 15px;
}

.boxtit li a {
  color: #3e7cae;
  font: 13px arial;
}

.bst h2 {
  cursor: pointer;
  display: inline-block;
  font: 14px arial;
  color: #333;
  padding: 0 10px;
}

.bst h2 a {
  color: #333;
}

.n2 {
  padding: 0 0 30px;
}

.n2 ul {
  justify-content: space-between;
  margin-top: 20px;
}

.n2 li {
  width: 23%;
  margin: 1%;
  display: flex;
  float: left;
}

.n2 li:nth-last-child(1) {
  margin-right: 0;
}

.n2 li a {
  color: #333;
  float: left;
  width: 100%;
}

.wi {
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  text-align: center;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  float: left;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
}

.wi img {
  width: auto;
  height: 100%;
  display: block;
}

.na {
  font-weight: 500;
  line-height: 1.4;
  font-size: 16px;
  color: #000;
  display: block;
  margin: 10px 0;
  height: 46px;
  overflow: hidden;
  float: left;
  width: 100%;
}

.owl-wrapper {
  background-color: #bfbfbf;
  padding: 15px 10px;
}
</style>
