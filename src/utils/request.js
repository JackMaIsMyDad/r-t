import axios from "axios";
import { getToken } from "./auth";
import { message } from "antd";

// create an axios instance
const service = axios.create({
  timeout: 5000, // request timeout
  headers: { "Content-Type": "application/json" }
});

service.interceptors.request.use(
  (config) => {
    const authToken = getToken();
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 0) {
      message.error(res.message);
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    // console.log('err' + error)
    message.error("request fault！");
    return Promise.reject(error);
  }
);

export default service;
