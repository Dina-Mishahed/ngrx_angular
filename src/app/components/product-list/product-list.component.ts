import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { CartActions, ProductsPageActions } from '../../state/products.actions';
import {
  selectError,
  selectFilteredProducts,
  selectLoading,
  selectSelectedCategory
} from '../../state/products.selectors';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private store = inject(Store);

  categories = ['ALL', 'Electronics', 'Audio', 'Wearables', 'Accessories'];
  searchQuery = '';

  products = this.store.selectSignal(selectFilteredProducts);
  loading = this.store.selectSignal(selectLoading);
  error = this.store.selectSignal(selectError);
  selectedCategory = this.store.selectSignal(selectSelectedCategory);

  ngOnInit() {
    // Dispatch action to trigger NgRx Effect -> HTTP Request
    this.store.dispatch(ProductsPageActions.loadProducts());
  }

  onSelectCategory(category: string) {
    this.store.dispatch(ProductsPageActions.filterByCategory({ category }));
  }

  onSearchChange(query: string) {
    this.store.dispatch(ProductsPageActions.searchProducts({ query }));
  }

  addToCart(product: Product) {
    this.store.dispatch(CartActions.addToCart({ product }));
  }

  retryLoad() {
    this.store.dispatch(ProductsPageActions.loadProducts());
  }
}
