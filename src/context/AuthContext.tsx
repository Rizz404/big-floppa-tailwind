import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/User";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userInStorage = localStorage.getItem("user");
    return userInStorage ? JSON.parse(userInStorage) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    const tokenInStorage = localStorage.getItem("accessToken");
    return tokenInStorage ? tokenInStorage : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
