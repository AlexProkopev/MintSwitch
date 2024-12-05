import { configureStore } from '@reduxjs/toolkit';


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { coinsReduser } from './coinRequestState/coinRequestState';
import { authentifitacionReduces } from './autentification/autentification.redusers';
import { exchangeReduser } from './exchangeReducer/exchangeReducer';



const userConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
      coinsRequest: coinsReduser,
      authStore:persistReducer(userConfig, authentifitacionReduces) ,
      exchange: exchangeReduser,
      

  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);