import { useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { FaChartPie } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegFolder } from "react-icons/fa6";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-32 bg-white h-screen p-6 border-r">
      <img src="./img/OctomLogo.svg" alt="Logo" />

      <ul className="mt-[9.438rem] flex flex-col justify-center items-center gap-[2.813rem]">
        <li>
          <CiGrid41
            onClick={() => {
              navigate("/");
            }}
            className="text-2xl hover:bg-blue-700 hover:text-white cursor-pointer p-2 box-content rounded transition-colors duration-300 ease-in-out"
          />
        </li>
        <li>
          <FaChartPie className="text-2xl hover:bg-blue-700 hover:text-white cursor-pointer p-2 box-content rounded transition-colors duration-300 ease-in-out" />
        </li>
        <li>
          <GoBook className="text-2xl hover:bg-blue-700 hover:text-white cursor-pointer p-2 box-content rounded transition-colors duration-300 ease-in-out" />
        </li>
        <li>
          <IoSettingsOutline
            onClick={() => {
              navigate("/seting");
            }}
            className="text-2xl hover:bg-blue-700 hover:text-white cursor-pointer p-2 box-content rounded transition-colors duration-300 ease-in-out"
          />
        </li>
        <li>
          <CiLocationArrow1 className="text-2xl hover:bg-blue-700 hover:text-white cursor-pointer p-2 box-content rounded transition-colors duration-300 ease-in-out" />
        </li>
        <li>
          <FaRegFolder className="text-2xl hover:bg-blue-700 hover:text-white cursor-pointer p-2 box-content rounded transition-colors duration-300 ease-in-out" />
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
