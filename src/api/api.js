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
    return Promise.reject(err);
  }
);
export default instance;
