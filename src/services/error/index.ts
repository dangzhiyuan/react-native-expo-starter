import { useToast } from "@/components/Toast/ToastContext";

interface ErrorConfig {
  shouldReport?: boolean;
  shouldShowToast?: boolean;
}

class ErrorService {
  private static instance: ErrorService;
  private toastFn: ((message: string) => void) | null = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new ErrorService();
    }
    return this.instance;
  }

  // 设置显示toast的函数
  setToastFunction(fn: (message: string) => void) {
    this.toastFn = fn;
  }

  handleError(error: Error, config: ErrorConfig = {}) {
    const { shouldReport = true, shouldShowToast = true } = config;

    // 显示错误提示
    if (shouldShowToast && this.toastFn) {
      this.toastFn(error.message);
    }

    // 开发环境打印错误
    if (__DEV__) {
      console.error("Error:", error);
    }
  }
}

export const errorService = ErrorService.getInstance();
