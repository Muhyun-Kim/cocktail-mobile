import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userId?: string;
  email?: string;
  userName?: string;
  createdAt?: string;
  isDeactivated?: boolean;
  deactivatedAt?: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo(
      state,
      action: PayloadAction<{
        userId: string;
        email: string;
        userName: string;
        createdAt?: string;
        isDeactivated?: boolean;
        deactivatedAt?: string | null;
      }>
    ) {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.createdAt = action.payload.createdAt;
      state.isDeactivated = action.payload.isDeactivated;
      state.deactivatedAt = action.payload.deactivatedAt;
    },
    deleteUserInfo(state) {
      state.isAuthenticated = false;
      state.userId = undefined;
      state.email = undefined;
      state.userName = undefined;
      state.createdAt = undefined;
      state.isDeactivated = undefined;
      state.deactivatedAt = undefined;
    },
  },
});

export const { setUserInfo, deleteUserInfo } = authSlice.actions;
export default authSlice.reducer;
