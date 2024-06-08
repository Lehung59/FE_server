import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import "ant-design-vue/dist/antd.min.css";
import { message } from "ant-design-vue";
// import { fetchWrapper, router } from '@/helpers';
import API from "../api/api";
import ApiRole from "../api/ApiRole.js";
import TokenService from "../api/TokenService";
const baseUrl = `${import.meta.env.VITE_API_URL}/Authentication`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    router: useRouter(),
    user: TokenService.getUser(),
    roleClaim: null,
    boolToken: true,
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      const result = await API.post(`${baseUrl}/login`, {
        username,
        password,
      });
      this.user = result.data;
      TokenService.setUser(result.data);
      this.router.push(this.returnUrl || "/");
      message.success("Đăng nhập thành công!");
    },
    async logout(username) {
      // const result = await API.post(`${baseUrl}/revoke/${username}`, {});
      this.user = null;
      TokenService.removeUser();
      this.router.push("/login");
      message.success("Đăng xuất thành công!");
    },
    checkToken() {
      if (TokenService.getUser() == null) {
        this.boolToken = true;
        return true;
      } else {
        this.boolToken = true;
        return true;
      }
    },
  },
});
