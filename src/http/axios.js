import store from "@/store";
import axios from "axios";
import qs from "qs";
import { Notification } from "element-ui";
import NProgress from "nprogress";

// axios实例
const Axios = axios.create({
  baseURL: "/api",
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
    NProgress.start();
    return config;
  },
  error => {
    return Promise.reject(error);
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
          NProgress.done();
          return Promise.resolve(res);

        default:
          NProgress.done();
          return Promise.reject(res);
      }
    } else {
      NProgress.done();
      return Promise.resolve(res);
    }
  },
  error => {
    switch (error.response.status) {
      case 400:
      case 401:
        Notification({
          title: "提示",
          message: "登录超时，请重新登录",
          type: "warning",
          duration: 2000
        });

        store.dispatch("user/logout");
        NProgress.done();
        return Promise.reject(error);
      default:
        Notification({
          title: "提示",
          message: "网络错误,请重试",
          type: "error",
          duration: 3000
        });
        NProgress.done();
        return Promise.reject(error);
    }
  }
);

/**
 * get
 * @param {*} url 接口地址
 * @param {*} params 参数
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        Notification({
          title: "提示",
          message: error.data.msg,
          type: "error",
          duration: 2000
        });
        reject(error);
      });
  });
}

/**
 * post
 * @param {*} url 接口地址
 * @param {*} data 数据
 */
export function post(url, data) {
  return new Promise((resolve, reject) => {
    Axios.post(url, data)
      .then(res => {
        Notification({
          title: "提示",
          message: res.data.msg,
          type: "success",
          duration: 2000
        });
        resolve(res.data);
      })
      .catch(error => {
        Notification({
          title: "提示",
          message: error.data.msg,
          type: "error",
          duration: 2000
        });
        reject(error);
      });
  });
}
