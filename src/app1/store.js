import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice for authentication
// const authSlice = createSlice({
//   name: 'auth',

// });

const initialState = {
  isAuthenticated: false,
  userDetailV1: {},
  userDetailV2: {},
};
export const DetailReducers = (state = initialState, action) => {
  if (action.type === "updatev1") {
    console.log("Action Payload", action.payload);
    console.log();
    return {
      ...state,
      isAuthenticated: true,
      userDetailV1: {
        ...action.payload,
      },
     
    };
  }
  if (action.type === "updatev2") {
    console.log("Action Payload", action.payload);
    console.log();
    return {
      ...state,
      isAuthenticated: true,

      userDetailV2: {
        ...action.payload,
      },
     
    };
  }
  return state;
};
export const UpdateV1 = (username, department, description) => {
  return {
    type: "updatev1",
    payload: { username, department, description },
  };
};

export const UpdateV2 = (username, email, department, address, description) => {
  return {
    type: "updatev2",
    payload: { username, email, department, address, description },
  };
};
export const allUpdateActions = [UpdateV1, UpdateV2];

