import axios from "axios";
import { getToken } from "./AuthApi.js";

export const client = axios.create({
    // baseURL: "http://116.96.98.21:8080",
    baseURL:'http://localhost:8080',
    // baseURL:'http://cuong02.com/',
});

const whiteList = ["/api/v1/auth", "/public"];
client.interceptors.request.use(
  (config) => {
    if (whiteList.some((prefix) => config.url.startsWith(prefix))) {
      return config;
    }

    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const isSuccess = (response) => {
  return response.status >= 200 && response.status < 300;
};
