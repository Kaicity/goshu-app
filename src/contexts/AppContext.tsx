"use client";

import type UserAccountDto from "@/models/dto/userAccountDto";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {
  userAccount: UserAccountDto | null;
  setUserAccount: (user: UserAccountDto | null) => void;
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  logout: () => void;
}

const AppContext = createContext<Props | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [authToken, setAuthToken] = useState<string | null>(
    Cookies.get("authToken") || null
  );

  const [userAccount, setUserAccount] = useState<UserAccountDto | null>(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    try {
      const parsedUser = userStorage
        ? (JSON.parse(userStorage) as UserAccountDto)
        : null;
      setUserAccount(parsedUser);
    } catch (error) {
      console.error("Invalid JSON in localStorage user:", userStorage);
      localStorage.removeItem("user");
      setUserAccount(null);
    }
  }, []);

  const logout = () => {
    Cookies.remove("authToken");
    setAuthToken(null);
    localStorage.removeItem("user");
    setUserAccount(null);
    router.push("/");
  };

  return (
    <AppContext.Provider
      value={{
        userAccount: userAccount,
        setUserAccount: setUserAccount,
        authToken: authToken,
        setAuthToken: setAuthToken,
        logout: logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("App must be used within a AppProvider");
  }
  return context;
};
