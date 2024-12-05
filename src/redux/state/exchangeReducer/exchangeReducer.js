import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: null,
  minAmount: 0,
  maxAmount: 0,
  selectedFromCoin: null,
  selectedToCoin: null,
  selectedFromNetwork: "",
  selectedToNetwork: "",
  userWallet: "",
  email: "",
  isAMLChecked: false,
  isNetworkSelectionDisabled: false,
  loading: false,
  showInstruction: false,
  remainingTime: 0,
  amountResult: null,
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
   setAmount(state, action) {
    state.amount = action.payload;
    // localStorage.setItem('amount', action.payload);

   },
    setFromNetwork(state, action) {
      state.selectedFromNetwork = action.payload;
    },
    setToNetwork(state, action) {
      state.selectedToNetwork = action.payload;
    },
    setMinAmount(state, action) {
      state.minAmount = action.payload;
    },
    setMaxAmount(state, action) {
      state.maxAmount = action.payload;
    },
    setFromCoin(state, action) {
      state.selectedFromCoin = action.payload;
      // localStorage.setItem('fromCoin', action.payload);
    },
    setToCoin(state, action) {
      state.selectedToCoin = action.payload;
    },
    setUserWallet(state, action) {
      state.userWallet = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
      // localStorage.setItem('email', action.payload);
    },
    setIsAMLChecked(state, action) {
      state.isAMLChecked = action.payload;
    },
    setIsNetworkSelectionDisabled(state, action) {
      state.isNetworkSelectionDisabled = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setShowInstruction(state, action) {
      state.showInstruction = action.payload;
    },
    setRemainingTime(state, action) {
      state.remainingTime = action.payload;
    },
    setAmountResult(state, action) {
      state.amountResult = action.payload;
    },
    resetState: () => initialState, // Для сброса состояния в начальное


   
  },
});

export const {

  setFromNetwork,
  setToNetwork,
  setAmount,
  setMinAmount,
  setMaxAmount,
  setFromCoin,
  setToCoin,
  setUserWallet,
  setEmail,
  setIsAMLChecked,
  setIsNetworkSelectionDisabled,
  setLoading,
  setShowInstruction,
  setRemainingTime,
  setAmountResult,
  resetState,
 

 
} = exchangeSlice.actions;

export const exchangeReduser = exchangeSlice.reducer;

