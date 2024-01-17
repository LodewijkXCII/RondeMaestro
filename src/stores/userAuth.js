import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("userAuth", {
  state: () => ({
    isLoggedIn: false,
    user: {
      userName: "",
      userId: Number,
      userRole: Number,
    },
  }),
  getters: {
    getUserName: (state) => state.user.userName,
    getLoggedInValue: (state) => state.isLoggedIn,
    getUserID: (state) => state.user.userId,
  },
  actions: {
    async login(loginData) {
      let response;

      localStorage.removeItem("token");

      try {
        const { data, status } = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/login`,
          {
            email: loginData.email,
            password: loginData.password,
          }
        );

        this.isLoggedIn = true;
        if (data.token) {
          this.user.userRole = data.user.user_role_id;
          this.user.userId = data.user.id;
          this.user.userName = data.user.name;
          response = {
            message: "Succesvol ingelogd!",
            code: status,
          };

          localStorage.setItem("token", data.token);
          return response;
        }
      } catch (error) {
        return {
          message: error.response.data.errors,
          code: error.response.status,
        };
      }
    },

    async checkedToken(userData) {
      try {
        localStorage.removeItem("token");

        this.isLoggedIn = true;
        this.user.userRole = userData.user.user_role_id;
        this.user.userId = userData.user.id;
        this.user.userName = userData.user.name;
        localStorage.setItem("token", userData.token);
      } catch (error) {
        return {
          message: "Het is niet gelukt",
        };
      }
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
});
