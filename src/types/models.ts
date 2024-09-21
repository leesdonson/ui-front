export type ProductsProps = {
  id: number;
  title: string;
  rating: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
};

export type CartItemsProps = {
  id: number;
  title: string;
  rating: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  cartQuantity: number;
};

export type UserProps = {
  name: string;
  email: string;
};

export type SearchItemsProps = {
  id: number;
  title: string;
  images: string[];
};
