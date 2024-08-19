
import { allUpdateActions } from "./app1/store";
import { selectFormAction } from "./reducer";
import rootReducer from "./rootreducer";
import { configureStore, createStore } from "@reduxjs/toolkit";
import { GlobalStore } from "redux-micro-frontend";

export const mainStore = createStore(rootReducer);
const sharedStore = GlobalStore.Get();

sharedStore.RegisterStore("App1", mainStore);
sharedStore.RegisterGlobalActions("App1", [...allUpdateActions]);



sharedStore.RegisterStore("Main", mainStore);
sharedStore.RegisterGlobalActions("Main", [...selectFormAction]);
