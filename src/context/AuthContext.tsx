import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api, { TOKEN_KEY } from "../services/api";
import type { Profile } from "../types";

interface AuthContextValue {
  profile: Profile | null;
  loading: boolean;
  join: (username: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  clearProgress: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(
    () => localStorage.getItem(TOKEN_KEY) !== null
  );

  const refreshProfile = useCallback(async () => {
    const response = await api.get<Profile>("/api/user/me");
    setProfile(response.data);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      return;
    }

    api
      .get<Profile>("/api/user/me")
      .then((response) => {
        setProfile(response.data);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const join = async (username: string) => {
    const response = await api.post<{ token: string }>("/api/auth/join", {
      username,
    });

    localStorage.setItem(TOKEN_KEY, response.data.token);
    setLoading(true);
    await refreshProfile();
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setProfile(null);
  };

  const clearProgress = () => {
    const token = localStorage.getItem(TOKEN_KEY);

    Object.keys(localStorage)
      .filter((key) => key.startsWith("missionIndex"))
      .forEach((key) => localStorage.removeItem(key));

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  };

  const value: AuthContextValue = {
    profile,
    loading,
    join,
    logout,
    refreshProfile,
    clearProgress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
