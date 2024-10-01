import authSlice from '@/app/_store/auth/authSlice';
import uiSlice from '@/app/_store/ui/uiSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducers = () => {
  const storagePersist = storage;

  return combineReducers({
    auth: persistReducer(
      {
        key: 'auth',
        storage: storagePersist,
        whitelist: [],
      },
      authSlice,
    ),
    ui: persistReducer(
      {
        key: 'ui',
        storage: storagePersist,
        whitelist: [],
      },
      uiSlice,
    ),
  });
};

const mainPersistReducer = persistReducer(
  {
    key: 'root',
    storage,
    blacklist: [''],
  },
  rootReducers(),
);

const store = configureStore({
  reducer: mainPersistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { persistor, store };
