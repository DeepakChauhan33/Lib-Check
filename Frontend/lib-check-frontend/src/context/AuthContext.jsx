import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  logoutUser,
} from "../services/api";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(user);


  // Check existing login when application starts

  useEffect(() => {
    const checkUser = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser(savedToken);

        setUser(data.user);
      } catch (error) {
        console.error("Authentication failed:", error);

        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);


  // Login

  const login = (userData, token) => {
    localStorage.setItem("token", token);

    setUser(userData);
  };


  // Logout

  const logout = async () => {
    const savedToken = localStorage.getItem("token");

    try {
      if (savedToken) {
        await logoutUser(savedToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}


export default AuthProvider;