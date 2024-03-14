import { useAuthStore } from "../stores/userAuth";
import axios from "axios";

export const authGuard = async (to, from, next) => {
  const userStore = useAuthStore();

  const loggedInValue = await userStore.getLoggedInValue;

  if (loggedInValue == true) {
    next();
  } else {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/authcheck`
        );

        userStore.checkedToken(data);
        // Check if token is valid
        next();
        // if valid, get userInfo

        // Return and set userinfo
        // next()
      }
    } catch (error) {
      next("/inloggen");
    }
  }
};
