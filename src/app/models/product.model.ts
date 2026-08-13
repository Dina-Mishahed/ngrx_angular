export interface Product {
  id: number;
  name: string;
  category: 'Electronics' | 'Audio' | 'Wearables' | 'Accessories';
  price: number;
  image: string;
  description: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ActionLog {
  id: string;
  timestamp: string;
  actionType: string;
  payload?: any;
}
