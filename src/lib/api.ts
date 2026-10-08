// const deviceInfo = {
//   userAgent: navigator.userAgent,
//   language: navigator.language,
//   platform: navigator.platform,
//   online: navigator.onLine,
// };
import axios from "axios";
//<##☆##> api <##☆##> 
const API_URL = import.meta.env.VITE_API_URL ;

const api = axios.create({
  baseURL:API_URL ,
  //  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response?.status,originalRequest._retry);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${API_URL}/login/refresh-token`, {
          refreshToken: refreshToken,
        });
        console.log(response);
        const newToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;
        localStorage.setItem("token", newToken);
        localStorage.setItem("refreshtoken", newRefreshToken);
        originalRequest.headers.Authorization = `${newToken}`;
        return api(originalRequest);
      } catch (err) {
        // localStorage.removeItem("token");
        // localStorage.removeItem("refreshtoken");
        // window.location.href = "/login";
        console.log(err);
      }
    }
    return Promise.reject(error);
  }
);
// Error Handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
interface apiData {
  err:String,
  success:boolean,
  data:any,
}
function response(err:String="",data:any,success:boolean=true):apiData {
// console.log(req); 
// const res = await api.post(url, req);
return {err:err , success:success,data:data} ;
};
export async function apiPost(url:string,req:any) {
       api.post(url, req)
        .then((res) => {
          // localStorage.setItem("token", res.data.token);
          // console.log(res);
          // setMessange(res.data.error)
          return response("",res.data);
        })
        .catch((err) => {
          return response(err.response?.data?.error || "حدث خطأ غير متوقع","",false);
        });
}
export const post=(url:string,req:any)=> api.post(url,req);
export const setToken=(token:string,refreshtoken:string)=> {
  if(token) localStorage.setItem("token", token);
  if(refreshtoken) localStorage.setItem("refreshtoken", refreshtoken);
}
export default  apiPost;

export { API_URL,api }
