import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Detailes from "./pages/Deatailes";
import MainLoyaut from "./layout/MainLayout";
import Login from "./pages/Login";
import Registor from "./pages/Registor";
import { ThemeProvider } from "./Context/ThemeContext";
import Folder from "./pages/Foulder";
import Message from "./pages/Message";
import Errorpage from "./pages/ErrorPage";
import Dosc from "./pages/Dosc";
import Cart from "./pages/Cart";
import { useAppStore } from "./zustand";

function App() {
  const user = useAppStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (!user && currentPath !== "/register") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <ThemeProvider>
      <Routes>
        {user ? (
          <>
            <Route
              path="/"
              element={
                <MainLoyaut>
                  <Home />
                </MainLoyaut>
              }
            />
            <Route
              path="/settings"
              element={
                <MainLoyaut>
                  <Settings />
                </MainLoyaut>
              }
            />
            <Route
              path="/cart"
              element={
                <MainLoyaut>
                  <Cart />
                </MainLoyaut>
              }
            />
            <Route
              path="/deatailes/:id"
              element={
                <MainLoyaut>
                  <Detailes />
                </MainLoyaut>
              }
            />
            <Route
              path="/dosc"
              element={
                <MainLoyaut>
                  <Dosc />
                </MainLoyaut>
              }
            />
            <Route
              path="/folders"
              element={
                <MainLoyaut>
                  < Folder />
                </MainLoyaut>
              }
            />
            <Route
              path="/message"
              element={
                <MainLoyaut>
                  <Message />
                </MainLoyaut>
              }
            />
            <Route
              path="*"
              element={
                <MainLoyaut>
                  <Errorpage />
                </MainLoyaut>
              }
            />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registor />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
