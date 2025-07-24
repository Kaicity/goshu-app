import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";

let isLoggingOut = false;

const bc = new BroadcastChannel("auth");

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },

  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: "repeat",
    }),
});

// Gắn token từ cookie
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    if (
      response?.data?.data &&
      response.status >= 200 &&
      response.status < 300
    ) {
      return response.data;
    }
    throw response;
  },
  (error) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      alert("Phiên đăng nhập đã hết hạn");
      Cookies.remove("authToken");
      Cookies.remove("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
