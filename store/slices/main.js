import {createSlice} from '@reduxjs/toolkit';

export const main = createSlice({
  name: 'main',
  initialState: {
    getMe: {},
    language: 'uz',
    login: false,
    token: '',
    word: '',
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setMe: (state, action) => {
      state.getMe = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setNewWord: (state, action) => {
      state.word = action.payload;
    },
  },
});
