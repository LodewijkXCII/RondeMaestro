import axios from "axios";
import router from "../router";
// TODO CHECK OUT THIS MESS
const setup = (store) => {
  axios.interceptors.request.use(
    (setting) => {
      const accesToken = localStorage.getItem("token");

      if (accesToken) {
        setting.headers.Authorization = accesToken
          ? `Bearer ${accesToken}`
          : "";
      }
      return setting;
    },
    (error) => {
      console.error(error);
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const originalRequest = error.config;
      console.log("hiero", originalRequest, error);
      if (
        error.response.status === 401
        // && !originalRequest._retry
      ) {
        // originalRequest._retry = true;
        // return refreshAccessToken().then((response) => {
        //   originalRequest.headers.Authorization = response.accessToken;
        //   return axios(originalRequest);
        // });
        // router.push("/aanmelden");
        console.error("error");
        // console.error(error);
        return error;
      }
      return Promise.reject(error);
    }
  );
};

export default setup;
