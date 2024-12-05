
export const selectAmount = (state) => state.exchange.amount;
export const selectMinAmount = (state) => state.exchange.minAmount;
export const selectMaxAmount = (state) => state.exchange.maxAmount;
export const selectSelectedFromCoin = (state) => state.exchange.selectedFromCoin;
export const selectSelectedToCoin = (state) => state.exchange.selectedToCoin;
export const selectFromNetwork = (state) => state.exchange.selectedFromNetwork;
export const selectToNetwork = (state) => state.exchange.selectedToNetwork;
export const selectUserWallet = (state) => state.exchange.userWallet;
export const selectEmail = (state) => state.exchange.email;
export const selectIsAMLChecked = (state) => state.exchange.isAMLChecked;
export const selectIsNetworkSelectionDisabled = (state) => state.exchange.isNetworkSelectionDisabled;
export const selectLoading = (state) => state.exchange.loading;
export const selectShowInstruction = (state) => state.exchange.showInstruction;
export const selectRemainingTime = (state) => state.exchange.remainingTime;
export const selectAmountResult = (state) => state.exchange.amountResult;