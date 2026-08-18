import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartCount, selectCartTotal } from '../../state/products.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private store = inject(Store);
  @Output() toggleCart = new EventEmitter<void>();

  cartCount = this.store.selectSignal(selectCartCount);
  cartTotal = this.store.selectSignal(selectCartTotal);
}
