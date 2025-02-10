import { useState, useCallback } from "react";
import { PermissionService } from "../services/permissions";
import Button from "@/components/Button/Button";
import { showToast } from "@/utils/toast";

export function usePermissions() {
  const [cameraGranted, setCameraGranted] = useState(false);
  const [photoGranted, setPhotoGranted] = useState(false);

  const requestCamera = useCallback(async () => {
    const granted = await PermissionService.requestCamera();
    setCameraGranted(granted);
    return granted;
  }, []);

  const requestPhotoLibrary = useCallback(async () => {
    const granted = await PermissionService.requestPhotoLibrary();
    setPhotoGranted(granted);
    return granted;
  }, []);

  return {
    cameraGranted,
    photoGranted,
    requestCamera,
    requestPhotoLibrary,
  };
}

// 使用示例
function ImagePicker() {
  const { cameraGranted, requestCamera } = usePermissions();

  const handleTakePhoto = async () => {
    if (!cameraGranted) {
      const granted = await requestCamera();
      if (!granted) {
        // showToast("需要相机权限才能拍照");
        return;
      }
    }
    // 打开相机拍照
  };

  return;
}
