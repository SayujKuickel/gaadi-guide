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

  const icons = {
    information: "fi fi-rr-exclamation",
    success: "fi fi-rr-check-circle",
    error: "fi fi-rr-cross-circle",
  };

  const colors = {
    information: "#d5b63e",
    success: "#12a82e",
    error: "#bc2c36",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {isShown && toastInfo && (
        <div className="fixed z-[999999] top-0 right-0 w-full md:w-fit p-2 md:p-4">
          <div className="bg-background outline-2 outline-surface-3 shadow-xl shadow-surface-3/50 rounded-md overflow-hidden animate-in-fade">
            <div className="flex gap-2 px-2 py-3 items-start">
              <div className="grid  place-items-center">
                <i
                  style={{ color: `${colors[toastInfo.type]}` }}
                  className={`${
                    toastInfo.customFavicon || icons[toastInfo.type]
                  } flex text-xl`}
                />
              </div>

              <span className="text-sm text-offText/80 max-w-[20rem]">
                {toastInfo.message}
              </span>

              <div onClick={() => setIsShown(false)}>
                <i className="fi fi-rr-cross-small flex cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
