import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await fetchUserProfile(storedToken);
      }
      setIsLoading(false);
    }
    checkAuth();
  }, []);

  async function fetchUserProfile(currentToken) {
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentToken}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return data.user;
      } else {
        console.error("Failed to fetch user profile");
        logout();
        return null;
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      logout();
      return null;
    }
  }

  async function login(email, password) {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("token", data.token);

        const userProfile = await fetchUserProfile(data.token);

        if (userProfile?.isAdmin === true) {
          navigate("/admin");
        } else {
          navigate("/");
        }

      } else {
        console.error("Login error:", data.message);
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  }

  async function logout() {
    try {
      if (token) {
        await fetch("http://localhost:5000/api/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      }
    } catch (err) {
      console.error("Logout error:", err);
    }

    setToken(null);
    setUser(null);
    localStorage.removeItem("token");

    navigate("/login");
  }


  const isAuthenticated = Boolean(token);

  const value = {
    token,
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

