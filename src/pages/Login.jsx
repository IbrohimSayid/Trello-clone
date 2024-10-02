import React, { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppStore } from "../zustand";

const Login = () => {
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRef.current.value) {
      newErrors.email = "Iltimos, email manzilingizni kiriting";
    } else if (!emailRegex.test(emailRef.current.value)) {
      newErrors.email = "Noto'g'ri email manzili";
    }

    if (!passwordRef.current.value) {
      newErrors.password = "Iltimos, parolingizni kiriting";
    } else if (passwordRef.current.value.length < 6) {
      newErrors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(
        "https://trello.vimlc.uz/api/auth/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUser(response.data);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ api: "Email yoki parol noto'g'ri" });
      } else {
        setErrors({ api: "Kirishda xato yuz berdi." });
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/2 bg-gradient-to-br from-blue-500 to-teal-500 flex flex-col justify-center items-center text-white p-10">
        <h1 className="text-5xl font-bold mb-4">Xush kelibsiz</h1>
        <p className="text-lg mb-2">
          Bizning platformamizga kirish uchun tayyormisiz?
        </p>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h2 className="text-3xl font-bold mb-6">Kirish</h2>

        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Parol
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                ref={passwordRef}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="**********"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors.api && (
            <p className="text-red-500 text-xs mt-1">{errors.api}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Kirish
          </button>
        </form>

        <p className="mt-4 text-sm">
          Hisobingiz yo'qmi?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Ro'yxatdan o'ting
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
