export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductPriceChange {
  dir: 'up' | 'down' | 'flat';
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductPriceChange;
  markets?: MarketPrice[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const BASE_URLS = [
  'https://openapi.programming-hero.com/api/bazardor',
  'https://api.api-store.workers.dev/api/bazardor',
  'https://api.abcz.workers.dev/api/bazardor'
];

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  let lastError: any = null;
  for (const baseUrl of BASE_URLS) {
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        return data as T;
      }
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error(`Failed to fetch from ${endpoint}`);
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await fetchFromApi<Product[]>('/products');
    return products || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await fetchFromApi<Category[]>('/categories');
    return categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const products = await fetchFromApi<Product[]>(`/products?category=${categorySlug}`);
    return products || [];
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    // Fallback: fetch all and filter client side
    const all = await getAllProducts();
    return all.filter(p => p.category === categorySlug || p.slug === categorySlug);
  }
}

export async function getProductBySlugOrId(identifier: string): Promise<Product | null> {
  try {
    // Try single product endpoint
    try {
      const product = await fetchFromApi<Product>(`/products/${identifier}`);
      if (product && (product.id || product.slug)) {
        return product;
      }
    } catch (e) {
      // Ignore single fetch failure and fallback to searching all products
    }

    const all = await getAllProducts();
    const found = all.find(p => p.slug === identifier || p.id.toString() === identifier);
    return found || null;
  } catch (error) {
    console.error(`Error fetching product ${identifier}:`, error);
    return null;
  }
}
