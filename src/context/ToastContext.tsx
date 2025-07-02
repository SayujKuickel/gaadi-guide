// src/context/ToastContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

interface ToastInfo {
  message: string;
  type: "information" | "success" | "error";
  customFavicon?: string;
}

interface ToastContextType {
  showToast: (
    message: string,
    type: ToastInfo["type"],
    customFavicon?: string
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [toastInfo, setToastInfo] = useState<ToastInfo | null>(null);
  const [isShown, setIsShown] = useState(false);
  const timeout = 3000;

  const showToast = useCallback(
    (message: string, type: ToastInfo["type"], customFavicon?: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setToastInfo({ message, type, customFavicon });
      setIsShown(true);

      timeoutRef.current = setTimeout(() => {
        setIsShown(false);
        timeoutRef.current = null;
      }, timeout);
    },
    []
  );

  const colors = {
    information: "#d5b63e",
    success: "#12a82e",
    error: "#bc2c36",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {isShown && toastInfo && (
        <section className="fixed z-[999999] top-0 right-0 w-full md:w-fit p-2 md:p-3">
          <div className="bg-background text-white rounded-2xl shadow-2xl p-4 max-w-sm animate-slide-up">
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-6 rounded-full flex-shrink-0 opacity-80"
                style={{ backgroundColor: colors[toastInfo.type] }}
              />
              <div className="flex-1">
                <p className="text-offText/80 text-sm font-medium leading-snug">
                  {toastInfo.message}
                </p>
              </div>
              <button
                onClick={() => setIsShown(false)}
                className="py-1 cursor-pointer hover:text-white transition-colors ml-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}
    </ToastContext.Provider>
  );
};
