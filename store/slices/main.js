import {createSlice} from '@reduxjs/toolkit';

export const main = createSlice({
  name: 'main',
  initialState: {
    events: [],
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});
