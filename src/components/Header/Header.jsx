import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  function handleLogout(event) {
    event.preventDefault();
    setModalOpen(true);
  }

  function confirmLogout() {
    navigate("/login");
  }

  function cancelLogout() {
    setModalOpen(false);
  }

  function handleProfile() {
    navigate("/profile");
  }

  function handleSettings() {
    navigate("/seting");
  }

  return (
    <div className="flex items-center justify-between h-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 shadow-lg">
      <div className="flex items-center">
        <input
          type="text"
          className="bg-white text-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
        />
        <button className="ml-2 p-2 bg-white text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 bg-white text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 p-3 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
            3
          </span>
        </button>

        <div className="relative">
          <button
            className="flex items-center p-2 bg-white text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-200"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <span className="material-icons">account_circle</span>
          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-blue-600 rounded-lg shadow-lg z-10">
              <li
                onClick={handleSettings}
                className="cursor-pointer hover:bg-blue-100 rounded-t-lg"
              >
                <a className="block px-4 py-2 flex items-center gap-2">
                  <IoSettingsOutline className="text-lg" /> Settings
                </a>
              </li>
              <li
                onClick={handleLogout}
                className="cursor-pointer text-red-600 hover:bg-blue-100 rounded-b-lg"
              >
                <a className="block px-4 py-2 flex items-center gap-2">
                  <IoLogOutOutline className="text-lg" /> Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <p className="text-gray-700 mb-4">Do you really want to logout?</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
