import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectProductsState,
  (state) => state.error
);

export const selectSelectedCategory = createSelector(
  selectProductsState,
  (state) => state.selectedCategory
);

export const selectSearchQuery = createSelector(
  selectProductsState,
  (state) => state.searchQuery
);

export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectSelectedCategory,
  selectSearchQuery,
  (products, category, query) => {
    return products.filter((product) => {
      const matchesCategory = category === 'ALL' || product.category === category;
      const matchesSearch = !query || product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
);

export const selectCartItems = createSelector(
  selectProductsState,
  (state) => state.cart
);

export const selectCartCount = createSelector(
  selectCartItems,
  (cart) => cart.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(
  selectCartItems,
  (cart) => cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
);

export const selectActionLogs = createSelector(
  selectProductsState,
  (state) => state.actionLogs
);
