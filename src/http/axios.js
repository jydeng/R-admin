import axios from "axios";
import qs from "qs";
import { Notification } from "element-ui";
import store from "@/store";
import router from "@/router";

// axios实例
const Axios = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/" : "/api",
  timeout: 5000,
  responseType: "json"
});

// 请求发起阶段
Axios.interceptors.request.use(
  config => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    config.headers["Authorization"] = store.state.common.token;
    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error.message);
  }
);

// 请求响应阶段
Axios.interceptors.response.use(
  res => {
    const data = res.data;
    const { code } = data;

    if (code) {
      switch (code) {
        case 200:
          Notification({
            message: res.data.msg,
            type: "success",
            duration: 2000
          });
          return Promise.resolve(res.data);

        default:
          Notification({
            message: res.data.msg,
            type: "error",
            duration: 2000
          });
          return Promise.reject(res.data.msg);
      }
    } else {
      return Promise.resolve(res.data);
    }
  },
  error => {
    switch (error.response.status) {
      case 400:
        Notification({
          message: "登录超时，请重新登录",
          type: "warning",
          duration: 2000
        });

        store.dispatch("logout");
        router.push("/login");
        return Promise.reject(error.message);
      default:
        Notification({
          message: "网络错误,请重试",
          type: "error",
          duration: 3000
        });
        return Promise.reject(error.message);
    }
  }
);

export default Axios;
