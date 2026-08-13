import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { ProductsApiActions, ProductsPageActions } from './products.actions';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map(products => ProductsApiActions.loadProductsSuccess({ products })),
          catchError(error =>
            of(ProductsApiActions.loadProductsFailure({ error: error?.message || 'Failed to load products' }))
          )
        )
      )
    )
  );
}
