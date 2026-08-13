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
  template: `
    <section class="products-section">
      <!-- Search and Filter Bar -->
      <div class="controls-card">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            placeholder="ابحث عن جهاز، سماعات، أو ملحقات..."
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearchChange($event)"
          />
        </div>

        <div class="categories-bar">
          @for (cat of categories; track cat) {
            <button
              class="cat-chip"
              [class.active]="selectedCategory() === cat"
              (click)="onSelectCategory(cat)"
            >
              {{ cat === 'ALL' ? 'الكل' : cat }}
            </button>
          }
        </div>
      </div>

      <!-- Loading State -->
      @if (loading()) {
        <div class="loading-container">
          <div class="spinner"></div>
          <p>جاري تحميل المنتجات عبر NgRx Effects...</p>
        </div>
      }

      <!-- Error State -->
      @if (error()) {
        <div class="error-container">
          <p>⚠️ حدث خطأ: {{ error() }}</p>
          <button (click)="retryLoad()">إعادة المحاولة</button>
        </div>
      }

      <!-- Product Cards Grid -->
      @if (!loading() && !error()) {
        <div class="products-grid">
          @for (product of products(); track product.id) {
            <div class="product-card">
              <div class="card-image-wrapper">
                <img [src]="product.image" [alt]="product.name" />
                <span class="category-badge">{{ product.category }}</span>
              </div>

              <div class="card-content">
                <div class="card-header">
                  <h3>{{ product.name }}</h3>
                  <span class="rating">⭐ {{ product.rating }}</span>
                </div>

                <p class="description">{{ product.description }}</p>

                <div class="card-footer">
                  <span class="price">\${{ product.price }}</span>
                  <button class="add-btn" (click)="addToCart(product)">
                    <span>+ أضف للسلة</span>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>

        @if (products().length === 0) {
          <div class="no-results">
            <p>لم يتم العثور على منتجات مطابقة لـ "{{ searchQuery }}"</p>
          </div>
        }
      }
    </section>
  `,
  styles: [`
    .products-section {
      padding: 2rem 0;
    }
    .controls-card {
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 1.25rem;
      border-radius: 16px;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .search-box {
      position: relative;
      width: 100%;
    }
    .search-icon {
      position: absolute;
      right: 1.25rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.1rem;
      color: #94a3b8;
    }
    .search-box input {
      width: 100%;
      padding: 0.85rem 3rem 0.85rem 1.25rem;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: white;
      font-size: 0.95rem;
      outline: none;
      transition: all 0.3s;
      box-sizing: border-box;
    }
    .search-box input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
    }
    .categories-bar {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .cat-chip {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
      padding: 0.5rem 1.25rem;
      border-radius: 50px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.25s ease;
    }
    .cat-chip:hover {
      border-color: #6366f1;
      color: white;
    }
    .cat-chip.active {
      background: linear-gradient(135deg, #6366f1, #a855f7);
      border-color: transparent;
      color: white;
      font-weight: 600;
      box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);
    }
    .loading-container {
      text-align: center;
      padding: 4rem 1rem;
      color: #94a3b8;
    }
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(99, 102, 241, 0.2);
      border-top-color: #6366f1;
      border-radius: 50%;
      animation: spin 1s infinite linear;
      margin: 0 auto 1.5rem;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .product-card {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
      border-color: rgba(99, 102, 241, 0.4);
    }
    .card-image-wrapper {
      position: relative;
      height: 180px;
      overflow: hidden;
    }
    .card-image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .product-card:hover .card-image-wrapper img {
      transform: scale(1.08);
    }
    .category-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(8px);
      color: #38bdf8;
      font-size: 0.75rem;
      padding: 0.3rem 0.75rem;
      border-radius: 50px;
      border: 1px solid rgba(56, 189, 248, 0.3);
    }
    .card-content {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    .card-header h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #f8fafc;
    }
    .rating {
      font-size: 0.85rem;
      color: #fbbf24;
      font-weight: 600;
    }
    .description {
      font-size: 0.85rem;
      color: #94a3b8;
      line-height: 1.4;
      margin: 0 0 1.25rem 0;
      flex: 1;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }
    .price {
      font-size: 1.3rem;
      font-weight: 800;
      color: #34d399;
      font-family: monospace;
    }
    .add-btn {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border: none;
      color: white;
      padding: 0.65rem 1.25rem;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.85rem;
      transition: all 0.25s;
    }
    .add-btn:hover {
      box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
      transform: scale(1.03);
    }
    .no-results {
      text-align: center;
      padding: 3rem;
      color: #64748b;
    }
  `]
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
