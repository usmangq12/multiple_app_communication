import Profile from "./assets/profile.svg";
import React from "react";
import { useSelector } from "react-redux";

const ProfileDetailV1 = () => {
  const profileDetail = useSelector((state) => state.auth.userDetailV1);

  return (
    <div className="bg-white h-screen w-full flex justify-center items-center">
      <div className="shadow-2xl flex  flex-col w-4/5 sm:w-3/5 xl:w-2/5">
        <div className="p-4 bg-gradient-to-r from-gray-500 to-gray-800 h-14 opacity-30"></div>
        <div className="p-4 flex flex-col">
          <div className="flex justify-center items-center">
            <img src={Profile} className="w-10 h-10 mb-2 sm:mb-6 " />
          </div>
          <div className="flex flex-col gap-2 sm:gap-4">
            <h3 className="text-center font-bold text-l text-gray-500	">
              {profileDetail.username ?? "User Name"}
            </h3>
            <p className="text-sm font-light text-center text-gray-500">
              {profileDetail.department ?? "Department"}
            </p>
            <p className="w-full text-justify text-sm ">
              {profileDetail.description ??
                " Lorem ipsum dolor sit amet consectetur adipisicing elit. At et exercitationem a dolorem nemo illum nulla! "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailV1;
