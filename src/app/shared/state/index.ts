import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { products } from './products.state';

const reducer = combineReducers({
  products: products.reducer,
});

export const store = configureStore({ reducer, devTools: true });

export * from './products.state';