import {configureStore} from '@reduxjs/toolkit';
import { medCareReducer } from './reducer/medCareReducer';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const store = configureStore({
    reducer: {
      medCareReducer : persistReducer(persistConfig, medCareReducer),
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export let persistor = persistStore(store)
  
export default store;