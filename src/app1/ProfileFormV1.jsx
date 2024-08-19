import { UpdateV1 } from "./store";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileFormV1 = () => {
  const [formData, setFormData] = useState({
    username: "",
    department: "",
    description: "",
  });

  const ProfileFormData = [
    {
      label: "User Name",
      name: "username",
      value: formData.username,
      placeholder: "User Name",
    },
    {
      label: "Department",
      name: "department",
      value: formData.department,
      placeholder: "Department",
    },
  ];
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      UpdateV1(formData.username, formData.department, formData.description)
    );

    setFormData({
      username: "",
      department: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white h-screen w-scren flex justify-center items-center">
      <div className="shadow-2xl flex  flex-col w-4/5 sm:w-3/5 xl:w-2/5 p-4">
        <div className="p-4 flex flex-col ">
          <h3 className="text-left font-bold text-xl text-black mb-2 	">
            Update Profile
          </h3>
          <p className="text-sm font-semibold  text-left text-gray-500 mb-4">
            Enter Your Name,Deparment and description below to update your
            profile
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            {ProfileFormData.map((detail, index) => {
              return (
                <div className="flex flex-col gap-2 " key={index}>
                  <label> {detail.label} </label>
                  <input
                    className="border-gray-400 border rounded p-2"
                    name={detail.name}
                    value={detail.value}
                    type="text"
                    placeholder={detail.placeholder}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              );
            })}

            <div className="flex flex-col gap-2">
              <label className="font-medium ">Description</label>
              <textarea
                name="description"
                value={formData.description}
                rows="4"
                cols="50"
                placeholder="Enter description..."
                className="border-gray-400 border rounded p-2"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <button
              type="submit"
              className="bg-gray-700 text-white p-2 ml-auto rounded"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileFormV1;
