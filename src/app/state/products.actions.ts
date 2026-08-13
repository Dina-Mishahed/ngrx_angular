import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Load Products': emptyProps(),
    'Filter By Category': props<{ category: string }>(),
    'Search Products': props<{ query: string }>(),
  }
});

export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),
  }
});

export const CartActions = createActionGroup({
  source: 'Cart Component',
  events: {
    'Add To Cart': props<{ product: Product }>(),
    'Remove From Cart': props<{ productId: number }>(),
    'Update Quantity': props<{ productId: number; delta: number }>(),
    'Clear Cart': emptyProps(),
  }
});
