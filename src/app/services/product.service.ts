import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private mockProducts: Product[] = [
    {
      id: 101,
      name: 'MacBook Pro M3 Max',
      category: 'Electronics',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
      description: 'Supercharged performance for pro developers with 36GB Unified Memory.',
      rating: 4.9
    },
    {
      id: 102,
      name: 'Sony WH-1000XM5 Headphones',
      category: 'Audio',
      price: 399,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'Industry-leading noise canceling with crystal clear hands-free calling.',
      rating: 4.8
    },
    {
      id: 103,
      name: 'Apple Watch Ultra 2',
      category: 'Wearables',
      price: 799,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      description: 'The ultimate sports watch with titanium case and bright Always-On display.',
      rating: 4.7
    },
    {
      id: 104,
      name: 'Mechanical Gaming Keyboard',
      category: 'Accessories',
      price: 149,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
      description: 'Custom RGB backlit mechanical keyboard with hot-swappable switches.',
      rating: 4.6
    },
    {
      id: 105,
      name: 'Dell UltraSharp 27" 4K Monitor',
      category: 'Electronics',
      price: 620,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
      description: 'Stunning 4K resolution with IPS Black technology and 98% DCI-P3 color.',
      rating: 4.9
    },
    {
      id: 106,
      name: 'Logitech MX Master 3S Mouse',
      category: 'Accessories',
      price: 99,
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
      description: 'Ergonomic wireless mouse with 8K DPI tracking and quiet clicks.',
      rating: 4.8
    }
  ];

  getProducts(): Observable<Product[]> {
    // Simulate HTTP network latency of 800ms
    return of(this.mockProducts).pipe(delay(800));
  }
}
