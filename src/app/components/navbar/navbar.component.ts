import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartCount, selectCartTotal } from '../../state/products.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar">
      <div class="logo">
        <div class="logo-icon">⚡</div>
        <div class="logo-text">
          <h1>NgRx Store Demo</h1>
          <span>Angular State Management Hub</span>
        </div>
      </div>

      <div class="nav-actions">
        <button class="cart-btn" (click)="toggleCart.emit()">
          <span class="cart-icon">🛒</span>
          <span class="cart-label">السلة</span>
          @if (cartCount() > 0) {
            <span class="cart-badge">{{ cartCount() }}</span>
          }
          <span class="cart-total">\${{ cartTotal() | number:'1.2-2' }}</span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .logo-icon {
      font-size: 2rem;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
    }
    .logo-text h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #f8fafc;
      letter-spacing: -0.5px;
    }
    .logo-text span {
      font-size: 0.75rem;
      color: #94a3b8;
    }
    .cart-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));
      border: 1px solid rgba(99, 102, 241, 0.4);
      padding: 0.6rem 1.2rem;
      border-radius: 50px;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }
    .cart-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3));
    }
    .cart-badge {
      background: #ef4444;
      color: white;
      font-size: 0.75rem;
      font-weight: 800;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pulse 1.5s infinite;
    }
    .cart-total {
      color: #34d399;
      font-family: monospace;
      font-size: 0.95rem;
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }
  `]
})
export class NavbarComponent {
  private store = inject(Store);
  @Output() toggleCart = new EventEmitter<void>();

  cartCount = this.store.selectSignal(selectCartCount);
  cartTotal = this.store.selectSignal(selectCartTotal);
}
