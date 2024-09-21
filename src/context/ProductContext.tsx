import { createContext, useState } from "react";
import { ProductsProps } from "../types/models";

interface ProductContextType {
  products: ProductsProps[];
  setProducts: React.Dispatch<React.SetStateAction<ProductsProps[]>>;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<ProductsProps[]>([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
