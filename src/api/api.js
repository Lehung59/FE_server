import axios from "axios";
import { message } from "ant-design-vue";
import TokenService from "./TokenService";
const baseURL = import.meta.env.VITE_API_URL;
//
const instance = axios.create({
  baseURL,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/Authentication/login" && err.response) {
      // Access Token was expired; || err.response.status === 400
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          console.log("tra ve sau khi login & refresh token neu co");
          const rs = await instance.post("/Authentication/refresh-token", {
            AccessToken: TokenService.getLocalAccessToken(),
            RefreshToken: TokenService.getLocalRefreshToken(),
          });
          // pass access token & refresh token
          console.log("sau khi refresh token: ok");
          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken, rs.data);
          return instance(originalConfig);
        } catch (_error) {
          console.log("chay vao catch: sau khi refresh token");
          return Promise.reject(_error);
        }
      } else {
        // bat loi bad request: 400
        if (err.response.status === 400) {
          console.log("err.response.status === 400");
          // TokenService.removeUser();
          // window.location.assign("/login");
        } else if (err.response.status === 500) {
          console.log("err.response.status === 500");
        } else if (err.response.status === 403) {
         
        } else {
          if (TokenService.getUser() == null) {
           
          } else {
            message.error("Lỗi! Hệ thống không tìm thấy thông tin người dùng.");
          }
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
