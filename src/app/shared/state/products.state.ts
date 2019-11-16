import { createSlice, createSelector } from '@reduxjs/toolkit';

export interface State {
  collection: any[];
  error: string | null;
}

export interface ProductsPartialState {
  readonly products: State;
}

export const initialState: State = {
  collection: [],
  error: null
};

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProducts: () => {},
    loadProductsSuccess: (draft, action) => {
      draft.collection = action.payload.products;
    },
    loadProductsFailure: (draft, action) => {
      draft.error = action.payload.error;
    }
  }
});

export const ProductActions = products.actions;

export const selectProductsState = (state: ProductsPartialState) => state.products;

export const selectProducts = createSelector(
  selectProductsState,
  state => state.collection
);