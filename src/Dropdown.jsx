import React, { useState } from "react";

const App_config = [
  {
    use: "V1",
    name: "DetailFormV1",
    value: "Application1",
    path: "ProfileFormV1",
  },
  {
    use: "V2",
    name: "DetailFormV2",
    value: "Application2",
    path: "ProfileFormV2",
  },
  {
    use: "V1",
    name: "ProfileDetailV1",
    value: "Application2",
    path: "ProfileDetailV1",
  },
  {
    use: "V2",
    name: "ProfileDetailV2",
    value: "Application2",
    path: "ProfileDetailV2",
  },
  {
    use: "Diagram",
    name: "Diagram",
    value: "Diagram",
    path: "FlowDiagram",
  },
];

export const Dropdown = ({ handleSelectionChange }) => {
  const [selectedValue, setSelectedValue] = useState(App_config[0].path); // Default selection
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (path) => {
    setSelectedValue(path);
    handleSelectionChange({ target: { value: path } });
    setIsOpen(false);
  };

  return (
    <div className="  flex justify-center flex-col items-center">
      <div className="relative w-4/5 sm:w-3/5 xl:w-2/5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-left block w-full px-4 py-2 pr-8 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {App_config.find((config) => config.path === selectedValue)?.name}
          <svg
            className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border  border-gray-300 rounded-md shadow-lg z-10">
            {App_config.map((config) => (
              <div
                key={config.name}
                className={`px-4 py-2 text-gray-700  hover:bg-gray-100 cursor-pointer ${
                  selectedValue === config.path ? "bg-gray-100" : ""
                }`}
                onClick={() => handleSelection(config.path)}
              >
                {config.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
