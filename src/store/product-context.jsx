import { createContext, useContext, useEffect, useState } from "react";
import generateProducts from "../utils/generate-products";
import toast from "react-hot-toast";

const ProductContext = createContext({
  products: [],
});

export const useProduct = () => useContext(ProductContext);

function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    // sync only
    const productsInLocal = localStorage.getItem("products");
    const productsInJS = JSON.parse(productsInLocal);

    if (productsInLocal) {
      return productsInJS;
    } else {
      const productsList = generateProducts(30);
      const stringProductArray = JSON.stringify(productsList);
      localStorage.setItem("products", stringProductArray);
      toast.success("Products Added to local storage");

      return productsList;
    }
  });

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
