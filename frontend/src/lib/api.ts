import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Token dynamically
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('khoj_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export interface Product {
  _id: string;
  title: string;
  category: string;
  condition: 'Brand New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  location: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerAvatar?: string;
  status: 'Available' | 'Pending' | 'Sold';
  isFeatured?: boolean;
  views?: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location?: string;
  phone?: string;
  rating?: number;
}

export interface Offer {
  _id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  offeredPrice: number;
  message?: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Countered';
  createdAt: string;
}

export interface Order {
  _id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  sellerId: string;
  sellerName: string;
  deliveryAddress: string;
  paymentMethod: string;
  status: 'Confirmed' | 'Processing' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Message {
  _id: string;
  productId: string;
  productTitle?: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  text: string;
  createdAt: string;
}
