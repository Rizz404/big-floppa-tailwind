import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// * Fungsi untuk menambahkan subscriber ke dalam queue
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// * Fungsi untuk mengirimkan token yang diperbarui ke subscriber
const onRrefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.data.message === "jwt expired") {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await axiosInstance.post("/auth/refresh");
          const newToken = response.data.token;

          if (newToken) {
            localStorage.setItem("accessToken", newToken);
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
            onRrefreshed(newToken);
          }
        } catch (error) {
          // Jika refresh token gagal, hapus token dan redirect ke login
          localStorage.removeItem("accessToken");
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken: string) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
