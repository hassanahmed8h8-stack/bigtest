
export interface ItemVariant {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  calories?: number;
  variants?: ItemVariant[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem extends Omit<MenuItem, 'variants'> {
  quantity: number;
  variantName?: string;
  originalId: string;
}
