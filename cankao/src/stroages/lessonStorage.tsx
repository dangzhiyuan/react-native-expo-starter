import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { flashShow } from "../utils/FlashMessage";
import { getBaseUrl } from "../utils/util";

interface LessonStore {
  getAllLessons: () => Promise<String>;
  startTrain: (lesson_id: number, targetSimulator: string) => Promise<string>;
  stopTrainFixed: (session_id: number, targetSimulator: string) => void;
  stopTrainAuto: (session_id: number, targetSimulator: string) => void;
  getScore: (
    lesson_id: number,
    targetSimulator: string,
    textInputValues: any
  ) => Promise<string>;
  getHistoryScore: (page_index: number, page_size: number) => Promise<any[]>;
  getSegmentScore: (result_id: string, segment_id: string) => Promise<any[]>;
  getHistoryScoreDetail: (result_id: string) => Promise<string>;
  getManualScore: (
    result_id: string,
    textInputValues: any,
    segments?: string
  ) => Promise<string>;
  getScoreTotal: (result_id: string) => Promise<string>;
  setLessonName: (result_id: string, result_name: string) => Promise<string>;
  getRealTimeEvents: (session_id: number) => Promise<string>;
  getRealTimeInfo: (session_id: number) => Promise<string>;
  getOfflineData: (
    session_id: number,
    target_simulator: number
  ) => Promise<string>;
  printReport: (result_id: string) => Promise<string>;
  loading: boolean;
  message?: string;
  lessonData?: any;
  currentSessionId?: string;
  currentScore?: any;
  totalScore?: any;
  historyScore?: any;
}

