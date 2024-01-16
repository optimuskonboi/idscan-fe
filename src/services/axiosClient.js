import axios from "axios";
const header = sessionStorage.getItem("token") ?{
  authorization: `Bearer ${sessionStorage.getItem("token")}`,
}:{}
const axiosClient = axios.create({
  baseURL: "http://42.96.40.237:18002/api/v1/",
  headers: {
    // "Content-Type": "application/json",
    ...header
  },
});
axiosClient.interceptors.request.use(async (config) => {
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {

    if (response && response.data) {
      return response.data;
    }
    console.log(response.status);
    if (localStorage.getItem("token") && response.status === 401) {
      async function refreshToken() {
        const res = await axios.get(
          "http://103.172.236.186:18003/authentication/refreshtoken",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        localStorage.setItem("token",res.refreshToken)
      }
      refreshToken();
    }
    return response;
  },
  (error) => {
    console.log("tung");
    throw error;
  }
);
export default axiosClient;
