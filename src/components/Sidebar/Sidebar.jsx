import { useNavigate, useLocation } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { FaChartPie } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegFolder } from "react-icons/fa6";
import { RiTrelloLine } from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className=" bg-gray-800 p-4 border-r border-gray-800 flex flex-col items-center ">
      <div className="flex flex-col items-center">
      <RiTrelloLine className="text-white text-5xl"/>
      <h1 className="text-white font-san-serif">Trello.</h1>
      </div>

      <ul className="flex flex-col gap-12 my-16">
        <li>
          <CiGrid41
            onClick={() => navigate("/")}
            className={`text-4xl cursor-pointer p-2 rounded-md transition-colors duration-300 ease-in-out ${
              location.pathname === "/"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          />
        </li>
        <li>
          <FaChartPie
            onClick={() => navigate("/chart")}
            className={`text-4xl cursor-pointer p-2 rounded-md transition-colors duration-300 ease-in-out ${
              location.pathname === "/charts"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          />
        </li>
        <li>
          <GoBook
            onClick={() => navigate("/book")}
            className={`text-4xl cursor-pointer p-2 rounded-md transition-colors duration-300 ease-in-out ${
              location.pathname === "/books"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          />
        </li>
        <li>
          <IoSettingsOutline
            onClick={() => navigate("/seting")}
            className={`text-4xl cursor-pointer p-2 rounded-md transition-colors duration-300 ease-in-out ${
              location.pathname === "/seting"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          />
        </li>
        <li>
          <CiLocationArrow1
            onClick={() => navigate("/location")}
            className={`text-4xl cursor-pointer p-2 rounded-md transition-colors duration-300 ease-in-out ${
              location.pathname === "/location"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          />
        </li>
        <li>
          <FaRegFolder
            onClick={() => navigate("/folder")}
            className={`text-4xl cursor-pointer p-2 rounded-md transition-colors duration-300 ease-in-out ${
              location.pathname === "/folders"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          />
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
