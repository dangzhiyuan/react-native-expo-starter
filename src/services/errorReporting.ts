import { Platform } from "react-native";
// import { api } from "../api"; // axios发请求实例

interface ErrorReport {
  error: Error;
  errorInfo?: React.ErrorInfo;
  extra?: Record<string, any>;
  timestamp: number;
  deviceInfo: {
    platform: string;
    version: string;
    brand?: string;
    model?: string;
    appVersion: string;
  };
}

interface ErrorContext {
  [key: string]: any;
}

class ErrorReportingService {
  private static instance: ErrorReportingService;
  private initialized: boolean = false;
  private queue: ErrorReport[] = [];

  private constructor() {
    // 应用启动时初始化
    this.init().catch(console.error);
  }

  static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }
    return ErrorReportingService.instance;
  }

  async init() {
    if (this.initialized) return;

    try {
      // 处理启动时的队列
      await this.processQueue();
      this.initialized = true;
    } catch (error) {
      console.error("Error reporting service init failed:", error);
    }
  }

  reportError(error: Error, context?: ErrorContext) {
    // 在开发环境下打印错误信息
    if (__DEV__) {
      console.error("Error:", error);
      if (context) {
        console.error("Context:", context);
      }
    }

    const report: ErrorReport = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } as Error,
      extra: context,
      timestamp: Date.now(),
      deviceInfo: {
        platform: Platform.OS,
        version: Platform.Version.toString(),
        brand: Platform.select({ android: "unknown", ios: "Apple" }),
        model: Platform.select({
          android: "Android Device",
          ios: "iOS Device",
        }),
        appVersion: "1.0.0", // 从 app.json 或环境变量获取
      },
    };

    if (!this.initialized) {
      this.queue.push(report);
      return;
    }

    try {
      // await api.post("/api/errorreport", report);
      console.log("Error reported successfully:", report);
    } catch (e) {
      console.error("Failed to report error:", e);
      this.queue.push(report);
    }
  }

  logError(message: string, context?: ErrorContext) {
    const error = new Error(message);
    this.reportError(error, context);
  }

  handlePromiseRejection(reason: any) {
    if (reason instanceof Error) {
      this.reportError(reason);
    } else {
      this.reportError(new Error(String(reason)));
    }
  }

  private async processQueue() {
    if (!this.initialized || this.queue.length === 0) return;

    const reports = [...this.queue];
    this.queue = [];

    for (const report of reports) {
      try {
        this.reportError(report.error, report.extra);
      } catch (e) {
        console.error("Failed to process queued error report:", e);
        this.queue.push(report);
      }
    }
  }
}

// 导出单例实例
export const errorReporting = ErrorReportingService.getInstance();

// 导出便捷方法
export const { reportError, logError, handlePromiseRejection } = errorReporting;
