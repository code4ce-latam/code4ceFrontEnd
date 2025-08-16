// src/store/store.ts
// @ts-nocheck
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

const appReducer = combineReducers({
  auth: authReducer,
});

// Conserva auth
const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    const base = appReducer(undefined, { type: '@@INIT' });
    return appReducer(
      {
        ...base,
        auth: state?.auth ?? base.auth,
        //catalog: state?.catalog ?? base.catalog,
      },
      action
    );
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV,
});

export default store;
