import { configureStore, createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { modalIsOpen: false },
  reducers: {
    setOpen(state) {
      state.modalIsOpen = !state.modalIsOpen;
    },
  },
});

const postIdSlice = createSlice({
  name: "postId",
  initialState: { value: "id" },
  reducers: {
    setPostId(state, action) {
      state.value = action.payload;
    },
  },
});

export const modalAction = modalSlice.actions;
export const postIdAction = postIdSlice.actions;

const store = configureStore({
  reducer: { modal: modalSlice.reducer, postId: postIdSlice.reducer },
});

export default store;
