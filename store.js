import { configureStore, createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { modalIsOpen: false },
  reducers: {
    toggleModal(state) {
      state.modalIsOpen = !state.modalIsOpen;
    },
  },
});

export const modalAction = modalSlice.actions;

const store = configureStore({
  reducer: { modal: modalSlice.reducer },
});

export default store;
