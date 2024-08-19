import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Loader } from "./Loader";
import reportWebVitals from "./reportWebVitals";
import { mainStore } from "./store";
import { Provider } from "react-redux";

const ProfileFormV1 = lazy(() => import("./app1/ProfileFormV1"));
const ProfileDetailV1 = lazy(() => import("./app2/ProfileDetailV1"));
const ProfileFormV2 = lazy(() => import("./app1/ProfileFormV2"));
const ProfileDetailV2 = lazy(() => import("./app2/ProfileDetailV2"));
const FlowDiagram = lazy(() => import("./app3/FlowDiagram"));

const App = () => {
  const [Component, setComponent] = useState(() => ProfileFormV1); // Default component

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

  const handleSelectionChange = (event) => {
    const selectedPath = event.target.value;
    switch (selectedPath) {
      case "ProfileFormV1":
        setComponent(() => ProfileFormV1);
        break;
      case "ProfileFormV2":
        setComponent(() => ProfileFormV2);
        break;
      case "ProfileDetailV1":
        setComponent(() => ProfileDetailV1);
        break;
      case "ProfileDetailV2":
        setComponent(() => ProfileDetailV2);
        break;
      case "FlowDiagram":
        setComponent(() => FlowDiagram);
        break;
      default:
        setComponent(() => FlowDiagram);
        break;
    }
  };

  return (
    <Provider store={mainStore}>
      <Suspense fallback={<Loader />}>
        <select
          onChange={handleSelectionChange}
          id="Value_selection"
          className="border border-gray-600 rounded p-1"
        >
          {App_config.map((config) => (
            <option key={config.name} value={config.path}>
              {config.name}
            </option>
          ))}
        </select>
        <Component />
      </Suspense>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
