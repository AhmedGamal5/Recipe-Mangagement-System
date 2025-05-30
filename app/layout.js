"use client"
import "./globals.css";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <html lang="en">
      <head>
        <title>Recipe Task</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-100 text-gray-900 antialiased font-sans">
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  );
}
