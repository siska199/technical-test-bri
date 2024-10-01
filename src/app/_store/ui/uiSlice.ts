import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isToggleSidebar: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    handleToggle: (state, action) => {
      state.isToggleSidebar = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const { handleToggle } = uiSlice.actions;
