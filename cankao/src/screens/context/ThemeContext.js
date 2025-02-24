/* eslint-disable prettier/prettier */
import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [backgroundColor, setBackgroundColor] = useState(null);
  useEffect(() => {
    const queryThemeConfig = async () => {
      try {
        const cacheBackgroundColor = await SecureStore.getItemAsync(
          "backgroundColor"
        );
        if (cacheBackgroundColor != null) {
          setBackgroundColor(cacheBackgroundColor);
        }
      } catch (e) {
        console.log(e);
      }
    };
    queryThemeConfig().then((r) => void 0);
  }, []);
  return (
    <ThemeContext.Provider value={[backgroundColor, setBackgroundColor]}>
      {props.children}
    </ThemeContext.Provider>
  );
};
