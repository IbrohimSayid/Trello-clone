import React, { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const termsAcceptedRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!firstNameRef.current.value) {
      newErrors.firstName = "Ismingizni kiriting.";
    }

    if (!lastNameRef.current.value) {
      newErrors.lastName = "Familiyangizni kiriting.";
    }

    if (!emailRef.current.value) {
      newErrors.email = "Email manzilingizni kiriting.";
    } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      newErrors.email = "Email manzili noto'g'ri.";
    }

    if (!passwordRef.current.value) {
      newErrors.password = "Parolni kiriting.";
    } else if (passwordRef.current.value.length < 8) {
      newErrors.password = "Parol kamida 8 ta belgidan iborat bo'lishi kerak.";
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      newErrors.confirmPassword = "Parollar mos kelmaydi.";
    }

    if (!termsAcceptedRef.current.checked) {
      newErrors.termsAccepted =
        "Shartlar va qoidalarni qabul qilishingiz kerak.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("https://trello.vimlc.uz/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/login");
      setErrors({});
    } catch (error) {
      setErrors({ api: "Ro'yxatdan o'tishda xato yuz berdi." });
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-200">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Ro'yxatdan o'tish
        </h2>

        <form onSubmit={handleSubmit}>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Ism
            </label>
            <input
              type="text"
              id="firstName"
              ref={firstNameRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ismingiz"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Familiya
            </label>
            <input
              type="text"
              id="lastName"
              ref={lastNameRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Familiyangiz"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Parol
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              ref={passwordRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="**********"
            />
            <button
              type="button"
              className="absolute right-2 top-11"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEyeSlash className="text-gray-500" />
              ) : (
                <FaRegEye className="text-gray-500" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Parolni tasdiqlash
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              ref={confirmPasswordRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="**********"
            />
            <button
              type="button"
              className="absolute right-2 top-11"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaRegEyeSlash className="text-gray-500" />
              ) : (
                <FaRegEye className="text-gray-500" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              ref={termsAcceptedRef}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              Shartlar va qoidalarni qabul qilaman
            </label>
            {errors.termsAccepted && (
              <p className="text-red-500 text-xs mt-1">
                {errors.termsAccepted}
              </p>
            )}
          </div>

          {errors.api && (
            <p className="text-red-500 text-xs mt-1">{errors.api}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Ro'yxatdan o'tish
          </button>

          <Link to="/login">
            <p className="text-center mt-2">
              Mening hisobim bor / <span className="text-blue-500">Kirish</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