export const lessonStore = create<LessonStore>((set) => ({
  loading: true,
  message: undefined,
  lessonData: undefined,
  currentSessionId: undefined,
  currentScore: undefined,
  totalScore: undefined,
  historyScore: undefined,

  getAllLessons: async () => {
    try {
      const BASE_URL = await getBaseUrl();
      const getToken = async () => {
        return await SecureStore.getItemAsync("token");
      };
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/lesson/classification`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.ret === 0) {
        const tmp = response.data.data;
        set({ lessonData: tmp });
        set({ message: response.data.message });
        flashShow(response.data.message);
      } else {
        flashShow(response.data.message);
        throw new Error(
          `Get lessons info error: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      flashShow(error.message);
      set({ message: error.message });
      return "error";
    } finally {
      set({ loading: false });
    }
  },

  startTrain: async (lesson_id: number, targetSimulator: string) => {
    console.log("startTrainAuto called");
    console.log("startTrainId", lesson_id);
    try {
      const BASE_URL = await getBaseUrl();
      const getToken = async () => {
        return await SecureStore.getItemAsync("token");
      };

      const token = await getToken();
      const response = await axios.post(
        `${BASE_URL}/lesson/start/${lesson_id}/${targetSimulator}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const session_id = response.data;
      console.log("Response from startTrain:", session_id);
      set({ currentSessionId: session_id });
      return session_id;
    } catch (error) {
      console.error("Error starting training:", error);
      set({ message: error.message });
      return "error";
    }
  },

  stopTrainFixed: async (session_id: number, targetSimulator: string) => {
    console.log("stopTrainFixed called", session_id, targetSimulator);
    set({ currentScore: null });
    set({ message: null });
    const startTime = performance.now();
    try {
      const BASE_URL = await getBaseUrl();
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.post(
        `${BASE_URL}/lesson/stop/fixed/${session_id}/${targetSimulator}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from stopTrain:", response.data);
      const data = response.data;
      if (data.ret === 0) {
        console.log("Successful response from stopTrain:", data.data);
        set({ currentScore: data.data });
      } else {
        throw new Error(
          `Get stopTrain error: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      set({ message: error.message });
    } finally {
      const endTime = performance.now();
      const runTime = endTime - startTime;
      console.log(
        `stopTrainAuto method execution time: ${runTime.toFixed(2)} ms`
      );
    }
  },

  stopTrainAuto: async (session_id: number, targetSimulator: string) => {
    const currentTime = new Date();
    const formatter = new Intl.DateTimeFormat("zh-CN", {
      timeZone: "Asia/Shanghai",
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const formattedTime = formatter.format(currentTime);
    console.info(
      `结束方法被调用了***************************** 当前时间: ${formattedTime}`
    );
    set({ currentScore: null });
    set({ message: null });
    const startTime = performance.now();
    console.log("stopTrain called", session_id, targetSimulator);
    try {
      const BASE_URL = await getBaseUrl();
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.post(
        `${BASE_URL}/lesson/stop/auto/${session_id}/${targetSimulator}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from stopTrain:", response.data);
      const data = response.data;
      if (data.ret === 0) {
        console.log("Successful response from stopTrain:", data.data);
        set({ currentScore: data.data });
      } else {
        throw new Error(
          `Get stopTrain error: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error in stopTrain:", error);
      set({ message: error.message });
    } finally {
      const endTime = performance.now();
      const runTime = endTime - startTime;
      console.log(
        `stopTrainAuto method execution time: ${runTime.toFixed(2)} ms`
      );
    }
  },

  getSegmentScore: async (result_id: string, segment_id: string) => {
    console.log("getSegmentScore called", result_id, segment_id);
    try {
      const BASE_URL = await getBaseUrl();
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${BASE_URL}/lesson/detail/segment/${result_id}/${segment_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from get score:", response.data);
      return response.data;
    } catch (error) {
      set({ message: error.message });
      return [];
    }
  },

  getScore: async (
    lesson_id: number,
    targetSimulator: string,
    textInputValues: any
  ) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const BASE_URL = await getBaseUrl();
      const response = await axios.post(
        `${BASE_URL}/lesson/score/${lesson_id}/${targetSimulator}`,
        textInputValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ totalScore: response.data.data });
    } catch (error) {
      console.error("Error get score:", error);
      set({ message: error.message });
      return "error";
    }
  },

  getHistoryScore: async (page_index, page_size) => {
    try {
      const BASE_URL = await getBaseUrl();
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${BASE_URL}/lesson/history/overall/${page_index}/${page_size}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Response from get score:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error get history score:", error.message);
      return []; // 或者返回null或其他特殊值以表示错误发生
    }
  },

  getHistoryScoreDetail: async (result_id) => {
    console.log("getHistoryScoreDetail called", result_id);
    try {
      const BASE_URL = await getBaseUrl();
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${BASE_URL}/lesson/history/detail/${result_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from get history score fixed:", response.data.data);
      return response.data.data;
    } catch (error) {
      flashShow(error.message);
      // console.error("Error get history score:", error.message);
      return []; // 或者返回null或其他特殊值以表示错误发生
    }
  },

  getManualScore: async (
    result_id: string,
    textInputValues: any,
    segments = ""
  ) => {
    try {
      const BASE_URL = await getBaseUrl();
      const token = await SecureStore.getItemAsync("token");

      console.log("result_id", result_id);
      console.log("textInputValues", textInputValues);
      let url = `${BASE_URL}/lesson/score/manual/${result_id}`;
      if (segments !== "") {
        url += `?segment_id=${segments}`;
      }
      const response = await axios.post(url, textInputValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from get manual score", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error get history score:", error.message);
      return []; // 或者返回null或其他特殊值以表示错误发生
    }
  },

  getScoreTotal: async (result_id) => {
    try {
      const BASE_URL = await getBaseUrl();
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${BASE_URL}/lesson/score/total/${result_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from get lesson score total", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error get history score:", error.message);
      return []; // 或者返回null或其他特殊值以表示错误发生
    }
  },
  setLessonName: async (result_id, result_name) => {
    try {
      const BASE_URL = await getBaseUrl();
      const token = await SecureStore.getItemAsync("token");
      const url = `${BASE_URL}/lesson/history/setname/${result_id}?result_name=${encodeURIComponent(
        result_name
      )}`;
      const response = await axios.post(url, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from set lesson name", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error set lesson name:", error.message);
      return []; // 或者返回null或其他特殊值以表示错误发生
    }
  },

  getRealTimeEvents: async (session_id: number) => {
    try {
      const BASE_URL = await getBaseUrl();
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${BASE_URL}/lesson/realtime/events/${session_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Response from getRealtimeEvents:", response.data);
      return response.data.data;
    } catch (error) {
      set({ message: error.message });
    }
  },

  getRealTimeInfo: async (session_id: number) => {
    try {
      const BASE_URL = await getBaseUrl();
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(
        `${BASE_URL}/lesson/session_status/${session_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Response from getRealtimeEvents:", response.data);
      return response.data.data;
    } catch (error) {
      set({ message: error.message });
    }
  },

  getOfflineData: async (session_id: number, target_simulator: number) => {
    try {
      const BASE_URL = await getBaseUrl();
      let url = `${BASE_URL}/test/universal/offline/${session_id}?target_simulator=${target_simulator}`;

      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from get offline data", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error get history score:", error.message);
      return [];
    }
  },

  printReport: async (result_id) => {
    try {
      const BASE_URL = await getBaseUrl();
      let url = `${BASE_URL}/report/${result_id}`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from printReport", response.data);
      return response.data;
    } catch (error) {
      console.error("Error get report:", error.message);
      return [];
    }
  },
}));
