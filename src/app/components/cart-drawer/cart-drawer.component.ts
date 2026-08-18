import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions } from '../../state/products.actions';
import { selectCartItems, selectCartTotal } from '../../state/products.selectors';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.css'
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
