import { createSlice, createSelector } from '@reduxjs/toolkit';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface Product {
  id: string;
  price: number;
  description: string;
}

export interface State {
  collection: EntityState<Product>;
  error: string | null;
}

export interface ProductsPartialState {
  readonly products: State;
}

export const adapter = createEntityAdapter<Product>();

export const initialState: State = {
  collection: adapter.getInitialState(),
  error: null
};

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProducts: () => {},
    loadProductsSuccess: (draft, action) => {
      draft.collection = adapter.addAll(action.payload.products, draft.collection);
    },
    loadProductsFailure: (draft, action) => {
      draft.error = action.payload.error;
    }
  }
});

export const ProductActions = products.actions;

export const { selectAll } = adapter.getSelectors();
export const selectProductsState = (state: ProductsPartialState) => state.products;

export const selectProductsCollection = createSelector(
  selectProductsState,
  state => state.collection
);

export const selectProducts = createSelector(
  selectProductsCollection,
  selectAll
);