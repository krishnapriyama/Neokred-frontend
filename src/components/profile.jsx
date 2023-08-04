/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "./navbar";
import avatar from "../assets/avatar.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState("");
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    axios
      .get("http://localhost:4000/userDetails", {
        headers: {
          Authorization: `Bearer ${token}`,
          Credentials: true,
        },
      })
      .then((response) => {
        setDetails(response.data);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <>
      {token ? (
        <>
          <Navbar />
          <div className="w-full p-20 xl:flex-row flex gap-20 flex-col ">
            <div className="xl:w-[40%] w-full justify-center flex xl:justify-end">
              <div className="rounded-[100%] h-36 w-36 bg-[#E2E7F0] flex justify-center items-center">
                <img src={avatar} alt="" width={100} />
              </div>
            </div>
            <div className="xl:w-[60%] w-full xl:justify-normal justify-center flex">
              <div className="border w-3/5 p-5 text-[#7181A1]">
                <h1 className="uppercase font-semibold mb-7 mt-4">Profile</h1>
                <div className="flex flex-col gap-6">
                  <div className="w-full flex">
                    <label className="w-[30%]">Name</label>
                    <h1 className="w-[70%]">{details.fullname}</h1>
                  </div>
                  <div className="w-full flex">
                    <label className="w-[30%]">Email</label>
                    <p className="w-[70%] truncate">{details.email}</p>
                  </div>
                  <div className="w-full flex">
                    <label className="w-[30%]">DOB</label>
                    <h1 className="w-[70%]">
                      {details.dob
                        ? new Date(details.dob).toLocaleDateString("en-US")
                        : ""}
                    </h1>
                  </div>
                  <div className="w-full flex">
                    <label className="w-[30%]">Phone number</label>
                    <h1 className="w-[70%]">{details.phone}</h1>
                  </div>
                  <div className="w-full flex">
                    <label className="w-[30%]">Address</label>
                    <p className="w-[70%]">{details.address}</p>
                  </div>
                  <div className="w-full flex">
                    <label className="w-[30%]">City</label>
                    <h1 className="w-[70%]">{details.city}</h1>
                  </div>
                  <div className="w-full flex">
                    <label className="w-[30%]">State</label>
                    <h1 className="w-[70%]">{details.state}</h1>
                  </div>
                  <div className="w-full flex">
                    <label className="w-[30%]">ZIP code</label>
                    <h1 className="w-[70%]">{details.zip}</h1>
                  </div>
                  <div className="w-full flex">
                    <label className="w-[30%]">Country</label>
                    <h1 className="w-[70%]">{details.country}</h1>
                  </div>
                  <div className="w-full flex">
                    <label className="w-[30%]">security</label>
                    <div className="w-[70%]">
                      <h1>what is your school name?</h1>
                      <h1>{details.securityQ}</h1>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <button
                      className="p-4 uppercase font-bold text-red-600"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Profile;
