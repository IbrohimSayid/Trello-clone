import { useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";

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
            className="w-5 text-co cursor-pointer hover:bg-sky-700 p-3 box-contenterounded transition-colors duration-300 ease-in-out"
            src="./img/GridMenu.svg"
            alt=""
          />
        </li>
        <li>
          <img className="w-5" src="./img/Icon2.svg" alt="" />
        </li>
        <li>
          <img className="w-5" src="./img/book.svg" alt="" />
        </li>
        <li>
          <img
            onClick={() => {
              navigate("/seting");
            }}
            className="w-5 cursor-pointer hover:bg-gray-200"
            src="./img/Seting.svg"
            alt=""
          />
        </li>
        <li>
          <img className="w-5" src="./img/Message.svg" alt="" />
        </li>
        <li>
          <img className="w-5" src="./img/File.svg" alt="" />
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
