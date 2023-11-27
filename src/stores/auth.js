import { defineStore } from "pinia";
import axios from "axios";

const URL = "http://localhost:1992/api/v1/";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    accesToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvZWt6d2VlcnNAZ21haWwuY29tIiwiaWF0IjoxNjg3NDY1NDMzLCJleHAiOjE2OTc0NjU0MzN9.LLVyi-sP2U6JmKPe00sqVaPnXx0qwMw0XFPF_wSd1FA",
    refreshToken: "",
    userName: "",
    userType: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accesToken,
    getUserName: (state) => state.userName,
  },
  actions: {
    async login(email, password, route) {
      try {
        const sendData = {
          email,
          password,
        };
        const { data } = await axios.post(
          `http://localhost:1992/api/v1/${route}`,
          {
            email,
            password,
          }
        );

        console.log(data);
        localStorage.setItem("acces-token", data.accesToken);
        localStorage.setItem("refresh-token", data.refreshToken);

        this.accesToken = data.accesToken;
        this.refreshToken = data.refreshToken;
        this.userName = data.user;
        this.userType = data.user.user_type;

        return true;
      } catch (e) {
        console.error(e);
        localStorage.removeItem("acces-token");
        localStorage.removeItem("refresh-token");
        return false;
      }
    },
    async logout() {
      try {
        const refrehToken = localStorage.getItem("refresh-token");
        await axios.delete(
          `http://localhost:1992/api/v1/auth/logout`,
          refrehToken
        );
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
});
