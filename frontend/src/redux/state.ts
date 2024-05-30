import { createSlice} from "@reduxjs/toolkit"

const initialState = {
	userInfo: null,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUser: (state) => {
      state.userInfo = null;
    },
  }
})

export const {
  addUser,
  resetUser,
} = appSlice.actions;
export default appSlice.reducer
