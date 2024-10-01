import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Dropdown holatini boshqarish

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
    <div className="flex items-center justify-between h-16 bg-gray-800 text-white px-4 shadow-md">
      <div className="flex items-center">
        <input
          type="text"
          className="bg-gray-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
        />
        <button className="ml-2 p-2 bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200">
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
        <button className="relative p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200">
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

        <div className="relative dropdown">
          <button
            className="flex items-center p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <img
              alt="Profile"
              src="./img/ProfileFoto.svg"
              className="w-10 h-10 rounded-full"
            />
          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded-lg shadow-lg z-10">
              <li
                onClick={handleSettings}
                className=" text- cursor-pointer hover:bg-blue-600 rounded-t-lg"
              >
                <a className="block px-4 py-2 flex items-center gap-2 rounded-xl">
                  <IoSettingsOutline className="text-lg" /> Settings
                </a>
              </li>
              <li
                onClick={handleLogout}
                className=" text-red-600 cursor-pointer rounded-b-lg hover:bg-blue-600 hover:text-white"
              >
                <a className="block px-4 py-2 flex items-center gap-2">
                  <IoLogOutOutline className="text-xl" /> Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-8 rounded-md flex flex-col gap-4">
            <p>Do you really want to go out?</p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={confirmLogout} className="transition duration-300 ease-in-out text-red-500 border-solid border-2 border-red-500 rounded-xl py-[5px] px-[15px] hover:bg-red-500 hover:text-white">
                Yes
              </button>
              <button onClick={cancelLogout} className="transition duration-300 ease-in-out text-blue-500 border-solid border-2 border-blue-500 rounded-xl py-[5px] px-[15px] hover:bg-blue-500 hover:text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
