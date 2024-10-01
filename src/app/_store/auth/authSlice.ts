import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  user: null,
};

interface TPayloadHandleOnLogin {
  isLogin: boolean;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleOnLogin: (state, action: PayloadAction<TPayloadHandleOnLogin>) => {
      state.isLogin = action.payload.isLogin
    },
  },
});

export default authSlice.reducer;

export const {handleOnLogin} = authSlice.actions
