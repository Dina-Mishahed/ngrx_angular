import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions } from '../../state/products.actions';
import { selectCartItems, selectCartTotal } from '../../state/products.selectors';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="drawer-overlay" (click)="closeCart.emit()">
      <div class="drawer-content" (click)="$event.stopPropagation()">
        <div class="drawer-header">
          <h2>🛒 سلة التسوق (NgRx Cart State)</h2>
          <button class="close-btn" (click)="closeCart.emit()">✕</button>
        </div>

        <div class="drawer-body">
          @if (cartItems().length === 0) {
            <div class="empty-cart">
              <span class="empty-icon">🛍️</span>
              <p>السلة فارغة حالياً</p>
              <small>قم بإضافة منتجات لتشاهد الأكشن في NgRx Store</small>
            </div>
          } @else {
            <div class="cart-items">
              @for (item of cartItems(); track item.product.id) {
                <div class="cart-item">
                  <img [src]="item.product.image" [alt]="item.product.name" />
                  <div class="item-details">
                    <h4>{{ item.product.name }}</h4>
                    <span class="item-price">\${{ item.product.price }}</span>
                  </div>
                  <div class="qty-controls">
                    <button (click)="updateQuantity(item.product.id, -1)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button (click)="updateQuantity(item.product.id, 1)">+</button>
                  </div>
                  <button class="remove-btn" (click)="removeItem(item.product.id)" title="حذف">🗑️</button>
                </div>
              }
            </div>
          }
        </div>

        @if (cartItems().length > 0) {
          <div class="drawer-footer">
            <div class="total-row">
              <span>الإجمالي:</span>
              <span class="total-price">\${{ cartTotal() | number:'1.2-2' }}</span>
            </div>
            <div class="action-buttons">
              <button class="clear-btn" (click)="clearCart()">مسح السلة</button>
              <button class="checkout-btn">إتمام الطلب 🚀</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      z-index: 200;
      display: flex;
      justify-content: flex-end;
    }
    .drawer-content {
      width: 420px;
      max-width: 90vw;
      background: #0f172a;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      height: 100%;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
    }
    .drawer-header {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .drawer-header h2 {
      margin: 0;
      font-size: 1.1rem;
      color: #f8fafc;
    }
    .close-btn {
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
    }
    .empty-cart {
      text-align: center;
      padding: 3rem 1rem;
      color: #64748b;
    }
    .empty-icon {
      font-size: 3.5rem;
      display: block;
      margin-bottom: 1rem;
    }
    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .cart-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 0.75rem;
      border-radius: 12px;
    }
    .cart-item img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      object-fit: cover;
    }
    .item-details {
      flex: 1;
    }
    .item-details h4 {
      margin: 0 0 0.25rem 0;
      font-size: 0.9rem;
      color: #f1f5f9;
    }
    .item-price {
      color: #34d399;
      font-size: 0.85rem;
      font-family: monospace;
    }
    .qty-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #1e293b;
      padding: 0.25rem 0.5rem;
      border-radius: 8px;
    }
    .qty-controls button {
      background: none;
      border: none;
      color: #6366f1;
      font-weight: bold;
      cursor: pointer;
      font-size: 1.1rem;
      width: 24px;
    }
    .remove-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }
    .drawer-footer {
      padding: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.9);
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.25rem;
      font-size: 1.1rem;
      font-weight: 700;
      color: #f8fafc;
    }
    .total-price {
      color: #34d399;
    }
    .action-buttons {
      display: flex;
      gap: 0.75rem;
    }
    .clear-btn {
      flex: 1;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
      padding: 0.75rem;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
    }
    .checkout-btn {
      flex: 2;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      border: none;
      color: white;
      padding: 0.75rem;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 700;
    }
  `]
})
export class CartDrawerComponent {
  private store = inject(Store);
  @Output() closeCart = new EventEmitter<void>();

  cartItems = this.store.selectSignal(selectCartItems);
  cartTotal = this.store.selectSignal(selectCartTotal);

  removeItem(productId: number) {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  updateQuantity(productId: number, delta: number) {
    this.store.dispatch(CartActions.updateQuantity({ productId, delta }));
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }
}
