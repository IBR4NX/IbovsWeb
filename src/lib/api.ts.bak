// // api.ts
// import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

// // Access Token محلي (Memory)
// let accessToken: string | null = null;

// // دالة لتحديث Access Token
// export const setAccessToken = (token: string) => {
//   accessToken = token;
// };

// // نوع الرد المتوقع من Refresh Token
// interface RefreshResponse {
//   accessToken: string;
// }

// // نوع الرد من أي API
// interface ApiResponse<T> {
//   data: T;
// }

// // إنشاء Axios Instance
// const api: AxiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true, // مهم إذا Refresh Token مخزن في HttpOnly Cookie
// });

// // Request Interceptor: إضافة Access Token
// api.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     if (accessToken && config.headers) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error)
// );

// // Response Interceptor: التعامل مع انتهاء Access Token
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post<RefreshResponse>(
//           "http://localhost:5000/api/auth/refresh-token",
//           {},
//           { withCredentials: true }
//         );

//         const newAccessToken = res.data.accessToken;
//         setAccessToken(newAccessToken);

//         if (originalRequest.headers) {
//           originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         }

//         return api(originalRequest);
//       } catch (err) {
//         // Refresh Token انتهت → تسجيل خروج
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
