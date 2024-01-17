import axios from "axios";
import router from "../router";

// async function refreshAccessToken() {
//   try {
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_API_URL}/users/refresh`
//     );
//     const accessToken = data.token;
//     localStorage.setItem("token", accessToken);
//     userStore.accesToken = accessToken;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

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
        console.log("error");
        // console.error(error);
        return error;
      }
      return Promise.reject(error);
    }
  );
};

export default setup;
