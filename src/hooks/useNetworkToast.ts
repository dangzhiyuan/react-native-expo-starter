import { useEffect } from "react";
import { useNetwork } from "../contexts/NetworkProvider";
import { showToast } from "../utils/toast";
import { useTranslation } from "react-i18next";

export const useNetworkToast = () => {
  const { isConnected, type } = useNetwork();
  const { t } = useTranslation();

  useEffect(() => {
    if (isConnected) {
      showToast({
        type: "success",
        message: t("network.connected", { type: type?.toUpperCase() }),
        duration: 2000,
      });
    } else {
      showToast({
        type: "warning",
        message: t("network.offline"),
        duration: 3000,
      });
    }
  }, [isConnected, type, t]);
};
