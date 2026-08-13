import { createReducer, on } from '@ngrx/store';
import { ActionLog, CartItem, Product } from '../models/product.model';
import { CartActions, ProductsApiActions, ProductsPageActions } from './products.actions';

export interface ProductsState {
  products: Product[];
  cart: CartItem[];
  selectedCategory: string;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  actionLogs: ActionLog[];
}

export const initialState: ProductsState = {
  products: [],
  cart: [],
  selectedCategory: 'ALL',
  searchQuery: '',
  loading: false,
  error: null,
  actionLogs: []
};

function addLog(logs: ActionLog[], actionType: string, payload?: any): ActionLog[] {
  const newLog: ActionLog = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toLocaleTimeString(),
    actionType,
    payload
  };
  return [newLog, ...logs.slice(0, 19)]; // Keep latest 20 logs
}

export const productsReducer = createReducer(
  initialState,

  // Load Products
  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
    actionLogs: addLog(state.actionLogs, '[Products Page] Load Products')
  })),

  // Load Products Success
  on(ProductsApiActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    actionLogs: addLog(state.actionLogs, '[Products API] Load Products Success', { count: products.length })
  })),

  // Load Products Failure
  on(ProductsApiActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    actionLogs: addLog(state.actionLogs, '[Products API] Load Products Failure', { error })
  })),

  // Filter By Category
  on(ProductsPageActions.filterByCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category,
    actionLogs: addLog(state.actionLogs, '[Products Page] Filter By Category', { category })
  })),

  // Search Query
  on(ProductsPageActions.searchProducts, (state, { query }) => ({
    ...state,
    searchQuery: query,
    actionLogs: addLog(state.actionLogs, '[Products Page] Search Products', { query })
  })),

  // Add To Cart
  on(CartActions.addToCart, (state, { product }) => {
    const existingIndex = state.cart.findIndex(item => item.product.id === product.id);
    let updatedCart: CartItem[];

    if (existingIndex > -1) {
      updatedCart = state.cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...state.cart, { product, quantity: 1 }];
    }

    return {
      ...state,
      cart: updatedCart,
      actionLogs: addLog(state.actionLogs, '[Cart] Add To Cart', { id: product.id, name: product.name })
    };
  }),

  // Remove From Cart
  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    cart: state.cart.filter(item => item.product.id !== productId),
    actionLogs: addLog(state.actionLogs, '[Cart] Remove From Cart', { productId })
  })),

  // Update Quantity
  on(CartActions.updateQuantity, (state, { productId, delta }) => {
    const updatedCart = state.cart
      .map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);

    return {
      ...state,
      cart: updatedCart,
      actionLogs: addLog(state.actionLogs, '[Cart] Update Quantity', { productId, delta })
    };
  }),

  // Clear Cart
  on(CartActions.clearCart, (state) => ({
    ...state,
    cart: [],
    actionLogs: addLog(state.actionLogs, '[Cart] Clear Cart')
  }))
);
