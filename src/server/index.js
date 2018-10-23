import axios from "axios";
import qs from "qs";
import { Notification } from "element-ui";
import router from "@/router";

const Axios = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/" : "/api",
  timeout: 10000,
  responseType: "json"
});

Axios.interceptors.request.use(
  config => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    Notification({
      message: error.message,
      type: "error"
    });

    return Promise.reject(error.message);
  }
);

Axios.interceptors.response.use(
  res => {
    switch (res.data.code) {
      case 300:
        Notification({
          message: "登录超时，请重新登录",
          type: "warning"
        });
        router.push("/login");
        break;

      case 200:
        return res;

      case 400:
        Notification({ message: res.data.msg, type: "error" });
        return Promise.reject();
    }
  },
  error => {
    Notification({
      message: "网络错误,请重试",
      type: "error"
    });
    return Promise.reject(error);
  }
);

export default {
  install: Vue => {
    Object.defineProperty(Vue.prototype, "$http", { value: Axios });
  }
};
