import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coins: null,
  isLoading: false,
  isError: null,
};

const coinsRequest = createSlice({
  name: "coinsForRequest",
  initialState,
  reducers: {
    addCoins: (state, {payload}) => {
      state.isError = null;
      state.coins = payload;
    },
  },
});

export const { addCoins } = coinsRequest.actions;

export const coinsReduser = coinsRequest.reducer;
