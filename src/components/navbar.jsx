/* eslint-disable no-undef */
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const fullName = location.state?.fullName;
  return (
    <>
      <div className="w-full border-b ">
        <div className="flex justify-between mx-14 m-2 items-center">
          <img src={logo} alt="" className="w-18 h-9" />
          <div className="flex flex-col items-end">
            <h1 className="text-[#A0ABC0] font-semibold">{fullName}</h1>
            <h1 className="text-[#A0ABC0]">Nk Admin</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
