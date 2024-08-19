import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Dropdown } from "./Dropdown";
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
      <div className="flex justify-center flex-col ">
        <Dropdown handleSelectionChange={handleSelectionChange} />
        <div className="flex">
          <Suspense fallback={<Loader />}>
            <Component className="flex-1" />
          </Suspense>
        </div>
      </div>
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
