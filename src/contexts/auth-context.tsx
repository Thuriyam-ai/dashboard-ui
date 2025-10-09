import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import apiClient from "@/data/services/api-client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  role: string;
  org_id: string | null;
  user_id: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter();

  const clearError = () => setError("");

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<User>("/api/v1/accounts_users/me");
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");
    try {
      await apiClient.post("/api/v1/accounts_users/signin", {
        email,
        password,
      });

      // Fetch and set user data
      const response = await apiClient.get<User>("/api/v1/accounts_users/me");
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      const axiosError = err as AxiosError<any>;
      const errorMessage =
        axiosError.response?.data?.detail || "Invalid email or password.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError("");
    try {
      await apiClient.post("/api/v1/accounts_users/", {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      // Fetch and set user data
      const response = await apiClient.get<User>("/api/v1/accounts_users/me");
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      const axiosError = err as AxiosError<any>;
      const errorMessage =
        axiosError.response?.data?.detail || "Signup failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("/api/v1/accounts_users/logout");
    } catch (err) {
      console.error(
        "Logout API call failed, logging out on client-side anyway.",
        err
      );
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    isLoading,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
