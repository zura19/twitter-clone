import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialState = {
  user: getInitialUser(),
  suggestedUsers: [],
  activeUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setSuggestedUsers(state, action) {
      state.suggestedUsers = action.payload;
    },
    setActiveUser(state, action) {
      state.activeUser = action.payload;
    },
    removeUser(state, action) {
      state.user = null;
    },
    removeSuggestedUsers(state) {
      state.suggestedUsers = [];
    },
    removeActiveUser(state) {
      state.activeUser = null;
    },
  },
});

export default userSlice.reducer;
export const {
  setUser,
  removeUser,
  setSuggestedUsers,
  removeSuggestedUsers,
  setActiveUser,
  removeActiveUser,
} = userSlice.actions;
