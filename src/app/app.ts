import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActionInspectorComponent } from './components/action-inspector/action-inspector.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ProductListComponent,
    CartDrawerComponent,
    ActionInspectorComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isCartOpen = false;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}
