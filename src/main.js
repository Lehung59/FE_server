import { createApp } from "vue";
import { inject } from "vue";
import { createPinia } from "pinia";
import router from "./router/route-index.js";
import axios from "axios";
window.axios = axios;

import api from "./api/api";
window.api = api;
//
import {
  ConfigProvider,
  Checkbox,
  Input,
  InputNumber,
  Select,
  Avatar,
  Table,
  Card,
  Menu,
  List,
  Drawer,
  Button,
  message,
  Pagination,
  Form,
  Popconfirm,
  Upload,
  Dropdown,
  Breadcrumb,
  Switch,
  DatePicker,
  Modal,
  Calendar,
} from "ant-design-vue";

import App from "./App.vue";

import "./static/fontawesome/css/all.min.css";

import "ant-design-vue/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
//

app.use(ConfigProvider);
app.use(Checkbox);
app.use(Input);
app.use(InputNumber);
app.use(Select);
app.use(Avatar);
app.use(Table);
app.use(Card);
app.use(Menu);
app.use(List);
app.use(Button);
app.use(Drawer);
app.use(Pagination);
app.use(Form);
app.use(Popconfirm);
app.use(Upload);
app.use(Dropdown);
app.use(Breadcrumb);
app.use(Switch);
app.use(DatePicker);
app.use(Modal);
app.use(Calendar);
//
app.mount("#app");
app.config.globalProperties.$message = message;
