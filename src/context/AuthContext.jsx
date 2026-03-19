import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

const login = async (email, password) => {
  try {
    const res = await API.post("/auth/login", { email, password });

    if (res.data?.access_token) {
      localStorage.setItem("token", res.data.access_token);
      await fetchUser();
      return true;
    }

    return false;

  } catch (error) {
    return false;
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      console.log(res.data);
      
      setUser(res.data);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};