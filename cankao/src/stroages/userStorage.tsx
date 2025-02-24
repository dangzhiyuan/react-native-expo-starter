import { create } from "zustand";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { flashShow } from "../utils/FlashMessage";
import { getBaseUrl } from "../utils/util";

interface UserStore {
  status: string;
  login: (license: string, password: string) => Promise<String>;
  logout: () => void;
  setToken: (token: string | undefined) => void;
  setLoading: (loading: boolean) => void;
  token?: string;
  loading: boolean;
  loginInfo?: string;
}

export const userStore = create<UserStore>((set) => ({
  status: "idle",
  loading: true,

  login: async (license_number: string, passwd: string) => {
    set({ status: "signIn", token: undefined });
    return null;
    // try {
    //   const BASE_URL = await getBaseUrl();
    //   const response = await axios.post(`${BASE_URL}/user/login`, {
    //     license_number,
    //     passwd,
    //   });
    //   const { ret, message, data } = response.data;
    //   if (ret === 0) {
    //     const { token } = data;
    //     if (!token) {
    //       flashShow("Token not received");
    //       throw new Error("Token not received");
    //     }
    //     await SecureStore.setItemAsync("token", token);
    //     console.log("Token stored in SecureStore:", token);
    //     set({ loginInfo: license_number });
    //     set({ status: "signIn", token });
    //     flashShow(message);
    //     return message;
    //   } else {
    //     flashShow(message);
    //     throw new Error(`Login error: ${message}`);
    //   }
    // } catch (error) {
    //   set({ loginInfo: error.message });
    //   set({ status: "signOut", token: undefined });
    // } finally {
    //   set({ loading: false });
    // }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    set({ status: "signOut", token: undefined });
  },

  setToken: (token) => set({ token }),

  setLoading: (loading) => set({ loading }),
}));
