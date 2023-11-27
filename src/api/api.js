import axios from "axios";
// import { useAuthStore } from "../stores/auth";

async function refreshAccessToken() {
  try {
    // const authStore = useAuthStore();
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/refresh`
    );
    const accessToken = data.token;
    localStorage.setItem("token", accessToken);
    userStore.accesToken = accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const setup = (store) => {
  axios.interceptors.request.use(
    (setting) => {
      const accesToken = localStorage.getItem("token");
      console.log("hierzo", accesToken);
      if (accesToken) {
        setting.headers["Authorization"] = accesToken;
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
      console.log("daarzo");
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return refreshAccessToken().then((response) => {
          originalRequest.headers.Authorization = response.accessToken;
          return axios(originalRequest);
        });
      }
      return Promise.reject(error);
    }
  );
};

export default setup;
