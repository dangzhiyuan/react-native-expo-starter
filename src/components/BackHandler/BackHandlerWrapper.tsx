import React from "react";
import { useDoubleBackExit } from "@/hooks/useDoubleBackExit";

export const BackHandlerWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useDoubleBackExit();
  return <>{children}</>;
};
