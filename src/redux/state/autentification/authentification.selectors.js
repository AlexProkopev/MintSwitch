export const selectIsLoading = (state) => state.authStore.isLoading;
export const selectIsAutorization = (state) => state.authStore.authentifitacion;
export const selectIsError = (state) => state.authStore.isError;
export const selectUserData = (state) => state.authStore.userData;
export const selectToken = (state) => state.authStore.token;