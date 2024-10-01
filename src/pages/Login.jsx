import { useState, useEffect } from "react"; // useEffect ni import qilish
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/axiosConfig";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Ikonkalarni import qilish

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Parolni ko'rsatish holatini qo'shish
  const navigate = useNavigate();

  useEffect(() => {
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (tokenExpiry && Date.now() > tokenExpiry) {
      // Agar token muddati o'tgan bo'lsa, foydalanuvchini logIn sahifasiga yo'naltirish
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("tokenExpiry", Date.now() + 60 * 60 * 1000); // 60 daqiqa uchun vaqt belgilash
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Parolni ko'rsatish holatini o'zgartirish
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 w-full">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-2">Login Page</h2>
        <p className="text-gray-600 text-center mb-4">
          Login into your account
        </p>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-400 rounded-lg w-full p-3 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"} // Parolni ko'rsatish yoki yashirish
              placeholder="Password"
              className="border border-gray-400 rounded-lg w-full p-3 pr-10" // Ikonka uchun o'ngda joy qoldirish
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? (
                <FaEyeSlash className="text-2xl" />
              ) : (
                <FaEye className="text-2xl" />
              )}
            </span>
          </div>
          <button
            className="bg-blue-600 text-white rounded-lg w-full p-3 hover:bg-blue-700"
            type="submit"
          >
            Log In
          </button>
        </form>
        <p className="text-center mt-4">
          If you don't have an account,{" "}
          <Link to="/registor" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
