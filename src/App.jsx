import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Registor from "./pages/Registor";
import Seting from "./pages/Seting";
import Home from "./pages/Home";
import Login from "./pages/Login";
import File from "./pages/File";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken"); // Token nomini yangilandi
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function ProtectedRoute({ isAuthenticated, children }) {
    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
  }

  return (
    <div className="flex h-screen">
      <Routes>
        <Route path="/registor" element={<Registor />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/seting"
          element={
            <ProtectedRoute isAuthenticated={!!token}>
              <MainLayout>
                <Seting />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/file"
          element={
            <ProtectedRoute isAuthenticated={!!token}>
              <MainLayout>
                <File />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={!!token}>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
