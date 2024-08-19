const initialState = { selectedForm: "HI There " };
export const mainReducers = (state = initialState, action) => {
  if (action.type === "selectForm") {
    console.log("Select", state.selectedForm);
    return {
      ...state,
      selectedForm: action.payload,
    };
  }
  return state;
};

export const SelectForm = (form) => {
  console.log("SelectForm", form);
  return {
    type: "selectForm",
    payload: form,
  };
};
export const selectFormAction = [SelectForm];
