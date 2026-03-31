import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCurrentUser, login as loginRequest } from "../services/authService";
import {
  clearToken,
  getToken,
  setToken as persistToken,
} from "../api/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(getToken()));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setIsBootstrapping(false);
      return;
    }

    let isMounted = true;

    async function bootstrapUser() {
      try {
        const response = await getCurrentUser();
        if (isMounted) {
          setUser(response.user);
        }
      } catch {
        clearToken();
        if (isMounted) {
          setTokenState(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    }

    bootstrapUser();

    return () => {
      isMounted = false;
    };
  }, [token]);

  async function login(credentials) {
    const response = await loginRequest(credentials);
    storeToken(response.accessToken);
    const me = await getCurrentUser();
    setUser(me.user);
    return me.user;
  }

  function storeToken(nextToken) {
    setTokenState(nextToken);

    if (nextToken) {
      persistToken(nextToken);
      return;
    }

    clearToken();
  }

  function logout() {
    clearToken();
    setTokenState(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isBootstrapping,
      login,
      logout,
      setUser,
    }),
    [token, user, isBootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
