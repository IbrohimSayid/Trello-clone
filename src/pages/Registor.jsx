import { useState } from "react";
import axiosInstance from "../Axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { IoEyeOff, IoEye } from "react-icons/io5";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        const token = response.data.token; // Tokenni olish
        localStorage.setItem("token", token); // Tokenni localStorage ga saqlash
        localStorage.setItem("tokenExpiry", Date.now() + 60 * 60 * 1000); // 60 daqiqa uchun vaqt belgilash
        setSuccess("Account created successfully");
        setError("");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 w-full">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        <p className="text-gray-600 text-center mb-4">
          Getting started is easy
        </p>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 rounded-lg w-full p-3 mb-4"
            required
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-400 rounded-lg w-full p-3 mb-4"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-400 rounded-lg w-full p-3 mb-4"
            required
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 rounded-lg w-full p-3"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEye className="text-2xl" />
              ) : (
                <IoEyeOff className="text-2xl" />
              )}
            </button>
          </div>
          <div className="relative mb-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-400 rounded-lg w-full p-3"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <IoEye className="text-2xl" />
              ) : (
                <IoEyeOff className="text-2xl" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg w-full p-3 hover:bg-green-700 mb-4"
          >
            Create Account
          </button>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-blue-600 text-white rounded-lg w-1/2 p-3 hover:bg-blue-700 mr-2"
              onClick={() => {
                alert("Google orqali ro'yxatdan o'tish tugmasi bosildi");
              }}
            >
              Sign Up with Google
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white rounded-lg w-1/2 p-3 hover:bg-gray-700 ml-2"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
